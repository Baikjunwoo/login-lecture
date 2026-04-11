"use strict";

const logger = require('../../config/logger'); 
const User = require('../../models/User');

const output = {
    home : (req, res) => {
        logger.info('GET / 200 홈페이지 화면으로 이동');
        res.render('home/index.ejs');
    },

    login : (req, res) => {
        logger.info('GET /login 200 로그인 화면으로 이동');
        res.render('home/login.ejs');
    },
    register : (req, res) => {
        logger.info('GET /register 200 회원가입 화면으로 이동');
        res.render('home/register.ejs');
    },
};



const process = {
    login : async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200,
        }
        log(response, url);
        return res.status(url.status).json(response);
    },
    register : async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        const url = {
            method: "POST",
            path: "/register",
            status: response.err ? 400 : 201,
        }
        log(response, url);
        return res.status(url.status).json(response);
    },
    
};

const log = (response, url) => {
    if(response.err) {
        logger.error(`${url.method},${url.path},${url.status} error : "success :  ${response.success}, err : ${response.err}"`);
    } else {
        logger.info(`${url.method},${url.path},${url.status}` + " response :" + JSON.stringify(response));
    }
};

module.exports = {
    output : output,
    process : process,
};

const user = new User();
