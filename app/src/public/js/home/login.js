"use strict";

const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const btn = document.querySelector("#login");

btn.addEventListener("click",  (btn) => {
    const req = {
        id: id.value,
        pw: pw.value,
    };
    console.log(req);
    console.log(JSON.stringify(req));
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: req.json,
    });
    console.log("fetch : " + req.json);
});

