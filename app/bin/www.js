"use strict";

const logger = require('../src/config/logger.js');
const app = require('../app');
const PORT = process.env.PORT || 3000; // 환경 변수에서 PORT 값을 가져오거나, 없으면 3000을 기본값으로 사용

app.listen(PORT, () => {
    logger.info(`${PORT}번 포트에서 서버 대기 중입니다.`);
});

