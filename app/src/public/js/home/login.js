"use strict";

const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const btn = document.querySelector(".login-form button");

btn.addEventListener("click",  (btn) => {
    const req = {
        id: id.value,
        pw: pw.value,
    };
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success) {
            location.href = "/"; // 로그인 성공 시 홈으로 이동
        } else {
            alert(res.msg); // 로그인 실패 시 메시지 출력
        };
    }).catch((err) => {
        console.error(new Error("로그인 중 에러 발생"));
    });
});
