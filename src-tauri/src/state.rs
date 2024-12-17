use crate::request::{Request, RequestError, Response};
use chrono::{DateTime, Utc};
use directories::ProjectDirs;
use serde::{Deserialize, Serialize};
use std::{
    ops::{Deref, DerefMut},
    sync::LazyLock,
};

static DIRS: LazyLock<ProjectDirs> = LazyLock::new(|| {
    ProjectDirs::from("com", "biddydev", "patchman")
        .expect("could not determine project directories")
});
const STATE_FILE: &str = "state.bin";

#[derive(Debug, Serialize, Deserialize)]
pub struct State {
    pub request_history: Vec<(Request, DateTime<Utc>, Result<Response, RequestError>)>,
}

impl Default for State {
    fn default() -> Self {
        Self::load_from_disk().unwrap_or_else(|_| Self {
            request_history: Vec::new(),
        })
    }
}

impl State {
    pub fn save_to_disk(&self) -> Result<(), Box<dyn std::error::Error>> {
        let data_dir = DIRS.data_local_dir();
        if !data_dir.exists() {
            std::fs::create_dir_all(data_dir)?;
        }

        let save_dir = DIRS.data_local_dir().join(STATE_FILE);
        let data = bincode::serialize(self)?;
        std::fs::write(save_dir, data)?;

        Ok(())
    }

    pub fn load_from_disk() -> Result<Self, Box<dyn std::error::Error>> {
        let save_dir = DIRS.data_local_dir().join(STATE_FILE);
        let data = std::fs::read(save_dir)?;
        let state = bincode::deserialize(&data)?;

        Ok(state)
    }
}
