"use strict";

// 모듈
const express = require('express');
const app = express();  // express() : express 모듈을 사용하여 애플리케이션 객체를 생성하는 함수, 애플리케이션 객체는 Express 애플리케이션의 핵심 객체로, 라우팅, 미들웨어, 설정 등을 관리하는 역할을 함
const bodyParser = require('body-parser'); // HTTP 요청의 본문을 파싱하는 미들웨어, 클라이언트에서 보낸 데이터를 req.body로 파싱해주는 역할을 함, 예를 들어 JSON 형태의 데이터를 처리하기 위해 bodyParser.json()을 사용하거나, URL-encoded 형태의 데이터를 처리하기 위해 bodyParser.urlencoded()를 사용할 수 있음
const dotenv = require('dotenv'); // 환경 변수 관리를 위한 모듈, .env 파일에 정의된 환경 변수들을 쉽게 사용할 수 있도록 도와줌, 예를 들어 DB 연결 정보, API 키 등을 .env 파일에 저장하고 애플리케이션에서 process.env를 통해 접근할 수 있음
const morgan = require('morgan'); // HTTP 요청 로깅 미들웨어, 클라이언트로부터 들어오는 HTTP 요청에 대한 정보를 콘솔에 출력해주는 역할을 함, 개발 중에 요청의 상세 정보를 확인하는 데 유용함
const logger = require('./src/config/logger'); // 로그 관리 모듈, 애플리케이션에서 발생하는 로그를 관리하는 역할을 함, 예를 들어 애플리케이션에서 발생하는 에러나 중요한 이벤트를 로그 파일에 기록하거나 콘솔에 출력할 수 있음
dotenv.config();  // .env 파일의 내용을 process.env 객체에 로드하는 역할, .env 파일은 애플리케이션에서 사용할 환경 변수들을 정의하는 파일, 예를 들어 DB 연결 정보, API 키 등을 저장할 수 있음
const fs = require('fs'); // 파일 시스템 모듈, 파일을 읽거나 쓰는 등의 작업을 수행할 수 있도록 도와줌, 예를 들어 로그 파일에 HTTP 요청 정보를 기록하기 위해 fs.createWriteStream()을 사용할 수 있음
const accessLogStream = require('./src/config/log.js');  // 로그 파일 스트림, HTTP 요청 정보를 기록할 로그 파일에 대한 쓰기 스트림을 생성하는 역할, 예를 들어 fs.createWriteStream()을 사용하여 로그 파일에 대한 쓰기 스트림을 생성하고, morgan 미들웨어에서 이 스트림을 사용하여 HTTP 요청 정보를 로그 파일에 기록할 수 있음


// 라우터
const home = require('./src/routes/home');



// 앱 세팅
app.set('view engine', 'ejs'); // view engine : 템플릿 엔진을 설정하는 메서드, ejs : Embedded JavaScript의 약자로, HTML 내에 JavaScript 코드를 삽입할 수 있는 템플릿 엔진, app.set('view engine', 'ejs') : 애플리케이션에서 EJS를 템플릿 엔진으로 사용하겠다. 이렇게 설정하면 res.render() 메서드를 사용할 때 EJS 파일을 렌더링할 수 있게 됨
app.set('views', './src/views'); // views : 템플릿 파일이 위치한 폴더 경로, ./src/views : 현재 파일에서 src/views 폴더를 참조하겠다. 템플릿 엔진이 렌더링할 때 이 경로에서 템플릿 파일을 찾게 됨
app.use(express.static(`${__dirname}/src/public`)); // 정적 파일 제공, __dirname : 현재 파일의 경로, /src/public : 정적 파일이 위치한 폴더 경로
app.use(bodyParser.json()); // JSON 형태의 데이터를 처리하기 위한 미들웨어, 클라이언트에서 보낸 JSON 데이터를 req.body로 파싱해줌
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형태의 데이터를 처리하기 위한 미들웨어, 클라이언트에서 보낸 URL-encoded 데이터를 req.body로 파싱해줌, extended: true : 중첩된 객체를 허용하겠다.
app.use(morgan('common', {stream : accessLogStream})); // tiny : 간단한 로그 형식, HTTP 요청에 대한 간단한 정보를 출력 // dev : 개발용 로그 형식, HTTP 요청에 대한 상세한 정보를 출력
app.use(morgan('tiny', {stream : logger.stream})); // combined : Apache combined 로그 형식, HTTP 요청에 대한 상세한 정보를 출력, 예를 들어 클라이언트의 IP 주소, 요청 메서드, 요청 URL, 응답 상태 코드, 응답 시간 등을 포함하는 로그 형식

app.use("/", home); // use : 미들웨어를 등록해주는 메서드, "/" : 모든 경로에 대해 home 라우터를 등록하겠다.


module.exports = app;














/**
 * Using a custom format function
 * morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})
 * 
 * // EXAMPLE: only log error responses
morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
})
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */