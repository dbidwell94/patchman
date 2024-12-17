use chrono::{DateTime, Utc};
use reqwest::header::{HeaderMap, HeaderName, HeaderValue};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::hash::Hash;
use std::str::FromStr;
use std::time::Instant;

use crate::MutableState;

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct RequestError {
    status: Option<u16>,
    url: Option<String>,
    request_time_ms: u64,
}

#[derive(Serialize, Deserialize, Debug, Hash, Clone, Eq, PartialEq)]
pub enum HttpMethod {
    GET,
    PUT,
    DELETE,
    POST,
    PATCH,
}

#[derive(Serialize, Deserialize, Debug, Clone, Eq, PartialEq)]
pub struct Request {
    url: String,
    method: HttpMethod,
    body: Option<String>,
    params: HashMap<String, String>,
    headers: HashMap<String, String>,
}

impl Hash for Request {
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        self.url.hash(state);
        self.method.hash(state);
        self.body.hash(state);
        // hash the params and headers
        for (key, value) in &self.params {
            key.hash(state);
            value.hash(state);
        }

        for (key, value) in &self.headers {
            key.hash(state);
            value.hash(state);
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Response {
    status: u16,
    headers: HashMap<String, String>,
    body: Option<String>,
    url: String,
    request_time_ms: u64,
}

#[tauri::command]
pub async fn make_request(
    req: Request,
    state: tauri::State<'_, MutableState<crate::state::State>>,
) -> Result<Response, RequestError> {
    let client = Client::new();

    let mut headers: HeaderMap = Default::default();
    for (key, value) in &req.headers {
        headers.insert(
            HeaderName::from_str(key).unwrap(),
            HeaderValue::from_str(value).unwrap(),
        );
    }

    // create a timer and start it
    let timer = Instant::now();

    let response_result = match req.method {
        HttpMethod::GET => client.get(&req.url),
        HttpMethod::PUT => client.put(&req.url),
        HttpMethod::DELETE => client.delete(&req.url),
        HttpMethod::POST => client.post(&req.url),
        HttpMethod::PATCH => client.patch(&req.url),
    }
    .headers(headers)
    .query(&req.params)
    .send()
    .await;

    // stop the timer and get the elapsed time
    let elapsed = timer.elapsed();

    let to_return: Result<Response, RequestError>;

    match response_result {
        Ok(res) => {
            let status = res.status().as_u16();
            let mut headers: HashMap<String, String> = HashMap::new();
            let url = res.url().to_string();
            for (k, v) in res.headers() {
                headers.insert(k.to_string(), v.to_str().unwrap().to_string());
            }

            let response_body: String =
                String::from_utf8(res.bytes().await.unwrap().to_vec()).unwrap();

            to_return = Ok(Response {
                status,
                body: Some(response_body),
                headers,
                url,
                request_time_ms: elapsed.as_millis() as u64,
            });
        }
        Err(err) => {
            to_return = Err(RequestError {
                status: err.status().map(|s| s.as_u16()),
                url: err.url().map(|u| u.to_string()),
                request_time_ms: elapsed.as_millis() as u64,
            })
        }
    };

    let now = chrono::Utc::now();

    let mut state = state.write().await;
    state.request_history.push((req, now, to_return.clone()));

    match state.save_to_disk() {
        Ok(_) => {}
        Err(e) => {
            eprintln!("Error saving state to disk: {:?}", e);
        }
    }

    to_return
}

#[tauri::command]
pub async fn get_request_history(
    state: tauri::State<'_, MutableState<crate::state::State>>,
) -> Result<Vec<(Request, DateTime<Utc>, Result<Response, RequestError>)>, ()> {
    let state = state.read().await;
    Ok(state.request_history.clone())
}

#[tauri::command]
pub async fn delete_history_item(
    index: usize,
    state: tauri::State<'_, MutableState<crate::state::State>>,
) -> Result<(), ()> {
    let mut state = state.write().await;
    let _ = state.request_history.remove(index);
    state.save_to_disk().map_err(|_| ())?;
    Ok(())
}
