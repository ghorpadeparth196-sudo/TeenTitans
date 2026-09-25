const characters = [
  {
    name: "Robin",
    file: "robin.jpg",
    role: "Leader",
    bio: "Focused, fearless, and always five steps ahead. Robin keeps the team moving—even when the plan is a little too intense.",
    tags: ["Leadership", "Martial arts", "Tech"]
  },
  {
    name: "Raven",
    file: "raven.jpg",
    role: "Empath",
    bio: "A calm voice in the chaos. Raven channels immense mystical power while mastering the most difficult spell of all: opening up.",
    tags: ["Mystic arts", "Telekinesis", "Empathy"]
  },
  {
    name: "Starfire",
    file: "starfire.jpg",
    role: "Powerhouse",
    bio: "Princess of Tamaran, collector of Earth customs, and the warmest heart in Jump City.",
    tags: ["Flight", "Starbolts", "Tamaran"]
  },
  {
    name: "Cyborg",
    file: "cyborg.jpg",
    role: "Engineer",
    bio: "Half hero, half machine, all heart. Cyborg is the team's heavy hitter and systems expert.",
    tags: ["Cybernetics", "Engineering", "BOOYAH"]
  },
  {
    name: "Beast Boy",
    file: "beastboy.jpg",
    role: "Wild card",
    bio: "Green, loud, and impossible not to love. Beast Boy can transform into any animal.",
    tags: ["Shapeshifting", "Humor", "Vegan"]
  }
];

const villains = [
  {
    name: "Slade",
    file: "slade.jpg",
    role: "The strategist"
  },
  {
    name: "Trigon",
    file: "trigon.jpg",
    role: "The destroyer"
  },
  {
    name: "Blackfire",
    file: "blackfire.jpg",
    role: "The rival"
  }
];

const episodes = [
  "Divide and Conquer",
  "Nevermore",
  "The Beast Within",
  "The End: Part 1",
  "Mad Mod",
  "Trouble in Tokyo"
];

const profileGrid = document.querySelector("#profileGrid");

if (profileGrid) {
  profileGrid.innerHTML = characters.map((character, index) => `
    <article class="profile-card" data-index="${index}">
      <div class="profile-thumb">
        <img src="images/${character.file}" alt="${character.name}">
      </div>
      <h3>${character.name}</h3>
      <small>${character.role}</small>
    </article>
  `).join("");
}

const villainList = document.querySelector("#villainList");

if (villainList) {
  villainList.innerHTML = villains.map(villain => `
    <a class="villain-row" href="#villains">
      <img src="images/${villain.file}" alt="${villain.name}">
      <span>
        <strong>${villain.name}</strong>
        <small>${villain.role}</small>
      </span>
    </a>
  `).join("");
}

const episodePills = document.querySelector("#episodePills");

if (episodePills) {
  episodePills.innerHTML = episodes.map((episode, index) => `
    <a class="episode-pill" href="#episodes">
      ${String(index + 1).padStart(2, "0")} · ${episode}
    </a>
  `).join("");
}

const modal = document.querySelector("#profileModal");
const modalImage = document.querySelector("#modalImage");
const modalRole = document.querySelector("#modalRole");
const modalName = document.querySelector("#modalName");
const modalBio = document.querySelector("#modalBio");
const modalTags = document.querySelector("#modalTags");

function openProfile(index) {
  const character = characters[index];

  if (!character || !modal) {
    return;
  }

  if (modalImage) {
    modalImage.style.backgroundImage = `url("images/${character.file}")`;
    modalImage.style.backgroundSize = "cover";
    modalImage.style.backgroundPosition = "center";
  }

  if (modalRole) {
    modalRole.textContent = `Character · ${character.role}`;
  }

  if (modalName) {
    modalName.textContent = character.name;
  }

  if (modalBio) {
    modalBio.textContent = character.bio;
  }

  if (modalTags) {
    modalTags.innerHTML = character.tags
      .map(tag => `<span>${tag}</span>`)
      .join("");
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeProfile() {
  if (!modal) {
    return;
  }

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".profile-card").forEach(card => {
  card.addEventListener("click", () => {
    const index = Number(card.dataset.index);
    openProfile(index);
  });
});

const modalClose = document.querySelector(".modal-close");

if (modalClose) {
  modalClose.addEventListener("click", closeProfile);
}

if (modal) {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeProfile();
    }
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeProfile();
  }
});

const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

document.querySelectorAll(".account button").forEach(button => {
  button.addEventListener("click", () => {
    const text = button.textContent.trim();

    if (text === "♡ Save") {
      showToast("Sign in to save this page.");
    } else {
      showToast("Sign-in is coming soon for this fan project.");
    }
  });
});

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");

