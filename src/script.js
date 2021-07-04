"use strict";

const app = document.querySelector("#app");
const endpoint = "https://vanillajsacademy.com/api/dragons.json";

/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
function sanitizeHTML(str) {
    return str
        .replace(/javascript:/gi, "")
        .replace(/[^\w-_. ]/gi, function (c) {
            return `&#${c.charCodeAt(0)};`;
        });
}

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

        // If no articles to show
        if (!articles || articles.length < 1) {
            throw "No articles found";
        }

        app.innerHTML = `
        <h1 class="header">${sanitizeHTML(header)}</h1> 
        <div class="article-container">
           
            ${articles
                // Iterate over the data and extract the elements and render
                // on page in html markup
                .map(function (article) {
                    return `<div class="article-container__box">
                    <h2 class="header-secondary">${sanitizeHTML(
                        article.title
                    )}</h2>
                    <h3 class="header-tertiary">By ${sanitizeHTML(
                        article.author
                    )}</h3>
                    <p class="paragraph">${sanitizeHTML(article.article)}</p>
                    <p class="paragraph"><small>${sanitizeHTML(
                        article.pubdate
                    )}, Read the whole story: <a href="#"> ${article.url}</a></small></p>
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
