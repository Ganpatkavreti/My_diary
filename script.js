function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}

fetch("articles.json")
    .then(res => res.json())
    .then(data => {

        document.getElementById("articleFrame").src = data.latest;

        data.articles.forEach(article => {
            const li = document.createElement("li");
            li.textContent = article.title;
            li.onclick = () => {
                document.getElementById("articleFrame").src = article.path;
            };

            if (article.category === "darshan") {
                document.getElementById("darshan-list").appendChild(li);
            }
            if (article.category === "vigyan") {
                document.getElementById("vigyan-list").appendChild(li);
            }
            if (article.category === "anya") {
                document.getElementById("anya-list").appendChild(li);
            }
        });
    });