function doSearch() {
  if (!searchInput) {
    return;
  }

  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    showToast("Type a character, episode, or topic to search.");
    return;
  }

  const characterMatch = characters.find(character =>
    character.name.toLowerCase().includes(query)
  );

  if (characterMatch) {
    openProfile(characters.indexOf(characterMatch));
    return;
  }

  const villainMatch = villains.find(villain =>
    villain.name.toLowerCase().includes(query)
  );

  if (villainMatch) {
    document.querySelector("#villains")?.scrollIntoView({
      behavior: "smooth"
    });

    showToast(`Showing results for ${villainMatch.name}.`);
    return;
  }

  const episodeMatch = episodes.find(episode =>
    episode.toLowerCase().includes(query)
  );

  if (episodeMatch) {
    document.querySelector("#episodes")?.scrollIntoView({
      behavior: "smooth"
    });

    showToast(`Showing episode: ${episodeMatch}`);
    return;
  }

  showToast(`No result for "${searchInput.value}".`);
}

if (searchButton) {
  searchButton.addEventListener("click", doSearch);
}

if (searchInput) {
  searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      doSearch();
    }
  });
}

const hamburger = document.querySelector(".hamburger");
const utility = document.querySelector(".utility");

if (hamburger && utility) {
  hamburger.addEventListener("click", () => {
    utility.classList.toggle("mobile-open");
  });
}

const gallery = document.querySelector("#gallery");

if (gallery) {
  gallery.style.display = "block";
  gallery.style.visibility = "visible";
  gallery.style.opacity = "1";

  const gallerySection = gallery.closest(".wiki-section");

  if (gallerySection) {
    gallerySection.style.display = "block";
    gallerySection.style.visibility = "visible";
    gallerySection.style.opacity = "1";
  }

  const galleryPhotos = [
    ["titans-team.jpg", "Teen Titans team"],
    ["titans-tower.jpg", "Titans Tower"],
    ["jump-city.jpg", "Jump City"],
    ["raven.jpg", "Raven"],
    ["starfire.jpg", "Starfire"],
    ["robin.jpg", "Robin"]
  ];

  const oldGrid = gallery.querySelector(".gallery-grid");

  if (oldGrid) {
    oldGrid.remove();
  }

  const grid = document.createElement("div");

  grid.className = "gallery-grid";
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(3, 1fr)";
  grid.style.gap = "20px";
  grid.style.width = "100%";
  grid.style.marginTop = "20px";
  grid.style.alignItems = "stretch";

  galleryPhotos.forEach(photo => {
    const image = document.createElement("img");

    image.src = `images/${photo[0]}`;
    image.alt = photo[1];
    image.loading = "lazy";
    image.style.width = "100%";
    image.style.height = "260px";
    image.style.objectFit = "cover";
    image.style.display = "block";

    grid.appendChild(image);
  });

  gallery.appendChild(grid);
}

document.body.style.backgroundImage = "url('images/jump-city.jpg')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center center";
document.body.style.backgroundAttachment = "fixed";
document.body.style.backgroundRepeat = "no-repeat";

const mastheadInner = document.querySelector(".masthead-inner");

if (mastheadInner) {
  mastheadInner.style.backgroundImage = "url('images/titans-team.jpg')";
  mastheadInner.style.backgroundSize = "cover";
  mastheadInner.style.backgroundPosition = "center";
  mastheadInner.style.backgroundRepeat = "no-repeat";
}

