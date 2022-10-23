use serde::{Deserialize, Serialize};
use std::{collections::HashMap, sync::Mutex};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct KeyValue {
    key: String,
    value: String,
}

#[derive(Default, Clone, Serialize, Deserialize)]
pub struct Request {
    pub params: HashMap<String, String>,
}
pub struct RequestState(pub Mutex<Request>);

// remember to call `.manage(MyState::default())`
#[tauri::command]
pub fn add_new_query_param(
    key_value: KeyValue,
    state: tauri::State<RequestState>,
) -> Result<(), String> {
    let mut request_state = state.0.lock().unwrap();
    request_state.params.insert(key_value.key, key_value.value);

    Ok(())
}

#[tauri::command]
pub fn get_request_state(state: tauri::State<RequestState>) -> Result<Request, String> {
    let request_state = state.0.lock().unwrap().to_owned();
    Ok(request_state)
}
