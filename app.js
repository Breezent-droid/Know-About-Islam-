/* ============================================
   ISLAMIC COMPANION
   Version 1.0
============================================ */


/* ---------- NAVIGATION ---------- */

const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".nav-item");

function showPage(id) {

  pages.forEach(page => {
    page.classList.remove("active-page");
  });

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active-page");
  }

  navItems.forEach(item => {
    item.classList.toggle(
      "active",
      item.dataset.section === id
    );
  });

  document.getElementById("sidebar")
    ?.classList.remove("open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


navItems.forEach(item => {

  item.addEventListener("click", () => {

    showPage(item.dataset.section);

  });

});

document.querySelectorAll("[data-go]").forEach(button => {

  button.addEventListener("click", () => {

    showPage(button.dataset.go);

  });

});


/* ---------- MOBILE MENU ---------- */

document.getElementById("menuBtn")
  ?.addEventListener("click", () => {

    document
      .getElementById("sidebar")
      .classList.toggle("open");

  });


/* ---------- DARK MODE ---------- */

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "🌙";
}

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  const dark =
    document.body.classList.contains("dark");

  localStorage.setItem(
    "theme",
    dark ? "dark" : "light"
  );

  themeBtn.textContent = dark ? "🌙" : "☀️";

});


/* ---------- ADHKAR DATA ---------- */

const adhkarData = {

  morning: [

    {
      title: "Morning remembrance",
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
      meaning: "We have entered the morning and the dominion belongs to Allah.",
      source: "Reported in Abu Dawud."
    },

    {
      title: "Seeking forgiveness",
      arabic: "أَسْتَغْفِرُ اللَّهَ",
      meaning: "I seek forgiveness from Allah.",
      source: "A simple form of seeking forgiveness."
    },

    {
      title: "Tasbih",
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      meaning: "Glory be to Allah and praise belongs to Him.",
      source: "See authentic hadith collections for the established morning/evening practice."
    }

  ],

  evening: [

    {
      title: "Evening remembrance",
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
      meaning: "We have entered the evening and the dominion belongs to Allah.",
      source: "Reported in Abu Dawud."
    },

    {
      title: "Seeking forgiveness",
      arabic: "أَسْتَغْفِرُ اللَّهَ",
      meaning: "I seek forgiveness from Allah.",
      source: "A simple form of seeking forgiveness."
    },

    {
      title: "Tasbih",
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      meaning: "Glory be to Allah and praise belongs to Him.",
      source: "See authentic hadith collections for the established evening practice."
    }

  ],

  sleep: [

    {
      title: "Before sleeping",
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      meaning: "In Your name, O Allah, I die and I live.",
      source: "Sahih al-Bukhari."
    },

    {
      title: "Seeking Allah's protection",
      arabic: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ",
      meaning: "O Allah, I submit myself to You.",
      source: "Sahih al-Bukhari and Sahih Muslim."
    },

    {
      title: "Remember Allah",
      arabic: "سُبْحَانَ اللَّهِ",
      meaning: "Glory be to Allah.",
      source: "Remember Allah before sleeping."
    }

  ]

};


let currentAdhkarCategory = "morning";

let completedAdhkar =
  JSON.parse(localStorage.getItem("completedAdhkar")) || [];


function renderAdhkar() {

  const container =
    document.getElementById("adhkarList");

  const data =
    adhkarData[currentAdhkarCategory];

  container.innerHTML = "";

  data.forEach((item, index) => {

    const key =
      `${currentAdhkarCategory}-${index}`;

    const completed =
      completedAdhkar.includes(key);

    const card =
      document.createElement("article");

    card.className =
      `adhkar-card ${completed ? "completed" : ""}`;

    card.innerHTML = `

      <h3>${item.title}</h3>

      <div class="adhkar-arabic">
        ${item.arabic}
      </div>

      <p class="translation">
        ${item.meaning}
      </p>

      <small>${item.source}</small>

      <br><br>

      <button
        class="complete-btn"
        data-adhkar="${key}">
        ${completed ? "✓ Completed" : "Mark Complete"}
      </button>

    `;

    container.appendChild(card);

  });


  document
    .getElementById("adhkarCount")
    .textContent = completedAdhkar.filter(
      item => item.startsWith(currentAdhkarCategory)
    ).length;

  updateHomeStats();

}


