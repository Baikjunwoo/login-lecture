"use strict";

class UserStorage {
    static #users = {
        id : ["admin", "jun", "min"],
        pw : ["1234", "123456", "123456789"],
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
};

module.exports = UserStorage;