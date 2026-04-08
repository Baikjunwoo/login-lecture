"use strict";

const User = require('../../models/User');

const output = {
    home : (req, res) => {
        res.render('home/index.ejs');
    },

    login : (req, res) => {
        res.render('home/login.ejs');
    },
};

const process = {
    login : (req, res) => {
        const user = new User(req.body);
        const response = user.login();
        return res.json(response);
    },
    
};

module.exports = {
    output : output,
    process : process,
};

const user = new User();
