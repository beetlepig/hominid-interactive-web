use std::env;
use serde_json::json;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};
use kalosm::language::{Chat, ChatMarkers, FileSource, Llama, LlamaSource, TextStream};


#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
    let current_dir = env::current_dir().unwrap();

    panic!("{:?}", current_dir);

    let model_path = current_dir.join("tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf");
    let tokenizer_path = current_dir.join("tokenizer.json");

    let model = Llama::builder()
        .with_source(
            LlamaSource::new(
                FileSource::Local(model_path),
                FileSource::Local(tokenizer_path),
            )
                .with_chat_markers(ChatMarkers {
                    system_prompt_marker: "<|system|>\n",
                    assistant_marker: "<|user|>\n",
                    user_marker: "<|assistant|>\n",
                    end_system_prompt_marker: "</s>",
                    end_user_marker: "</s>",
                    end_assistant_marker: "</s>",
                })
                .with_group_query_attention(4),
        )
        .build()
        .await
        .unwrap();

    let mut chat = Chat::builder(model).build();

    let response = chat
        .add_message("What is your name and who is your creator?")
        .all_text()
        .await;

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