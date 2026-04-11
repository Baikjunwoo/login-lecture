const fs = require('fs');
const appRoot = require('app-root-path'); // 애플리케이션의 루트 디렉토리를 쉽게 참조할 수 있도록 도와주는 모듈, 예를 들어 app-root-path를 사용하여 애플리케이션의 루트 디렉토리를 참조하고, 그 경로에 로그 파일을 생성할 수 있음

const accessLogStream = fs.createWriteStream(`${appRoot}/log/access.log`, { flags: 'a' }) 

module.exports = accessLogStream;