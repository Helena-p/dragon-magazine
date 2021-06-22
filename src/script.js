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

        app.innerHTML = `
        <h1 class="header">${header}</h1> 
        <div class="article-container">
           
            ${articles
                .map(function (article) {
                    return `<div class="article-container__box">
                    <h2 class="header-secondary">${article.title}</h2>
                    <h3 class="header-tertiary">By ${article.author}</h3>
                    <p class="paragraph">${article.article}</p>
                    <p class="paragraph"><small>${article.pubdate}, Read the whole story: <a href="#"> ${article.url}</a></small></p>
                    </div>`;
                })
                .join("")}
            
            
        </div>`;
    } catch (error) {
        app.innerHTML =
            "There have been an error. Please refresh page or try again later.";
        console.warn(error);
    }
}

getArticles();
