use serde_json::json;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};
use kalosm::language::*;

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
    let model = Llama::new_chat().await.expect("kk");

    // New code
    let mut chat = Chat::builder(model)
        .with_system_prompt("The assistant will act like a pirate")
        .build();


    let xx = chat.add_message("hola").all_text().await;

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(
            json!({
              "message": xx
            })
                .to_string()
                .into(),
        )?)
}