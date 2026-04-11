// const mysql = require('mysql2');
// const db = mysql.createConnection({
//     host: "login-lecture.c54c4oes6st5.ap-northeast-2.rds.amazonaws.com",
//     user: "admin",
//     password: "123456789",
//     database: "login_lecture",

// });

// db.connect();

// module.exports = db;

// 기존: const mysql = require('mysql');
const mysql = require('mysql2'); // 뒤에 숫자 '2'를 꼭 붙여야 합니다!

const db = mysql.createConnection({
    host: process.env.DB_HOST, // 환경 변수에서 DB 호스트를 가져옵니다.
    user: process.env.DB_USER, // 환경 변수에서 DB 사용자 이름을 가져옵니다.
    password: process.env.DB_PASSWORD, // 환경 변수에서 DB 비밀번호를 가져옵니다.
    database: process.env.DB_NAME // 환경 변수에서 DB 이름을 가져옵니다.,
});

db.connect((err) => {
    if (err) {
        console.error('DB 연결 에러:', err);
        return;
    }
    console.log('DB 연결 성공!');
});

module.exports = db;
