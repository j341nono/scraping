//cheerio-httpcliライブラリを使用してHTTPリクエストとHTMLパーシングを行う
const client = require('cheerio-httpcli');
const fs = require('fs');

//非同期関数（async/await）を使用し、Wikipediaページの取得とパーシングを行う
async function scrapeWikipedia(keyword) {
  try {
    // Wikipedia検索URLの構築
    //encodeURIComponentを使用して、URLに安全にキーワードを組み込む
    const searchUrl = `https://ja.wikipedia.org/wiki/${encodeURIComponent(keyword)}`;
    
    // ページの取得
    const result = await client.fetch(searchUrl);
    
    // 最初の段落を抽出
    //cheerioのセレクタ$('#mw-content-text > div > p').first()を使用
    const firstParagraph = result.$('#mw-content-text > div > p').first().text();
    
    return {
      keyword: keyword,
      summary: firstParagraph
    };
  } catch (error) {
    console.error(`Error scraping Wikipedia for ${keyword}:`, error);
    return {
      keyword: keyword,
      summary: 'エラーが発生しました。情報を取得できませんでした。'
    };
  }
}

// テキストファイルとして保存する関数
function saveToFile(data, filename) {
  const content = `キーワード: ${data.keyword}\n\n要約:\n${data.summary}`;
  fs.writeFileSync(filename, content, 'utf8');
}

module.exports = { scrapeWikipedia, saveToFile };