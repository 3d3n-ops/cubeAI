import axios from "axios";

// GitHub Personal Access Token (ensure it's valid)
const GITHUB_TOKEN =
  "YOUR_GITHUB_TOKEN";

// Function to fetch pull request data
async function fetchPullRequest(owner, repo, pullNumber) {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    // Log the PR details
    console.log("Fetched PR Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching PR data:", error.message);
    throw error;
  }
}

// Test fetching a PR (replace with your repo and PR number)
(async () => {
  const owner = "3d3n-ops";
  const repo = "ChurnApp";
  const prNumber = 1; // Replace with a real PR number
  const pullRequests = await fetchPullRequest(owner, repo, prNumber);
})();
