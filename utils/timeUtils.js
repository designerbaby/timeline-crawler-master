const Moment = require('moment');

const addZero = num => {
  if (num < 10) return `0${num}`;
  return `${num}`;
};

const parseTime = tmp => {
  const tmpMap = tmp.split(',');
  const beforeMap = tmpMap[0].split(' ');
  const transform = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
  };
  const month = addZero(transform[beforeMap[0]]);
  const year = tmpMap[1].trim();
  const date = addZero(beforeMap[1]);
  const temp = `${year}-${month}-${date}`;
  return Moment(temp).valueOf();
};

exports.parseTime = parseTime;
