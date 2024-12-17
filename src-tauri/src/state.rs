use crate::request::{Request, RequestError, Response};

#[derive(Debug)]
pub struct State {
    pub request_history: Vec<(Request, Result<Response, RequestError>)>,
}

impl Default for State {
    fn default() -> Self {
        Self {
            request_history: Vec::new(),
        }
    }
}
