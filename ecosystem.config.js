module.exports = {
  apps: [
    {
      name: 'timeline-crawler',
      script: 'index.js',
      env: {},
      // exec_mode: 'fork',
      wait_ready: true,
      // instances: 'max',
      // instance_var: 'INSTANCE_ID',
      listen_timeout: 5000,
      error_file: '/data/weblog/node/timeline-crawler/pm2error.log',
      out_file: 'NULL',
      max_memory_restart: '2G',
      max_restarts: 50
    }
  ]
};
