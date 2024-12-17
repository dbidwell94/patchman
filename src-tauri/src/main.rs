#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod request;
mod state;

use std::sync::Arc;
use tauri::async_runtime::RwLock;

pub type MutableState<T> = Arc<RwLock<T>>;

fn main() {
    let state: MutableState<state::State> = Default::default();

    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            request::make_request,
            request::get_request_history,
            request::delete_history_item
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
