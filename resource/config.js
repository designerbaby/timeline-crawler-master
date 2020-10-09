const fs = require('fs');
// git分支名称
const branch = String(fs.readFileSync('./branchinfo', 'utf8')).split('\n')[0];

const NODE_ENV = process.env.NODE_ENV;
const ENV =
  NODE_ENV === 'test' ? 'test' : branch === 'master' ? 'prod' : 'test';

const config = {
  ENV,
  isProdEnv: ENV === 'prod'
};

exports.config = config;
