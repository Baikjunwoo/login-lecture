"use strict";


const app = require('../app');
const prot = process.env.PORT || 3000; // 환경 변수에서 PORT 값을 가져오거나, 없으면 3000을 기본값으로 사용


app.listen(prot, () => {
    console.log('3000번 포트에서 서버 대기 중입니다.');
});