document.querySelectorAll(".category").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".category")
      .forEach(btn =>
        btn.classList.remove("active")
      );

    button.classList.add("active");

    currentAdhkarCategory =
      button.dataset.category;

    renderAdhkar();

  });

});


document
  .getElementById("adhkarList")
  .addEventListener("click", event => {

    const button =
      event.target.closest("[data-adhkar]");

    if (!button) return;

    const key =
      button.dataset.adhkar;

    if (completedAdhkar.includes(key)) {

      completedAdhkar =
        completedAdhkar.filter(
          item => item !== key
        );

    } else {

      completedAdhkar.push(key);

    }

    localStorage.setItem(
      "completedAdhkar",
      JSON.stringify(completedAdhkar)
    );

    renderAdhkar();

  });


/* ---------- HADITH ---------- */

const hadithData = [

  {
    title: "Actions are judged by intentions",
    text: "The Messenger of Allah ﷺ taught that actions are judged according to intentions.",
    source: "Sahih al-Bukhari 1; Sahih Muslim 1907",
    topic: "Intentions"
  },

  {
    title: "Seeking knowledge",
    text: "Seeking beneficial knowledge is among the great paths of learning and worship.",
    source: "Use the verified hadith reference in the production database.",
    topic: "Knowledge"
  },

  {
    title: "Mercy",
    text: "The Prophet ﷺ taught the importance of mercy and compassion.",
    source: "Use the verified hadith reference in the production database.",
    topic: "Character"
  }

];


function renderHadith(search = "") {

  const container =
    document.getElementById("hadithList");

  const filtered =
    hadithData.filter(hadith =>

      `${hadith.title}
       ${hadith.text}
       ${hadith.topic}`
      .toLowerCase()
      .includes(search.toLowerCase())

    );

  container.innerHTML = "";

  filtered.forEach(hadith => {

    const card =
      document.createElement("article");

    card.className = "hadith-card";

    card.innerHTML = `

      <span class="card-label">
        ${hadith.topic}
      </span>

      <h3>${hadith.title}</h3>

      <p class="translation">
        ${hadith.text}
      </p>

      <div class="hadith-source">
        📚 ${hadith.source}
      </div>

    `;

    container.appendChild(card);

  });

}


document
  .getElementById("hadithSearch")
  .addEventListener("input", event => {

    renderHadith(event.target.value);

  });


document
  .getElementById("randomHadith")
  .addEventListener("click", () => {

    const random =
      hadithData[
        Math.floor(
          Math.random() * hadithData.length
        )
      ];

    renderHadith(random.title);

  });


/* ---------- FIQH ---------- */

const fiqhData = [

  {
    topic: "Wudu",
    description:
      "A study topic covering purification and the positions of the four Sunni schools.",
    references:
      "Quran 5:6; relevant hadith from the Sunnah.",
    positions: {

      hanafi:
        "Hanafi position should be presented here from a verified fiqh source.",

      maliki:
        "Maliki position should be presented here from a verified fiqh source.",

      shafii:
        "Shafi'i position should be presented here from a verified fiqh source.",

      hanbali:
        "Hanbali position should be presented here from a verified fiqh source."

    }
  },


  {
    topic: "Salah",
    description:
      "Learn the foundations, conditions, pillars and Sunnah practices of prayer.",
    references:
      "Quran 2:43; verified hadith references should accompany detailed rulings.",
    positions: {

      hanafi:
        "Hanafi prayer details should be supplied from an authoritative Hanafi source.",

      maliki:
        "Maliki prayer details should be supplied from an authoritative Maliki source.",

      shafii:
        "Shafi'i prayer details should be supplied from an authoritative Shafi'i source.",

      hanbali:
        "Hanbali prayer details should be supplied from an authoritative Hanbali source."

    }
  },


  {
    topic: "Fasting",
    description:
      "Learn the principles of fasting, its obligations and recommended practices.",
    references:
      "Quran 2:183–187; verified hadith references.",
    positions: {

      hanafi:
        "Hanafi fasting rulings should be supplied from a verified Hanafi source.",

      maliki:
        "Maliki fasting rulings should be supplied from a verified Maliki source.",

      shafii:
        "Shafi'i fasting rulings should be supplied from a verified Shafi'i source.",

      hanbali:
        "Hanbali fasting rulings should be supplied from a verified Hanbali source."

    }
  }

];


