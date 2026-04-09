"use strict";
const UserStorage = require('./UserStorage');

class User{
    constructor(body){
        this.body = body;
    }
    login(){
        const client = this.body;
        const {id, pw} = UserStorage.getUserInfo(client.id);
        if(id){
            if(id === client.id && pw === client.pw){
                return { success : true , msg : "로그인 성공"};
            } else {   
                return { success : false, msg : "일치하지 않는 비밀번호 로그인 실패" };  
            }
        } return { success : false, msg : "존재하지 않는 아이디 로그인 실패" };
    }
    register(){
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }
};
module.exports = User;