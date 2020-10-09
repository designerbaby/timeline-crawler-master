const { config } = require('./config');
const request = require('request');

const bossUrl = config.isProdEnv
  ? 'https://xxxx.xxxx.xxx' // 正式环境域名地址
  : 'https://xxxx.xxx.xxx'; // 测试环境域名地址
// const bossUrl = 'http://127.0.0.1:3400'

// 批量增加文章事件
const batchAddArticle = async data => {
  const path = '/timeline/crawler/batchAddArticle';
  const body = await new Promise(resolve => {
    request(
      {
        url: `${bossUrl}${path}`,
        method: 'POST',
        json: true,
        headers: {
          'content-type': 'application/json'
        },
        body: data
      },
      (error, response, body) => {
        const status = response && response.statusCode;
        if (error || status !== 200) {
          console.log(
            `batchAddArticle result, error: ${error}, code: ${status}`
          );
          resolve('');
        } else {
          resolve(body);
        }
      }
    );
  });
  return body;
};

// 查询文章列表
const getArticle = async () => {
  const path = '/timeline/crawler/getArticle';
  const body = await new Promise(resolve => {
    const options = {
      url: `${bossUrl}${path}`
    };
    request(options, (error, response, body) => {
      const status = response && response.statusCode;
      if (error || status !== 200) {
        console.log(`getArticle result, error: ${error}, code: ${status}`);
        resolve('');
      } else {
        console.log('查询文章列表成功');
        resolve(JSON.parse(body));
      }
    }).on('error', () => {
      console.log('查询文章列表失败！');
    });
  });
  return body;
};

// 删除文章列表
const deleteArticle = async () => {
  const path = '/timeline/crawler/deleteArticle';
  const body = await new Promise(resolve => {
    const options = {
      url: `${bossUrl}${path}`
    };
    request
      .delete(options, (error, response, body) => {
        const status = response && response.statusCode;
        if (error || status !== 200) {
          console.log(`deleteArticle result, error: ${error}, code: ${error}`);
          resolve('');
        } else {
          resolve(JSON.parse(body));
        }
      })
      .on('error', () => {
        console.log('删除文章列表失败！');
      });
  });
  return body;
};
exports.batchAddArticle = batchAddArticle;
exports.getArticle = getArticle;
exports.deleteArticle = deleteArticle;
