import { streamText } from 'ai';

async function main() {
  try {
    const result = await streamText({
      model: 'openai/gpt-5.4',
      prompt: 'Why is the sky blue?'
    });

    for await (const textPart of result.textStream) {
      process.stdout.write(textPart);
    }
    process.stdout.write('\n');
  } catch (err) {
    console.error('Request failed:', err);
    process.exit(1);
  }
}

main();
