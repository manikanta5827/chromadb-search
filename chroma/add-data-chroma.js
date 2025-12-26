import { getFileData } from "../text-formatter.js";
import { collection } from "./chroma.client.js";

const addDataToVectorDb = async () => {
    console.time("start");
    const chunks = await getFileData('dynamodb-research-paper.txt', 200, 40);

    await collection.upsert({
        documents: chunks,
        ids: chunks.map(() => crypto.randomUUID()),
        metadatas: chunks.map((_, i) => ({ line: i.toString() }))
    });
    console.timeEnd("start");
}

(async () => {
    await addDataToVectorDb();
})()
