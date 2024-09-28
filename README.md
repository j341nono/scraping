# scraping
Wikipedia Scraping Tools

This repository contains two different scraping tools for retrieving information from Wikipedia, utilizing different libraries: **cheerio-httpcli** and **axios**. Each tool offers a unique approach to web scraping, allowing you to choose based on your preferences.
このリポジトリは、Wikipediaから情報を取得するための2つの異なるスクレイピングツールを提供します。

## 概要
- **cheerio-httpcli**: A simple tool that combines HTTP requests with Cheerio for HTML parsing, making it easy to extract information from web pages.
- **cheerio-httpcli**: 簡単に使用できるスクレイピングツールで、HTMLをパースするためにCheerioを使用します。
- - **axios**: A Promise-based HTTP client that can be used to perform requests and retrieve data efficiently.
- **axios**: HTTPリクエストを行うためのPromiseベースのクライアントです。

## 必要な依存関係
To use these tools, you'll need to install the necessary dependencies:
```bash
npm install cheerio-httpcli
npm install axios