let selectedMadhhab = "all";


function renderFiqh() {

  const container =
    document.getElementById("fiqhList");

  container.innerHTML = "";

  fiqhData.forEach(topic => {

    const card =
      document.createElement("article");

    card.className = "fiqh-card";

    let positions = "";

    if (selectedMadhhab === "all") {

      Object.entries(topic.positions)
        .forEach(([school, text]) => {

          positions += `

            <div class="position">

              <strong>
                ${school.toUpperCase()}
              </strong>

              <p class="translation">
                ${text}
              </p>

            </div>

          `;

        });

    } else {

      positions = `

        <div class="position">

          <strong>
            ${selectedMadhhab.toUpperCase()}
          </strong>

          <p class="translation">
            ${topic.positions[selectedMadhhab]}
          </p>

        </div>

      `;

    }


    card.innerHTML = `

      <h3>${topic.topic}</h3>

      <p class="translation">
        ${topic.description}
      </p>

      <div class="info-note">
        📖 ${topic.references}
      </div>

      ${positions}

    `;

    container.appendChild(card);

  });

}


document.querySelectorAll(".madhhab")
  .forEach(button => {

    button.addEventListener("click", () => {

      document.querySelectorAll(".madhhab")
        .forEach(btn =>
          btn.classList.remove("active")
        );

      button.classList.add("active");

      selectedMadhhab =
        button.dataset.madhhab;

      renderFiqh();

    });

  });


/* ---------- ISLAMIC PRINCIPLES ---------- */

const principles = [

  {
    icon: "☝️",
    title: "Tawhid",
    description:
      "Understanding the oneness of Allah and the central place of worshipping Him alone.",
    reference:
      "Quran 112:1–4"
  },

  {
    icon: "🕌",
    title: "Salah",
    description:
      "Learning the importance of establishing the prayer and maintaining a connection with Allah.",
    reference:
      "Quran 2:43"
  },

  {
    icon: "🤲",
    title: "Tawakkul",
    description:
      "Learning reliance upon Allah while taking the appropriate means.",
    reference:
      "Quran 65:3"
  },

  {
    icon: "❤️",
    title: "Good Character",
    description:
      "Developing honesty, mercy, patience, humility and good treatment of others.",
    reference:
      "Quran 68:4"
  },

  {
    icon: "🌱",
    title: "Repentance",
    description:
      "Returning sincerely to Allah and seeking His forgiveness.",
    reference:
      "Quran 39:53"
  },

  {
    icon: "📚",
    title: "Seeking Knowledge",
    description:
      "Learning Islam carefully from the Quran, Sunnah and qualified scholarship.",
    reference:
      "Quran 20:114"
  }

];


function renderPrinciples() {

  const container =
    document.getElementById("principlesList");

  principles.forEach(item => {

    const card =
      document.createElement("article");

    card.className = "lesson-card";

    card.innerHTML = `

      <div style="font-size:30px">
        ${item.icon}
      </div>

      <h3>${item.title}</h3>

      <p>${item.description}</p>

      <small>
        📖 ${item.reference}
      </small>

      <br>

      <button class="text-btn">
        Start lesson →
      </button>

    `;

    container.appendChild(card);

  });

}


/* ---------- TASBIH ---------- */

let tasbih =
  Number(localStorage.getItem("tasbih")) || 0;

const tasbihNumber =
  document.getElementById("tasbihNumber");


function updateTasbih() {

  tasbihNumber.textContent = tasbih;

  localStorage.setItem(
    "tasbih",
    tasbih
  );

}


document
  .getElementById("tasbihButton")
  .addEventListener("click", () => {

    tasbih++;

    updateTasbih();

    if (navigator.vibrate) {
      navigator.vibrate(25);
    }

  });


document
  .getElementById("resetTasbih")
  .addEventListener("click", () => {

    tasbih = 0;

    updateTasbih();

  });


/* ---------- BOOKMARKS ---------- */

let bookmarks =
  JSON.parse(
    localStorage.getItem("bookmarks")
  ) || [];


function saveBookmark(title, text) {

  bookmarks.push({
    title,
    text
  });

  localStorage.setItem(
    "bookmarks",
    JSON.stringify(bookmarks)
  );

  renderBookmarks();

}


