

const name = document.querySelector("#name");
const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const confirmPw = document.querySelector("#confirm-pw");
const registerBtn = document.querySelector(".register-form button");

registerBtn.addEventListener("click",  (registerBtn) => {
    const req = {
        name: name.value,
        id: id.value,
        pw: pw.value,
        confirmPw: confirmPw.value,
    };
    fetch("/register", {
        method: "GET",
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