const languageText = {
  en: {
    home: "Main Page",
    browse: "Browse",
    episodes: "Episodes",
    characters: "Characters",
    villains: "Villains",
    media: "Media",
    welcome: "Titans Tower command center",
    browseTitle: "Browse the wiki",
    team: "Teen Titans",
    villain: "Villains",
    episode: "Episodes",
    mediaTitle: "Media",
    roster: "Teen Titans",
    facts: "Quick facts",
    languages: "Languages",
    enter: "Enter the tower →",
    join: "Join the team"
  },
  es: {
    home: "Página principal",
    browse: "Explorar",
    episodes: "Episodios",
    characters: "Personajes",
    villains: "Villanos",
    media: "Medios",
    welcome: "Centro de mando de la Torre Titans",
    browseTitle: "Explora la wiki",
    team: "Jóvenes Titanes",
    villain: "Villanos",
    episode: "Episodios",
    mediaTitle: "Medios",
    roster: "Jóvenes Titanes",
    facts: "Datos rápidos",
    languages: "Idiomas",
    enter: "Entrar a la torre →",
    join: "Únete al equipo"
  },
  pt: {
    home: "Página inicial",
    browse: "Explorar",
    episodes: "Episódios",
    characters: "Personagens",
    villains: "Vilões",
    media: "Mídia",
    welcome: "Centro de comando da Torre Titans",
    browseTitle: "Explore a wiki",
    team: "Jovens Titãs",
    villain: "Vilões",
    episode: "Episódios",
    mediaTitle: "Mídia",
    roster: "Jovens Titãs",
    facts: "Informações rápidas",
    languages: "Idiomas",
    enter: "Entrar na torre →",
    join: "Junte-se à equipe"
  },
  pl: {
    home: "Strona główna",
    browse: "Przeglądaj",
    episodes: "Odcinki",
    characters: "Bohaterowie",
    villains: "Wrogowie",
    media: "Media",
    welcome: "Centrum dowodzenia Wieży Titans",
    browseTitle: "Przeglądaj wiki",
    team: "Młodzi Tytani",
    villain: "Wrogowie",
    episode: "Odcinki",
    mediaTitle: "Media",
    roster: "Młodzi Tytani",
    facts: "Szybkie fakty",
    languages: "Języki",
    enter: "Wejdź do wieży →",
    join: "Dołącz do drużyny"
  },
  ru: {
    home: "Главная",
    browse: "Обзор",
    episodes: "Эпизоды",
    characters: "Персонажи",
    villains: "Злодеи",
    media: "Медиа",
    welcome: "Командный центр Башни Титанов",
    browseTitle: "Обзор вики",
    team: "Юные Титаны",
    villain: "Злодеи",
    episode: "Эпизоды",
    mediaTitle: "Медиа",
    roster: "Юные Титаны",
    facts: "Факты",
    languages: "Языки",
    enter: "Войти в башню →",
    join: "В команду"
  }
};

function applyLanguage(code, showMessage = false) {
  const text = languageText[code] || languageText.en;

  const tabs = document.querySelectorAll(".page-tabs a");

  const tabText = [
    text.home,
    text.browse,
    text.episodes,
    text.characters,
    text.villains,
    text.media,
    "Help out"
  ];

  tabs.forEach((tab, index) => {
    if (tabText[index]) {
      tab.textContent = tabText[index];
    }
  });

  const directoryTitles = document.querySelectorAll(
    ".directory-card strong"
  );

  const directoryText = [
    text.team,
    text.villain,
    text.episode,
    text.mediaTitle
  ];

  directoryTitles.forEach((element, index) => {
    if (directoryText[index]) {
      element.textContent = directoryText[index];
    }
  });

  const headings = document.querySelectorAll(
    ".wiki-section .section-title h2"
  );

  if (headings[0]) {
    headings[0].textContent = text.browseTitle;
  }

  if (headings[1]) {
    headings[1].textContent = text.roster;
  }

  if (headings[2]) {
    headings[2].textContent = text.villain;
  }

  const factsHeading = document.querySelector(".quick-facts h3");

  if (factsHeading) {
    factsHeading.textContent = text.facts;
  }

  const languagesHeading = document.querySelector(".languages h3");

  if (languagesHeading) {
    languagesHeading.textContent = text.languages;
  }

  const welcomeLabel = document.querySelector(
    ".welcome-copy .section-label"
  );

  if (welcomeLabel) {
    welcomeLabel.textContent = text.welcome;
  }

  const buttons = document.querySelectorAll(
    ".welcome-actions a"
  );

  if (buttons[0]) {
    buttons[0].textContent = text.enter;
  }

  if (buttons[1]) {
    buttons[1].textContent = text.join;
  }

  document.documentElement.lang = code;

  localStorage.setItem("titans-language", code);

  if (showMessage) {
    showToast(
      code === "en"
        ? "Language: English"
        : `Language changed: ${code.toUpperCase()}`
    );
  }
}

const languageBox = document.querySelector(".languages");

if (languageBox) {
  languageBox
    .querySelectorAll("a")
    .forEach(link => link.remove());

  const select = document.createElement("select");

  select.className = "language-select";

  select.setAttribute(
    "aria-label",
    "Select language"
  );

  select.innerHTML = `
    <option value="en">English</option>
    <option value="es">Español</option>
    <option value="pt">Português</option>
    <option value="pl">Polski</option>
    <option value="ru">Русский</option>
  `;

  languageBox.appendChild(select);

  select.addEventListener("change", () => {
    applyLanguage(select.value, true);
  });

  const savedLanguage =
    localStorage.getItem("titans-language") || "en";

  select.value = savedLanguage;

  applyLanguage(savedLanguage, false);
}

const welcomeArt = document.querySelector(".welcome-art");

if (welcomeArt) {
  welcomeArt.style.backgroundImage =
    "url('images/titans-tower.jpg')";
  welcomeArt.style.backgroundSize = "cover";
  welcomeArt.style.backgroundPosition = "center";
  welcomeArt.style.backgroundRepeat = "no-repeat";
}