function renderBookmarks() {

  const container =
    document.getElementById("bookmarkList");

  if (!bookmarks.length) {

    container.innerHTML = `

      <div class="empty-state">

        <span>🔖</span>

        <h3>No bookmarks yet</h3>

        <p>
          Save Quran verses and lessons you want
          to revisit.
        </p>

      </div>

    `;

    return;

  }


  container.innerHTML = "";

  bookmarks.forEach((item, index) => {

    const card =
      document.createElement("article");

    card.className = "ayah-card";

    card.innerHTML = `

      <div class="ayah-top">

        <strong>${item.title}</strong>

        <button
          class="bookmark-small"
          data-remove="${index}">
          ✕
        </button>

      </div>

      <p class="translation">
        ${item.text}
      </p>

    `;

    container.appendChild(card);

  });

}


document
  .getElementById("bookmarkList")
  .addEventListener("click", event => {

    const button =
      event.target.closest("[data-remove]");

    if (!button) return;

    const index =
      Number(button.dataset.remove);

    bookmarks.splice(index, 1);

    localStorage.setItem(o
      "bookmarks",
      JSON.stringify(bookmarks)
    );

    renderBookmarks();

  });


document
  .getElementById("bookmarkAyah")
  .addEventListener("click", () => {

    saveBookmark(
      "Ash-Sharh 94:6",
      "Indeed, with hardship comes ease."
    );

  });


/* ---------- QURAN READER - updated---------- */

const QURAN_API =
  "https://api.alquran.cloud/v1";


const quranSearch =
  document.getElementById("quranSearch");

const searchQuranBtn =
  document.getElementById("searchQuranBtn");

const quranResults =
  document.getElementById("quranResults");

const surahSelect =
  document.getElementById("surahSelect");

const quranStatus =
  document.getElementById("quranStatus");

const quranSurahInfo =
  document.getElementById("quranSurahInfo");

const quranSurahNumber =
  document.getElementById("quranSurahNumber");

const quranSurahName =
  document.getElementById("quranSurahName");

const quranSurahDetails =
  document.getElementById("quranSurahDetails");

const playSurahBtn =
  document.getElementById("playSurahBtn");

const quranAudio =
  document.getElementById("quranAudio");


let currentQuranSurah = null;


/* ---------- LOAD 114 SURAHS ---------- */

async function loadQuranSurahs() {

  try {

    quranStatus.textContent =
      "📖 Loading the 114 Surahs...";


    const response =
      await fetch(
        `${QURAN_API}/surah`
      );


    if (!response.ok) {

      throw new Error(
        "Could not load Surahs."
      );

    }


    const result =
      await response.json();


    surahSelect.innerHTML = `
      <option value="">
        Select a Surah...
      </option>
    `;


    result.data.forEach(
      surah => {

        const option =
          document.createElement(
            "option"
          );


        option.value =
          surah.number;


        option.textContent =
          `${surah.number}. ${surah.englishName} — ${surah.name}`;


        surahSelect.appendChild(
          option
        );

      }
    );


    quranStatus.textContent =
      "📖 Select a Surah to begin reading.";

  } catch (error) {

    console.error(
      "Quran Surah error:",
      error
    );


    quranStatus.textContent =
      "⚠️ Qur'an could not be loaded. Please check your internet connection.";

  }

}


/* ---------- LOAD COMPLETE SURAH ---------- */

