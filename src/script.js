"use strict";

const app = document.querySelector("#app");
const endpoint = "https://vanillajsacademy.com/api/dragons.json";
let html = app.innerHTML;

async function getArticles() {
    try {
        let response = await fetch(endpoint);

        if (!response.ok) throw response.status;

        let data = await response.json();
        if (!data) throw "No data";
        console.log(data.publication);
        console.log(data.articles);

        let header = data.publication;

        app.innerHTML = `<h1 class="header">${header}</h1> ${data.articles
            .map(function (article) {
                return `${article}`;
            })
            .join("")}`;
    } catch (error) {
        app.innerHTML =
            "There have been an error. Please refresh page or try again later.";
        console.warn(error);
    }
}

getArticles();
