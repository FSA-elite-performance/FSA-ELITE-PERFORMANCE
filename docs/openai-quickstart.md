# OpenAI Developer Quickstart

This quickstart shows the minimal steps to get started with the OpenAI API from a Node.js environment.

Prerequisites
- Node.js 18+ (or modern Deno/Bun)
- An OpenAI API key (create one in the OpenAI dashboard)

1) Export your API key

macOS / Linux (bash / zsh):

```bash
export OPENAI_API_KEY="your_api_key_here"
```

PowerShell (Windows):

```powershell
$env:OPENAI_API_KEY = "your_api_key_here"
```

The official OpenAI SDKs read `OPENAI_API_KEY` from the environment automatically.

2) Install the official SDK

```bash
npm install openai
```

3) Example: basic text generation (Node.js / example.mjs)

Create `examples/openai/example.mjs` and paste the example code below.

```js
import { streamText } from 'ai'

const result = streamText({
  model: 'openai/gpt-5.4',
  prompt: 'Why is the sky blue?'
})
```

Run the example:

```bash
node examples/openai/example.mjs
```

4) Image / multimodal example

You can send an image URL as part of the `input` content to analyze images:

```js
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5",
  input: [
    {
      role: "user",
      content: [
        { type: "input_text", text: "What is in this image?" },
        { type: "input_image", image_url: "https://openai-documentation.vercel.app/images/cat_and_otter.png" }
      ]
    }
  ]
});

console.log(response.output_text);
```

5) Streaming and Realtime

The SDK supports `stream: true` on `responses.create()` to receive server-sent events for partial output. Use this for low-latency UIs.

6) Next steps
- Explore the official docs and SDK README on GitHub for advanced usage (tools, function-calling, agents, ChatKit/AgentKit).
- Store your API key securely (do not commit it to source control). Add `OPENAI_API_KEY` to your deployment environment variables.

References
- OpenAI SDK: https://github.com/openai/openai-node
- OpenAI Docs: https://platform.openai.com/docs