async function loadQuranSurah(
  surahNumber
) {

  if (!surahNumber) return;


  try {

    quranStatus.textContent =
      "📖 Loading Surah...";


    quranResults.innerHTML =
      "";


    quranSurahInfo.classList.add(
      "hidden"
    );


    quranAudio.classList.add(
      "hidden"
    );


    const response =
      await fetch(
        `${QURAN_API}/surah/${surahNumber}/editions/quran-uthmani,en.sahih`
      );


    if (!response.ok) {

      throw new Error(
        "Could not load Surah."
      );

    }


    const result =
      await response.json();


    const arabic =
      result.data[0];

    const translation =
      result.data[1];


    currentQuranSurah =
      arabic;


    quranSurahInfo.classList.remove(
      "hidden"
    );


    quranSurahNumber.textContent =
      `Surah ${arabic.number}`;


    quranSurahName.textContent =
      `${arabic.englishName} — ${arabic.name}`;


    quranSurahDetails.textContent =
      `${arabic.englishNameTranslation} • ${arabic.revelationType} • ${arabic.numberOfAyahs} Ayahs`;


    arabic.ayahs.forEach(
      (ayah, index) => {

        const translated =
          translation.ayahs[index];


        const card =
          document.createElement(
            "article"
          );


        card.className =
          "ayah-card";


        const reference =
          `${arabic.number}:${ayah.numberInSurah}`;


        card.innerHTML = `

          <div class="ayah-top">

            <span class="ayah-number">
              ${reference}
            </span>

            <button
              class="bookmark-small"
              type="button"
              data-quran-bookmark="${reference}">

              🔖

            </button>

          </div>


          <div class="arabic">

            ${ayah.text}

          </div>


          <p class="translation">

            ${translated.text}

          </p>


          <small>

            ${arabic.englishName}
            ${reference}

          </small>

        `;


        quranResults.appendChild(
          card
        );

      }
    );


    quranStatus.textContent =
      `📖 ${arabic.englishName} loaded successfully.`;

  } catch (error) {

    console.error(
      "Quran loading error:",
      error
    );


    quranStatus.textContent =
      "⚠️ Unable to load this Surah. Please try again.";

  }

}


/* ---------- SEARCH COMPLETE QURAN ---------- */

async function searchQuran() {

  const query =
    quranSearch.value
      .trim();


  if (!query) {

    quranStatus.textContent =
      "🔎 Enter a word or phrase to search.";

    return;

  }


  try {

    quranStatus.textContent =
      "🔎 Searching the Qur'an...";


    quranResults.innerHTML =
      "";


    const response =
      await fetch(
        `${QURAN_API}/search/${encodeURIComponent(query)}/all/en.sahih`
      );


    if (!response.ok) {

      throw new Error(
        "Search failed."
      );

    }


    const result =
      await response.json();


    const matches =
      result.data?.matches || [];


    if (!matches.length) {

      quranStatus.textContent =
        "🔎 No matching verses found.";

      return;

    }


    quranStatus.textContent =
      `🔎 Found ${matches.length} matching verses.`;


    matches.forEach(
      match => {

        const card =
          document.createElement(
            "article"
          );


        card.className =
          "ayah-card";


        const reference =
          `${match.surah.number}:${match.numberInSurah}`;


        card.innerHTML = `

          <div class="ayah-top">

            <span class="ayah-number">

              ${reference}

            </span>

            <button
              class="bookmark-small"
              type="button"
              data-quran-bookmark="${reference}">

              🔖

            </button>

          </div>


          <h3>

            ${match.surah.englishName}

          </h3>


          <p class="translation">

            ${match.text}

          </p>


          <small>

            Surah ${match.surah.number}
            : Ayah ${match.numberInSurah}

          </small>

        `;


        quranResults.appendChild(
          card
        );

      }
    );


  } catch (error) {

    console.error(
      "Quran search error:",
      error
    );


    quranStatus.textContent =
      "⚠️ Quran search is temporarily unavailable.";

  }

}


/* ---------- PLAY SURAH ---------- */

function playSelectedQuranSurah() {

  if (!currentQuranSurah) {

    return;

  }


  quranAudio.src =
    `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${currentQuranSurah.number}.mp3`;


  quranAudio.classList.remove(
    "hidden"
  );


  quranAudio.play()
    .catch(
      error => {

        console.log(
          "Audio playback:",
          error
        );

      }
    );

}


/* ---------- SURAH SELECT ---------- */

surahSelect.addEventListener(
  "change",
  event => {

    loadQuranSurah(
      event.target.value
    );

  }
);


/* ---------- QURAN SEARCH BUTTON ---------- */

searchQuranBtn.addEventListener(
  "click",
  searchQuran
);


/* ---------- ENTER TO SEARCH ---------- */

quranSearch.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      searchQuran();

    }

  }
);


/* ---------- AUDIO BUTTON ---------- */

playSurahBtn.addEventListener(
  "click",
  playSelectedQuranSurah
);


/* ---------- QURAN BOOKMARKS ---------- */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-quran-bookmark]"
      );


    if (!button) return;


    const reference =
      button.dataset.quranBookmark;


    const ayahCard =
      button.closest(
        ".ayah-card"
      );


    const translation =
      ayahCard
        ?.querySelector(
          ".translation"
        )
        ?.textContent
        ?.trim() ||
      `Quran verse ${reference}`;


    saveBookmark(
      `Quran ${reference}`,
      translation
    );


    button.textContent =
      "🔖✓";

  }
);


