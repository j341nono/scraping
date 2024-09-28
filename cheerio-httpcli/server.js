//Express.jsフレームワークを使用してWebサーバーを構築
const express = require('express');
const path = require('path');
const { scrapeWikipedia, saveToFile } = require('./wikipediaScraper');

const app = express();
const port = 3000;

//express.json()ミドルウェアを使用してJSONリクエストボディのパースを行う
app.use(express.json());
//express.static('public')で静的ファイル（HTML、CSS、クライアントサイドJavaScript）の提供を設定
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/scrape', async (req, res) => {
  const { keyword } = req.body;
  const result = await scrapeWikipedia(keyword);
  
  // ファイルに保存
  const filename = `${keyword}.txt`;
  saveToFile(result, path.join(__dirname, 'public', filename));
  
  res.json({ ...result, filename });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});