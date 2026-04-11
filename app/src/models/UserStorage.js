"use strict";

const db = require('../config/db');

class UserStorage {
    static getUsers(isAll, ...fields) {
        
    }
    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE id = ?`, [id], (err, data) => {
            if(err)  reject(err)
            resolve(data[0])
        });
    });
    }
    
    static async save(userInfo){
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO users(name, id, pw) VALUES(?, ?, ?)`;
            db.query(query, [userInfo.name, userInfo.id, userInfo.pw], (err, data) => {
            if(err)  reject({succsess: false})
            resolve({succsess: true, msg: "회원가입 성공"})
        });
    });
    }
};
module.exports = UserStorage;
