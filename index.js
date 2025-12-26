
import { getGeminiData } from "./gemini-client.js";
import { fetchDataFromVectorDb } from "./chroma/fetch-chroma.js";
import { runConverse } from "./bedrock-converse-api.js";


(async () => {
    const question = "what is first database as a service from amazon";

    console.time("fetch-data");
    const vectorResults = await fetchDataFromVectorDb(question);
    console.timeEnd('fetch-data');

    console.time('llm');
    const llmPrompt = `{
        You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.
        Question: ${question} 
        Context: ${vectorResults} 
        Answer:
        }`;

    // const response = await getGeminiData(llmPrompt);

    const response = await runConverse(llmPrompt);

    console.timeEnd('llm');
    console.log(`LLM output :: `, response);
})()