/* ---------- START QURAN ---------- */

loadQuranSurahs();

/* ---------- HOME STATISTICS ---------- */

function updateHomeStats() {

  const count =
    completedAdhkar.length;

  const percentage =
    Math.round(
      (count / 9) * 100
    );

  document
    .getElementById("adhkarProgress")
    .textContent =
      `${Math.min(percentage, 100)}%`;

}


function updateStreak() {

  const today =
    new Date().toDateString();

  const lastVisit =
    localStorage.getItem("lastVisit");

  let streak =
    Number(
      localStorage.getItem("streak")
    ) || 1;


  if (lastVisit !== today) {

    const yesterday =
      new Date();

    yesterday.setDate(
      yesterday.getDate() - 1
    );


    if (
      lastVisit !==
      yesterday.toDateString()
    ) {

      streak = 1;

    } else {

      streak++;

    }


    localStorage.setItem(
      "lastVisit",
      today
    );

    localStorage.setItem(
      "streak",
      streak
    );

  }


  document
    .getElementById("streak")
    .textContent = streak;

}


/* ---------- SERVICE WORKER ---------- */

if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker
      .register("sw.js")
      .catch(error => {
        console.log(
          "Service Worker registration failed:",
          error
        );
      });

  });

}


/* ---------- INITIALIZE ---------- */

renderAdhkar();
renderHadith();
renderFiqh();
renderPrinciples();
renderBookmarks();
updateTasbih();
updateHomeStats();
updateStreak();

/* ============================================
   ISLAMIC QUIZ ENGINE
============================================ */

