const axios = require('axios');

async function fetchWikipediaContent(keyword) {
  try {
    const url = `https://ja.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=true&titles=${encodeURIComponent(keyword)}`;
    
    const response = await axios.get(url);
    const pages = response.data.query.pages;
    const pageId = Object.keys(pages)[0];
    const content = pages[pageId].extract;

    return {
      keyword: keyword,
      summary: content || 'コンテンツが見つかりませんでした。'
    };
  } catch (error) {
    console.error(`Error fetching Wikipedia content for ${keyword}:`, error);
    return {
      keyword: keyword,
      summary: 'エラーが発生しました。情報を取得できませんでした。'
    };
  }
}

module.exports = { fetchWikipediaContent };