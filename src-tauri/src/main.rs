#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod request;

use request::{add_new_query_param, get_request_state, RequestState};

fn main() {
    tauri::Builder::default()
        .manage(RequestState(Default::default()))
        .invoke_handler(tauri::generate_handler![
            get_request_state,
            add_new_query_param
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