const quizData = {

  quran: [

    {
      question: "How many Surahs are in the Qur'an?",
      options: ["110", "112", "114", "116"],
      answer: 2,
      explanation:
        "The Qur'an contains 114 Surahs."
    },

    {
      question: "Which Surah is the first Surah of the Qur'an?",
      options: [
        "Al-Baqarah",
        "Al-Fatihah",
        "Al-Ikhlas",
        "An-Nas"
      ],
      answer: 1,
      explanation:
        "Al-Fatihah is the first Surah of the Qur'an."
    },

    {
      question: "Which Surah is the longest in the Qur'an?",
      options: [
        "Al-Imran",
        "Al-Baqarah",
        "An-Nisa",
        "Al-Maidah"
      ],
      answer: 1,
      explanation:
        "Surah Al-Baqarah is the longest Surah."
    },

    {
      question: "Which Surah contains Ayat al-Kursi?",
      options: [
        "Al-Baqarah",
        "Yasin",
        "Al-Kahf",
        "Ar-Rahman"
      ],
      answer: 0,
      explanation:
        "Ayat al-Kursi is Qur'an 2:255."
    },

    {
      question: "Which Surah is commonly known as Umm al-Kitab?",
      options: [
        "Al-Fatihah",
        "Al-Baqarah",
        "Al-Ikhlas",
        "Al-Falaq"
      ],
      answer: 0,
      explanation:
        "Al-Fatihah is known as Umm al-Kitab."
    }

  ],


  hadith: [

    {
      question:
        "Which collection begins with the famous hadith about intentions?",
      options: [
        "Sahih al-Bukhari",
        "Sunan Abu Dawud",
        "Jami' at-Tirmidhi",
        "Sunan an-Nasa'i"
      ],
      answer: 0,
      explanation:
        "Sahih al-Bukhari begins with the hadith concerning intentions."
    },

    {
      question:
        "Who narrated the famous hadith about actions being judged by intentions?",
      options: [
        "Abu Hurairah",
        "Umar ibn al-Khattab",
        "Ibn Abbas",
        "Aisha"
      ],
      answer: 1,
      explanation:
        "The hadith is narrated from Umar ibn al-Khattab رضي الله عنه."
    },

    {
      question:
        "Which major collection is known as Sahih Muslim?",
      options: [
        "A collection of tafsir",
        "A major hadith collection",
        "A fiqh manual",
        "A history book"
      ],
      answer: 1,
      explanation:
        "Sahih Muslim is one of the major Sunni hadith collections."
    }

  ],


  seerah: [

    {
      question:
        "In which city was Prophet Muhammad ﷺ born?",
      options: [
        "Madinah",
        "Makkah",
        "Ta'if",
        "Jerusalem"
      ],
      answer: 1,
      explanation:
        "The Prophet Muhammad ﷺ was born in Makkah."
    },

    {
      question:
        "What was the name of the Prophet's ﷺ father?",
      options: [
        "Abu Talib",
        "Abdullah",
        "Abdul-Muttalib",
        "Hamzah"
      ],
      answer: 1,
      explanation:
        "His father's name was Abdullah ibn Abdul-Muttalib."
    },

    {
      question:
        "Who was the first wife of Prophet Muhammad ﷺ?",
      options: [
        "Aisha",
        "Hafsa",
        "Khadijah",
        "Zaynab"
      ],
      answer: 2,
      explanation:
        "Khadijah رضي الله عنها was the first wife of the Prophet ﷺ."
    },

    {
      question:
        "Where did the Prophet ﷺ migrate to during the Hijrah?",
      options: [
        "Ta'if",
        "Madinah",
        "Jerusalem",
        "Yemen"
      ],
      answer: 1,
      explanation:
        "The Prophet ﷺ migrated from Makkah to Madinah."
    }

  ],


  fiqh: [

    {
      question:
        "Which four schools are commonly known as the four Sunni madhhabs?",
      options: [
        "Hanafi, Maliki, Shafi'i, Hanbali",
        "Hanafi, Zahiri, Ibadi, Maliki",
        "Maliki, Ja'fari, Shafi'i, Hanbali",
        "Hanbali, Zahiri, Hanafi, Ja'fari"
      ],
      answer: 0,
      explanation:
        "The four Sunni madhhabs are Hanafi, Maliki, Shafi'i and Hanbali."
    },

    {
      question:
        "Which school is associated with Imam Abu Hanifah?",
      options: [
        "Maliki",
        "Hanafi",
        "Shafi'i",
        "Hanbali"
      ],
      answer: 1,
      explanation:
        "Imam Abu Hanifah is the foundational imam of the Hanafi school."
    },

    {
      question:
        "Which school is associated with Imam Malik?",
      options: [
        "Hanafi",
        "Hanbali",
        "Maliki",
        "Shafi'i"
      ],
      answer: 2,
      explanation:
        "Imam Malik is the foundational imam of the Maliki school."
    },

    {
      question:
        "Which school is associated with Imam al-Shafi'i?",
      options: [
        "Shafi'i",
        "Maliki",
        "Hanafi",
        "Hanbali"
      ],
      answer: 0,
      explanation:
        "Imam al-Shafi'i is the foundational imam of the Shafi'i school."
    }

  ],


  general: [

    {
      question:
        "How many pillars of Islam are there?",
      options: ["3", "4", "5", "6"],
      answer: 2,
      explanation:
        "There are five pillars of Islam."
    },

    {
      question:
        "How many articles of faith are commonly listed in the Hadith of Jibril?",
      options: ["4", "5", "6", "7"],
      answer: 2,
      explanation:
        "The six articles include belief in Allah, His angels, His books, His messengers, the Last Day and divine decree."
    },

    {
      question:
        "Which month do Muslims fast during?",
      options: [
        "Muharram",
        "Rajab",
        "Ramadan",
        "Dhul-Hijjah"
      ],
      answer: 2,
      explanation:
        "Fasting during Ramadan is one of the five pillars of Islam."
    },

    {
      question:
        "What is Zakah?",
      options: [
        "A pilgrimage",
        "Obligatory charity",
        "A prayer",
        "A fast"
      ],
      answer: 1,
      explanation:
        "Zakah is an obligatory form of charitable giving under its conditions."
    }

  ]

};


let currentQuiz = [];
let currentQuizCategory = "";
let currentQuestion = 0;
let quizScore = 0;
let quizAnswered = false;


/* Start Quiz */

document
  .querySelectorAll(".quiz-category")
  .forEach(button => {

    button.addEventListener("click", () => {

      startQuiz(button.dataset.quiz);

    });

  });


function startQuiz(category) {

  currentQuizCategory = category;

  currentQuiz =
    [...quizData[category]]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

  currentQuestion = 0;
  quizScore = 0;

  document
    .getElementById("quizHome")
    .classList.add("hidden");

  document
    .getElementById("quizResult")
    .classList.add("hidden");

  document
    .getElementById("quizGame")
    .classList.remove("hidden");

  loadQuizQuestion();

}


