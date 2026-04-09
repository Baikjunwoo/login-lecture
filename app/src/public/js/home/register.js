"use strict";

const name = document.querySelector("#name");
const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const confirmPw = document.querySelector("#confirm-pw");
const registerBtn = document.querySelector(".register-form button");

registerBtn.addEventListener("click",  (registerBtn) => {
    if(!id.value || !pw.value || !confirmPw.value || !name.value) {
        return alert("빈공간을 입력해주세요."); // 아이디, 비밀번호, 확인 비밀번호 중 하나라도 입력되지 않았을 때 경고 메시지 출력
    };
    if(pw.value !== confirmPw.value) {
        return alert("비밀번호가 일치하지 않습니다."); // 비밀번호와 확인 비밀번호가 일치하지 않을 때 경고 메시지 출력
    };

    const req = {
        name: name.value,
        id: id.value,
        pw: pw.value,
        //confirmPw: confirmPw.value,
    };
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success) {
            location.href = "/login"; // 회원가입 성공 시 로그인으로 이동
        } else {
            alert(res.msg); // 회원가입 실패 시 메시지 출력
        };
    }).catch((err) => {
        console.error(new Error("회원가입 중 에러 발생"));
    });
});