module.exports = {
    apps : [{
        name: 'weihang-web',
        script: 'dist/main.js',
        env: {
            NODE_ENV: 'development'
        },
        out_file: './pm2Logs/out.log',
        error_file: './pm2Logs/error.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss SSS',
        merge_logs: true
    }]
};
