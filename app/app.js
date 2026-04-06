"use strict";

// 모듈
const express = require('express');
// express() : express 모듈을 사용하여 애플리케이션 객체를 생성하는 함수, 애플리케이션 객체는 Express 애플리케이션의 핵심 객체로, 라우팅, 미들웨어, 설정 등을 관리하는 역할을 함
const app = express();

// 라우터
const home = require('./src/routes/home');
const bodyParser = require('body-parser');

// 앱 세팅
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static(`${__dirname}/src/public`)); // 정적 파일 제공, __dirname : 현재 파일의 경로, /src/public : 정적 파일이 위치한 폴더 경로
app.use(bodyParser.json()); // JSON 형태의 데이터를 처리하기 위한 미들웨어, 클라이언트에서 보낸 JSON 데이터를 req.body로 파싱해줌
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형태의 데이터를 처리하기 위한 미들웨어, 클라이언트에서 보낸 URL-encoded 데이터를 req.body로 파싱해줌, extended: true : 중첩된 객체를 허용하겠다.
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