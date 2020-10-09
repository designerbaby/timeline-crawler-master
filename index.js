const cron = require('node-cron');

const {
  doRequest,
  batchAddArticleApi,
  getArticleApi,
  deleteArticleApi
} = require('./utils/agentUtils');
const { parseHtml, compareData } = require('./utils/htmlUtils');

async function toBatchAddArticle (data) {
  const res = await batchAddArticleApi(data); // 批量上传到后台数据库
  console.log('batchAddArticleApi res:', res);
  if (res.code === 0) {
    console.log('批量增加事件成功');
  } else {
    console.log(`批量增加事件失败,失败原因:${res.msg}, 错误码: ${res.code}`);
  }
}

const init = async () => {
  const body = await doRequest(); // 爬取外网的网络数据
  const final = await parseHtml(body); // 整理数据
  const oldData = await getArticleApi(); // 拉取数据库数据
  const lastData = compareData(oldData, final); // 比较两者的数据，去重之后放上去
  const res = await deleteArticleApi(); // 删除数据库里面的数据
  console.log('deleteArticleApi res:', res);
  if (res.code === 0) {
    console.log('删除数据库里面的数据成功');
    await toBatchAddArticle(lastData);
  } else {
    console.log(
      `删除数据库里面的数据失败,失败原因:${res.msg}, 错误码: ${res.code}`
    );
  }
};

const start = () => {
  // 每天10点01分01秒定时执行1次。
  cron.schedule('01 01 10 * * *', init, { scheduled: true });
  console.log('app is started');
// 测试:每分钟的10秒执行1次。
//   cron.schedule('10 * * * * *', () => {
//     const d = new Date();
//     console.log(d);
//   }, { scheduled: true });
};

module.exports = start();