/* Load Question */

function loadQuizQuestion() {

  quizAnswered = false;

  const question =
    currentQuiz[currentQuestion];

  document
    .getElementById("quizProgress")
    .textContent =
      `Question ${currentQuestion + 1}/${currentQuiz.length}`;

  document
    .getElementById("quizScore")
    .textContent =
      `Score: ${quizScore}`;

  document
    .getElementById("quizProgressFill")
    .style.width =
      `${((currentQuestion) / currentQuiz.length) * 100}%`;

  document
    .getElementById("quizCategoryLabel")
    .textContent =
      currentQuizCategory.toUpperCase();

  document
    .getElementById("quizQuestion")
    .textContent =
      question.question;

  const options =
    document.getElementById("quizOptions");

  options.innerHTML = "";

  question.options.forEach((option, index) => {

    const button =
      document.createElement("button");

    button.className = "quiz-option";

    button.textContent =
      `${String.fromCharCode(65 + index)}. ${option}`;

    button.addEventListener(
      "click",
      () => answerQuestion(index)
    );

    options.appendChild(button);

  });

  document
    .getElementById("quizFeedback")
    .textContent = "";

  document
    .getElementById("nextQuestion")
    .classList.add("hidden");

}


/* Answer */

function answerQuestion(selected) {

  if (quizAnswered) return;

  quizAnswered = true;

  const question =
    currentQuiz[currentQuestion];

  const options =
    document.querySelectorAll(".quiz-option");

  options.forEach((button, index) => {

    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    }

    if (
      index === selected &&
      selected !== question.answer
    ) {
      button.classList.add("wrong");
    }

  });


  const feedback =
    document.getElementById("quizFeedback");


  if (selected === question.answer) {

    quizScore++;

    feedback.innerHTML =
      `✅ <strong>Correct!</strong><br>
       ${question.explanation}`;

  } else {

    feedback.innerHTML =
      `❌ <strong>Not quite.</strong><br>
       ${question.explanation}`;

  }


  document
    .getElementById("quizScore")
    .textContent =
      `Score: ${quizScore}`;


  document
    .getElementById("nextQuestion")
    .classList.remove("hidden");

}


/* Next Question */

document
  .getElementById("nextQuestion")
  .addEventListener("click", () => {

    currentQuestion++;

    if (
      currentQuestion >=
      currentQuiz.length
    ) {

      finishQuiz();

    } else {

      loadQuizQuestion();

    }

  });


/* Finish */

function finishQuiz() {

  document
    .getElementById("quizGame")
    .classList.add("hidden");

  document
    .getElementById("quizResult")
    .classList.remove("hidden");


  const total =
    currentQuiz.length;

  const percentage =
    Math.round(
      (quizScore / total) * 100
    );

  document
    .getElementById("finalScore")
    .textContent =
      `${percentage}/100`;

  document
    .getElementById("correctAnswers")
    .textContent =
      quizScore;

  document
    .getElementById("wrongAnswers")
    .textContent =
      total - quizScore;

  document
    .getElementById("percentage")
    .textContent =
      `${percentage}%`;


  let message;

  if (percentage >= 90) {

    message =
      "🏆 Excellent! Your Islamic knowledge is impressive.";

  } else if (percentage >= 70) {

    message =
      "🌟 Very good! Keep learning and improving.";

  } else if (percentage >= 50) {

    message =
      "📚 Good effort. Continue studying.";

  } else {

    message =
      "🌱 Keep learning. Every step toward knowledge matters.";

  }


  document
    .getElementById("resultMessage")
    .textContent = message;


  localStorage.setItem(
    "lastQuizScore",
    percentage
  );

}


/* Back to Categories */

document
  .getElementById("backToQuiz")
  .addEventListener("click", () => {

    document
      .getElementById("quizGame")
      .classList.add("hidden");

    document
      .getElementById("quizHome")
      .classList.remove("hidden");

  });


/* Restart */

document
  .getElementById("restartQuiz")
  .addEventListener("click", () => {

    document
      .getElementById("quizResult")
      .classList.add("hidden");

    document
      .getElementById("quizHome")
      .classList.remove("hidden");

  });
