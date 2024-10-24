/* This file should contain any DOM manipulation
needed to populate the header, nav, and footer elements
*/

document.addEventListener("DOMContentLoaded", () => {
    //Find the header tag and load html
    const header = document.querySelector('header');
    header.innerHTML = `
        <img src = "/images/japan_header.jpeg" class = "header_image">
        <h1 id="location-header">Japan</h1>
    `;

    //Find the nav tag and load html
    const nav = document.querySelector('nav');
    nav.innerHTML = `
        <a href="/">Home</a>
        <a href="/attractions">Attractions</a>
        <a href="/restaurants">Restaurants</a>
        <a href="/new-restaurant">New Restaurant</a>
    `;

    //Find the footer tag and load html
    const footer = document.querySelector('footer');
    footer.innerHTML = `
        <span>Contact Info: akhandelwal1@sfsu.edu</span>
    `;
});
