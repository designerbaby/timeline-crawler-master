
const cheerio = require('cheerio');
const { parseTime } = require('./timeUtils');

function parseHtml (result) {
  // 处理拉取到的数据
  const $ = cheerio.load(result);
  const main = $('#main');
  const articles = main.find('article');
  const final = [];
  articles.each((i, elem) => {
    const id = $(elem).attr('id');
    const time = $(elem)
      .find('.list-article-meta')
      .text()
      .trim()
      .split('·')[1]
      .trim();
    const start = parseTime(time);
    const end = start + 60 * 60 * 1000;
    const content = $(elem)
      .find('.entry-title a')
      .text();
    const link = $(elem)
      .find('.entry-title a')
      .attr('href');
    const desc = $(elem)
      .find('.entry-excerpt p')
      .text();
    final.push({
      articleId: id,
      start: start,
      end: end,
      content: content,
      link: link,
      desc: desc,
      zone: 'all',
      country: 'all',
      modifyUser: 'dw_liujiana',
      modifyTime: Date.now(),
      modifyUid: 50072019
    });
  });
  console.log('整理拉取到的数据成功');
  return final;
}

function compareData (oldData, newData) {
  // 对比两个数据，返回最新的数据
  const oldList = oldData.data.list || [];
  const finalData = oldList.concat(newData);
  const map = new Map();
  const res = [];
  for (let i = 0; i < finalData.length; i += 1) {
    const item = finalData[i];
    if (!map.has(item.articleId)) {
      res.push(item);
      // map[item.articleId] = item
      map.set(item.articleId, item);
    }
  }
  console.log('数据处理去重完成');
  return res;
}

exports.parseHtml = parseHtml;
exports.compareData = compareData;
