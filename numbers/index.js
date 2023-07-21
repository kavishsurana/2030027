const express = require('express');
const axios = require('axios');
const axiosTimeout = require('axios-timeout-extended');

const app = express();
const PORT = 3000;

// Function to merge unique integers from multiple arrays
function mergeUniqueArrays(arrays) {
  const merged = [].concat(...arrays);
  return Array.from(new Set(merged)).sort((a, b) => a - b);
}

// Function to fetch data from a given URL
async function fetchData(url) {
  try {
    const response = await axiosTimeout.get(url, { timeout: 500 });
    return response.data.numbers || [];
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    return [];
  }
}

// API endpoint to retrieve numbers from multiple URLs
app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'No URLs provided' });
  }

  const urls = Array.isArray(url) ? url : [url];
  const fetchDataPromises = urls.map((url) => fetchData(url));

  try {
    const results = await Promise.all(fetchDataPromises);
    const mergedNumbers = mergeUniqueArrays(results);
    return res.json({ numbers: mergedNumbers });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});