import { collection } from "./chroma.client.js";

export const fetchDataFromVectorDb = async (question) => {
    const results = await collection.query({
        queryTexts: [question],
        nResults: 3,
    });

    return results.documents[0];
}