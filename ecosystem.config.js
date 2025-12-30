module.exports = {
  apps: [{
    name: 'horizon-landing',
    script: 'npm',
    args: 'start',
    cwd: '/home/horizoncompetitionschool/htdocs/horizoncompetitionschool.com',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/root/.pm2/logs/horizon-landing-error.log',
    out_file: '/root/.pm2/logs/horizon-landing-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};

