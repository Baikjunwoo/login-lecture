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
        if(response.err) {
                logger.error(`GET /login error : "success :  ${response.success}, err : ${response.err}"`);
                return res.json(response);
        } else {
            logger.info('GET /login response : ' + JSON.stringify(response));
            return res.json(response);
        }
    },
    register : async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        if(response.err) {
            logger.error(`GET /login error : "success :  ${response.success}, err : ${response.err}"`);
            return res.json(response);
        } else {
        logger.info('GET /login response : ' + JSON.stringify(response));
        return res.json(response);
        }
    },
    
};

module.exports = {
    output : output,
    process : process,
};

const user = new User();
