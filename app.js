"use strict";


// 모듈
const express = require('express');
const app = express();

// 앱 세팅
app.set('view engine', 'ejs');
app.set('views', './views');
// 라우터
const home = require('./routes/home');
app.use("/", home); // use : 미들웨어를 등록해주는 메서드, "/" : 모든 경로에 대해 home 라우터를 등록하겠다.


module.exports = app;














// const http = require('http');
// const app = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//     if (req.url === '/') {
//         res.end('여기는 루트입니다.');
//     } else if (req.url === '/login') {
//         res.end('여기는 로그인 페이지입니다.');
//     } else {
//         res.end('페이지를 찾을 수 없습니다.');
//     }
// });

// app.listen(3001, () => {
//     console.log('3001번 포트에서 http서버 대기 중입니다.');
// });