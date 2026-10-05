const music = document.getElementById("music");
const cards = document.querySelectorAll(".memory");
const buttons = document.querySelectorAll(".poem-btn");

buttons.forEach((button, index) => {
  button.addEventListener("click", async () => {
    const poem = cards[index].querySelector(".poem");
    const alreadyOpen = poem.classList.contains("open");

    document.querySelectorAll(".poem.open").forEach(p => {
      if (p !== poem) p.classList.remove("open");
    });

    poem.classList.toggle("open", !alreadyOpen);
    button.querySelector("span").textContent = !alreadyOpen ? "♥" : "♡";

    // İlk fotoğrafın butonuna basıldığında müzik başlar.
    if (index === 0 && !alreadyOpen) {
      try {
        await music.play();
      } catch (e) {
        // Tarayıcı izin vermezse kullanıcı tekrar butona basabilir.
      }
    }

    if (!alreadyOpen) {
      setTimeout(() => {
        poem.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 180);
    }
  });
});

// Kartlar ekrana geldikçe yumuşakça belirir.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

cards.forEach(card => observer.observe(card));

// Çok hafif kalp animasyonu.
const hearts = document.querySelector(".hearts");
setInterval(() => {
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = Math.random() > .5 ? "♡" : "♥";
  h.style.left = Math.random() * 100 + "%";
  h.style.fontSize = (10 + Math.random() * 14) + "px";
  h.style.animationDuration = (7 + Math.random() * 7) + "s";
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 15000);
}, 1300);
