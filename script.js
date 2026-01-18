function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}

function toggleDropdown(dropdown) {
    dropdown.classList.toggle("open");
}

function closeAllMenus() {
    document.getElementById("menu").classList.remove("show");
    document.querySelectorAll(".dropdown").forEach(d => {
        d.classList.remove("open");
    });
}

fetch("articles.json")
    .then(response => response.json())
    .then(data => {

        const list = document.getElementById("articleList");

        data.articles.forEach(article => {

            // Home page card
            const card = document.createElement("div");
            card.className = "article-card";
            card.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
                <a class="read-btn" href="${article.path}">पूरा पढ़ें</a>
            `;
            list.appendChild(card);

            // Dropdown item
            const li = document.createElement("li");
            li.textContent = article.title;
            li.onclick = () => {
                window.location.href = article.path;
                closeAllMenus();
            };

            document
                .getElementById(article.category + "-list")
                .appendChild(li);
        });
    });