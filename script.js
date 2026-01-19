function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

function toggleDropdown(el) {
  el.classList.toggle("open");
}

// सही पाथ बनाने की फंक्शन
function getCorrectPath(path) {
  // अगर पहले से ही पूरा पाथ है तो वही रहने दें
  if (path.startsWith('http') || path.startsWith('/')) {
    return path;
  }
  
  // करंट पेज के हिसाब से पाथ ठीक करें
  const currentPage = window.location.pathname;
  if (currentPage.includes('/articles/') || 
      currentPage.includes('gallery.html') || 
      currentPage.includes('about.html')) {
    return '../' + path; // एक लेवल ऊपर जाएँ
  }
  return path; // index.html से तो सीधा पाथ ठीक है
}

fetch("articles.json")
.then(res => res.json())
.then(data => {
  const list = document.getElementById("articleList");

  data.articles.forEach(a => {
    if (list) {
      const card = document.createElement("div");
      card.className = "article-card";
      const correctPath = getCorrectPath(a.path);
      
      card.innerHTML = `
        <img src="${a.image}" alt="${a.title}">
        <div class="content">
          <h3>${a.title}</h3>
          <div class="date">${a.date}</div>
          <p>${a.summary}</p>
          <a class="read-btn" href="${correctPath}">पूरा पढ़ें</a>
        </div>
      `;
      list.appendChild(card);
    }

    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = getCorrectPath(a.path);
    link.textContent = a.title;
    li.appendChild(link);

    const target = document.getElementById(a.category + "-list");
    if (target) target.appendChild(li);
  });
})
.catch(error => {
  console.error("JSON लोड करने में त्रुटि:", error);
});