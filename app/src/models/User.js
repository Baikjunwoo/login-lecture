"use strict";
const UserStorage = require('./UserStorage');

class User{
    constructor(body){
        this.body = body;
    }
    async login(){
        const client = this.body;
        try {
            // 1. 일단 user 변수에 통째로 담습니다. (데이터 없으면 undefined가 담김)
            const user = await UserStorage.getUserInfo(client.id);
    
            if (user) { // 2. user 데이터가 존재할 때만 비교를 시작합니다.
                // DB 컬럼이 pw이므로 user.pw로 비교
                if (user.id === client.id && user.pw === client.pw) {
                    return { success: true, msg: "로그인 성공" };
                }
                return { success: false, msg: "일치하지 않는 비밀번호 로그인 실패" };
            }
            
            // 3. user 데이터가 없으면(undefined) 여기로 옵니다.
            return { success: false, msg: "존재하지 않는 아이디 로그인 실패" };
        } catch (err) {
            return { success: false, msg: "데이터베이스 오류" };
        }
    }
    async register() {
        const client = this.body;
        
        // 1. 빈 값 체크 (null, undefined, 빈 문자열 모두 방어)
        if (!client.id || !client.pw || !client.name || !client.confirmPw) {
            return { success: false, msg: "빈 공간을 모두 입력해주세요." };
        }
    
        // 2. 비밀번호 확인 일치 여부 (입력창이 두 개일 경우)
        if (client.pw !== client.confirmPw) {
            return { success: false, msg: "비밀번호가 일치하지 않습니다." };
        }
    
        try {
            // 3. 아이디 중복 체크
            const existingUser = await UserStorage.getUserInfo(client.id);
            if (existingUser) {
                return { success: false, msg: "중복된 아이디입니다." };
            }
    
            // 4. 모든 조건 통과 시 DB 저장
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, msg: "회원가입 도중 오류가 발생했습니다." };
        }
    }
        
}
module.exports = User;
