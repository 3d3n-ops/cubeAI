// Import required modules
import axios from "axios";
import { PineconeClient } from "pinecone-client";

// Initialize Pinecone client
const pinecone = new PineconeClient();
pinecone.init({
  apiKey:
    "pcsk_3mhMUV_UKetT3sRygofh7EFfX62wkVKsr9T9EYENNF8xmS9yeY6pGTDsDKD276DmGDL1en",
  environment: "us-east-1",
});

// Function to call Hugging Face embeddings
async function getEmbedding(queryText) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32",
      { inputs: queryText },
      {
        headers: {
          Authorization: `Bearer YOUR_HUGGING_FACE_API_KEY`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching embedding:", error.message);
    throw error;
  }
}

// Test Pinecone query
async function queryPinecone(queryText) {
  try {
    const queryEmbedding = await getEmbedding(queryText);

    const queryResults = await pinecone.query({
      index: "github-pr-index",
      vector: queryEmbedding,
      topK: 1,
      includeMetadata: true,
    });

    console.log("Query Results:", queryResults);
    return queryResults.matches[0]?.metadata || null;
  } catch (error) {
    console.error("Error querying Pinecone:", error.message);
    throw error;
  }
}

// Test your query function
(async () => {
  const result = await queryPinecone("Explain the purpose of PR #42");
  console.log(result);
})();
