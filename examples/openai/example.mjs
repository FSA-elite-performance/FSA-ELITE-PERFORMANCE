import OpenAI from "openai";
const client = new OpenAI();

async function main() {
  try {
    const response = await client.responses.create({
      model: "gpt-5.4",
      input: "Write a one-sentence bedtime story about a unicorn."
    });

    console.log(response.output_text || response.output?.[0]?.content?.[0]?.text || JSON.stringify(response, null, 2));
  } catch (err) {
    console.error('Request failed:', err);
    process.exit(1);
  }
}

main();
