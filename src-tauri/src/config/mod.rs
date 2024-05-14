use std::collections::HashMap;
use lazy_static::lazy_static;
use platform_dirs::{AppDirs};
use serde::{Deserialize, Serialize};
use pgp::{KeyType, SecretKeyParamsBuilder, SignedSecretKey};
use pgp::crypto::ecc_curve::ECCCurve;
use pgp::types::{KeyTrait, SecretKeyTrait};

lazy_static! {
    static ref DIRS: AppDirs = AppDirs::new(Some(env!("CARGO_PKG_NAME")), true)
        .expect("Unable to populate user dirs");
}

#[derive(Serialize, Deserialize)]
pub struct Config {
    private_key: Option<Vec<u8>>
}

impl Config {
    pub fn new() -> Self {
        let mut key_params = SecretKeyParamsBuilder::default();
        key_params.key_type(KeyType::Rsa(2048))
            .can_encrypt(true)
            .primary_user_id(whoami::username());

        let secret_key = key_params.build()
            .expect("Unable to generate secret key")
            .generate()
            .expect("Unable to generate secret key");
        
        let private_key = secret_key.sign(|| "".into()).expect("Unable to sign secret key");
        let key_bytes = private_key.to_armored_bytes(None).expect("Unable to get armored bytes");
        
        Self {
            private_key: Some(key_bytes)
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct Environment {
    pub vars: HashMap<String, String>,
}