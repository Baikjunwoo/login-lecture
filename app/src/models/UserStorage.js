"use strict";

const fs = require('fs').promises;

class UserStorage {
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKyes = Object.keys(users);
        const userInfo = usersKyes.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }
    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data);
        if(isAll) return users;
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    };
    
    static getUsers(isAll, ...fields) {
        return fs.readFile("./src/databases/users.json")
        .then((data) => {
            return this.#getUsers(data, isAll, fields);
        })
        .catch(console.error);

        
    }

    static getUserInfo(id) {
        //const files = fs.readFile("./src/databases/users.json");
        return fs.readFile("./src/databases/users.json")
        .then((data) => {
            return this.#getUserInfo(data, id);
        })
        .catch(console.error);
            //return files;
    }
    
    static async save(userInfo){
        const users = await this.getUsers(true);
        if(users.id.includes(userInfo.id)) {
            return { success : false, msg : "중복된 아이디입니다" };
        }
        users.id.push(userInfo.id);
        users.pw.push(userInfo.pw);
        users.name.push(userInfo.name);
        await fs.writeFile("./src/databases/users.json", JSON.stringify(users));
        return { success : true, msg : "회원가입 성공" };
    };
};
module.exports = UserStorage;
