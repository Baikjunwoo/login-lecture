"use strict";

class UserStorage {
    static #users = {
        id : ["admin", "jun", "min"],
        pw : ["1234", "123456", "123456789"],
        name : [],
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUserInfo(id) {
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const usersKyes = Object.keys(users);
        const userInfo = usersKyes.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }
    static save(userInfo){
        const users = this.#users;
        if(users.id.includes(userInfo.id)){
            return { success : false, msg : "이미 존재하는 아이디입니다."};
        }
        users.id.push(userInfo.id);
        users.pw.push(userInfo.pw);
        users.name.push(userInfo.name);
        console.log(users);
        return { success : true, msg : "회원가입 성공"};
    };
};

module.exports = UserStorage;