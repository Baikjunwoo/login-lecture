"use strict";

const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const btn = document.querySelector("#login");

btn.addEventListener("click",  (btn) => {
    const req = {
        id: id.value,
        pw: pw.value,
    };
});

