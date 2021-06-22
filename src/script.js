"use strict";

const app = document.querySelector("#app");
const endpoint = "https://vanillajsacademy.com/api/dragons.json";

async function getArticles() {
    try {
        // Fetch data from API
        let response = await fetch(endpoint);
        // Check if response return with no errors,
        // otherwise throw status of response to errorhandler
        if (!response.ok) throw response.status;

        // Convert response to json data
        // Check if response contain data if not throw error
        let data = await response.json();
        if (!data) throw "No data";
        //console.log(data.articles[0]);

        let header = data.publication;
        let articles = data.articles;
        console.log(articles[0].title);
        console.log(articles[0].author);
        console.log(articles[0].pubdate);
        console.log(articles[0].article);

        app.innerHTML = `
        <h1 class="header">${header}</h1> 
        <div class="article-container">
            <ul>
            ${articles
                .map(function (article) {
                    return `<li>${article}</li>`;
                })
                .join("")}
            </ul>
            
        </div>`;
    } catch (error) {
        app.innerHTML =
            "There have been an error. Please refresh page or try again later.";
        console.warn(error);
    }
}

getArticles();
