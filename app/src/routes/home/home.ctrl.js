"use strict";

const users = {
    id : ["admin", "jun", "min"],
    pw : ["1234", "123456", "123456789"],
};

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
        const id = req.body.id;
        const pw = req.body.pw;
        if(users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if(users.pw[idx] === pw){
                return res.send({ success : true });
            } else {
                return res.send({ success : false, msg : "로그인실패" });
            };
        }else {
            return res.send({ success : false, msg : "존재하지 않는 아이디입니다." });
        }
    },
    
};

module.exports = {
    output : output,
    process : process,
};