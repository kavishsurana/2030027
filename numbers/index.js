const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Helper function to fetch numbers from a URL
async function fetchNumbersFromUrl(url) {
  try {
    const response = await axios.get(url, { timeout: 500 });
    if (response.status === 200) {
      const data = response.data;
      if (data.numbers && Array.isArray(data.numbers)) {
        return data.numbers;
      }
    }
  } catch (error) {
    // Ignore errors, including timeouts
  }
  return [];
}

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid query parameter: url' });
  }

  try {
    const promises = urls.map(fetchNumbersFromUrl);
    const results = await Promise.all(promises);

    // Merge and sort unique numbers from all responses
    const mergedNumbers = Array.from(new Set(results.flat())).sort((a, b) => a - b);

    return res.json({ numbers: mergedNumbers });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`number-management-service is running on http://localhost:${port}`);
});

