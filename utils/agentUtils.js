const request = require('request');
const {
  batchAddArticle,
  getArticle,
  deleteArticle
} = require('../resource/api');

const accept =
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8';
// const acceptEncoding = 'gzip, deflate, br';
const acceptLanguage =
  'en-US,en;q=0.9,en-US;q=0.8,en-IN;q=0.7,en;q=0.6,id;q=0.5';
const userAgent =
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36';

const headers = {
  Accept: accept,
  'Accept-Encoding': '',
  'Accept-Language': acceptLanguage,
  'User-Agent': userAgent,
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive'
};

async function doRequest () {
  const body = await new Promise(resolve => {
    const options = {
      url: 'https://netblocks.org/reports',
      // gzip: true,
      headers: {
        ...headers
      }
    };
    request(options, (error, response, body) => {
      const status = response && response.statusCode;
      if (error || status !== 200) {
        console.log(`doRequest result, error:${error}, code:${status}`);
        resolve('');
      } else {
        console.log('爬取外网的网络数据成功');
        resolve(body);
      }
    }).on('error', () => {
      console.log('获取数据失败！');
    });
  });
  return body;
}

async function getArticleApi () {
  let res = {};
  try {
    res = await getArticle();
  } catch (e) {
    console.log('getArticle e:', e);
  }
  return res;
}

async function batchAddArticleApi (data) {
  const options = {
    itemList: data
  };
  let res = {};
  try {
    res = await batchAddArticle(options);
  } catch (e) {
    console.log('batchAddArticle e :', e);
  }
  return res;
}

async function deleteArticleApi () {
  let res = {};
  try {
    res = await deleteArticle();
  } catch (e) {
    console.log('deleteArticle e:', e);
  }
  return res;
}

exports.doRequest = doRequest;
exports.batchAddArticleApi = batchAddArticleApi;
exports.getArticleApi = getArticleApi;
exports.deleteArticleApi = deleteArticleApi;
