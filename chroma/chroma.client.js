import { ChromaClient } from "chromadb";
const client = new ChromaClient();

export const collection = await client.getOrCreateCollection({
    name: "new_collection",
});

export const deleteCollection = async () => {
    client.deleteCollection({ name: "new_collection" }).then().catch();
}