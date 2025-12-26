import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({});

const modelId = "google.gemma-3-4b-it";  // amazon nova lite

export async function runConverse(prompt) {
    const input = {
        modelId: modelId,
        messages: [
            {
                role: "user",
                content: [{ text: prompt }],
            },
        ],
        inferenceConfig: {
            temperature: 0.1
        },
    };

    const command = new ConverseCommand(input);

    try {
        const response = await client.send(command);
        const assistantMessage = response.output.message;

        console.log(assistantMessage);

        // The response is a structured object, extract the text content
        if (assistantMessage && assistantMessage.content && assistantMessage.content.length > 0) {
            return assistantMessage.content[0].text;
        }
        return "No response from LLM"
    } catch (err) {
        console.error("Error calling Bedrock Converse API:", err);
    }
}
