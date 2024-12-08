use serde_json::json;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};
use kalosm::language::{Chat, Llama, LlamaSource, TextStream};


#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
    let model = Llama::builder()
        .with_source(LlamaSource::llama_3_2_3b_chat())
        .build()
        .await
        .unwrap();

    let mut chat = Chat::builder(model)
        .with_system_prompt("The assistant will act like a pirate")
        .build();

    let response = chat.add_message("hola").all_text().await;

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(
            json!({
              "message": response
            })
                .to_string()
                .into(),
        )?)
}