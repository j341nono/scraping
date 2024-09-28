const express = require('express');
const path = require('path');
const fs = require('fs'); // 追加
const { fetchWikipediaContent } = require('./wikipediaApiFetcher');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/fetch', async (req, res) => {
  const { keyword } = req.body;
  const result = await fetchWikipediaContent(keyword);
  res.json(result);

  // ファイル名の生成
  const filename = `${keyword}.txt`;
  const filePath = path.join(__dirname, 'public', filename);

  // ファイルの保存
  fs.writeFile(filePath, result.summary, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({ error: 'ファイルの保存中にエラーが発生しました。' });
    }

    // 成功した場合、結果とファイル名を返す
    res.json({ ...result, filename });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});