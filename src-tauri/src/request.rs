use reqwest::header::{HeaderMap, HeaderName, HeaderValue};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::str::FromStr;
use std::time::Instant;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct RequestError {
    status: Option<u16>,
    url: Option<String>,
    request_time_ms: u64,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum HttpMethod {
    GET,
    PUT,
    DELETE,
    POST,
    PATCH,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Request {
    url: String,
    method: HttpMethod,
    body: Option<String>,
    params: HashMap<String, String>,
    headers: HashMap<String, String>,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Response {
    status: u16,
    headers: HashMap<String, String>,
    body: Option<String>,
    url: String,
    request_time_ms: u64,
}

#[tauri::command]
pub async fn make_request(req: Request) -> Result<Response, RequestError> {
    let client = Client::new();

    let mut built_url = req.url;
    for (index, (key, value)) in req.params.iter().enumerate() {
        if index == 0 {
            built_url += "?";
            built_url += &format!("{}={}", key, value);
            continue;
        }
        built_url += &format!("&{}={}", key, value);
    }
    let mut headers: HeaderMap = Default::default();
    for (key, value) in req.headers {
        headers.insert(
            HeaderName::from_str(&key).unwrap(),
            HeaderValue::from_str(&value).unwrap(),
        );
    }

    // create a timer and start it
    let timer = Instant::now();

    let response_result = match req.method {
        HttpMethod::GET => client.get(built_url),
        HttpMethod::PUT => client.put(built_url),
        HttpMethod::DELETE => client.delete(built_url),
        HttpMethod::POST => client.post(built_url),
        HttpMethod::PATCH => client.patch(built_url),
    }
    .headers(headers)
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

    to_return
}

#[cfg(test)]
mod tests {
    use super::{make_request, HttpMethod, Request};
    use std::collections::HashMap;

    #[tokio::test]
    async fn test_make_request() {
        let req = Request {
            body: None,
            url: String::from("https://jsonplaceholder.typicode.com/todos/1"),
            params: HashMap::new(),
            method: HttpMethod::GET,
            headers: HashMap::new(),
        };

        let res = make_request(req).await;
        assert_ne!(true, res.is_err());
    }
}
