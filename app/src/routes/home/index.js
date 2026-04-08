"use strict";

// require() : 모듈을 불러오는 함수, 모듈 : 다른 파일에서 작성된 코드, 라이브러리, 프레임워크 등을 의미, require() 함수는 모듈을 불러와서 사용할 수 있도록 해줌
const express = require('express');
// Router() : 라우터 객체를 생성하는 메서드, 라우터 객체는 라우팅을 처리하는 객체로, 라우팅 : 클라이언트의 요청에 대해 어떤 처리를 할지 결정하는 것, 예를 들어, 클라이언트가 "/login" 경로로 요청을 보냈을 때, 로그인 페이지를 보여주는 처리를 하는 것
const router = express.Router();

const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/register', ctrl.output.register);
router.post('/login', ctrl.process.login);


module.exports = router;

