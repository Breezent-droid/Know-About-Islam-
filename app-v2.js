/* =========================================================
   KNOW ABOUT ISLAM — V2 APPLICATION ENGINE
   ========================================================= */

"use strict";


/* =========================================================
   V2 STATE
   ========================================================= */

const KAI_V2_STORAGE = "know_about_islam_v2";

const kaiV2 = {
  lessons: 0,
  streak: 0,
  progress: 35,
  bookmarks: [],
  lastSection: "home"
};


/* =========================================================
   LOAD SAVED DATA
   ========================================================= */

function kaiLoadState() {
  try {
    const saved = localStorage.getItem(KAI_V2_STORAGE);

    if (saved) {
      const data = JSON.parse(saved);

      Object.assign(kaiV2, data);
    }
  } catch (error) {
    console.warn("KAI V2: Could not load saved data.");
  }
}


/* =========================================================
   SAVE DATA
   ========================================================= */

function kaiSaveState() {
  try {
    localStorage.setItem(
      KAI_V2_STORAGE,
      JSON.stringify(kaiV2)
    );
  } catch (error) {
    console.warn("KAI V2: Could not save data.");
  }
}


/* =========================================================
   UPDATE DASHBOARD
   ========================================================= */

function kaiUpdateDashboard() {

  const percent =
    document.getElementById("learningPercent");

  const progress =
    document.getElementById("learningProgress");

  const lessons =
    document.getElementById("lessonsCompleted");

  const streak =
    document.getElementById("learningStreak");


  if (percent) {
    percent.textContent =
      `${kaiV2.progress}%`;
  }


  if (progress) {
    progress.style.width =
      `${kaiV2.progress}%`;
  }


  if (lessons) {
    lessons.textContent =
      `${kaiV2.lessons} lessons completed`;
  }


  if (streak) {
    streak.textContent =
      `🔥 ${kaiV2.streak} day streak`;
  }
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function kaiGoTo(section) {

  const target =
    document.getElementById(section);

  if (!target) {
    console.warn(
      `KAI V2: Section "${section}" not found.`
    );

    return;
  }


  kaiV2.lastSection = section;

  kaiSaveState();


  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });


  document
    .querySelectorAll(".nav-item")
    .forEach(item => {

      item.classList.toggle(
        "active",
        item.dataset.nav === section
      );

    });
}


/* =========================================================
   BOTTOM NAVIGATION
   ========================================================= */

function kaiSetupNavigation() {

  document
    .querySelectorAll("[data-nav]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          kaiGoTo(
            button.dataset.nav
          );

        }
      );

    });


  document
    .querySelectorAll("[data-section]")
    .forEach(card => {

      card.addEventListener(
        "click",
        event => {

          event.preventDefault();

          kaiGoTo(
            card.dataset.section
          );

        }
      );

    });


  document
    .querySelectorAll("[data-action]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          kaiGoTo(
            button.dataset.action
          );

        }
      );

    });

}


/* =========================================================
   GLOBAL SEARCH
   ========================================================= */

const kaiSearchMap = {

  quran: "quran",
  qur: "quran",
  koran: "quran",

  hadith: "hadith",
  hadeeth: "hadith",

  adhkar: "adhkar",
  dhikr: "adhkar",
  zikr: "adhkar",

  fiqh: "fiqh",
  madhhab: "fiqh",
  madhab: "fiqh",

  sunnah: "sunnah",

  principle: "principles",
  principles: "principles",

  quiz: "quiz",

  tasbih: "tasbih",

  saved: "bookmarks",
  bookmark: "bookmarks",
  bookmarks: "bookmarks"

};


function kaiSearch(query) {

  const clean =
    query
      .trim()
      .toLowerCase();


  if (!clean) return;


  let destination = null;


  for (
    const keyword in kaiSearchMap
  ) {

    if (
      clean.includes(keyword)
    ) {

      destination =
        kaiSearchMap[keyword];

      break;
    }

  }


  if (destination) {

    kaiGoTo(destination);

    return;
  }


  kaiShowSearchMessage(query);
}


/* =========================================================
   SEARCH MESSAGE
   ========================================================= */

function kaiShowSearchMessage(query) {

  const existing =
    document.getElementById(
      "kaiSearchMessage"
    );


  if (existing) {
    existing.remove();
  }


  const message =
    document.createElement("div");


  message.id =
    "kaiSearchMessage";


  message.textContent =
    `Search ready for: "${query}"`;


  message.style.cssText = `
    position: fixed;
    left: 50%;
    bottom: 85px;
    transform: translateX(-50%);
    z-index: 2000;
    width: min(90%, 420px);
    padding: 14px 17px;
    border-radius: 14px;
    background: #0d1a2b;
    color: #f5f7fa;
    border: 1px solid rgba(37,197,138,.3);
    box-shadow: 0 15px 40px rgba(0,0,0,.3);
    font-size: 13px;
    text-align: center;
  `;


  document.body.appendChild(message);


  setTimeout(() => {

    message.remove();

  }, 3000);
}


/* =========================================================
   SEARCH EVENT
   ========================================================= */

function kaiSetupSearch() {

  const search =
    document.getElementById(
      "globalSearch"
    );


  if (!search) return;


  search.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        kaiSearch(
          search.value
        );

      }

    }
  );

}


/* =========================================================
   BOOKMARK SYSTEM
   ========================================================= */

function kaiAddBookmark(item) {

  if (!item) return;


  const exists =
    kaiV2.bookmarks.some(
      bookmark =>
        bookmark.id === item.id
    );


  if (exists) {
    return;
  }


  kaiV2.bookmarks.push(item);

  kaiSaveState();

  kaiNotify(
    "🔖 Saved to your bookmarks."
  );
}


function kaiRemoveBookmark(id) {

  kaiV2.bookmarks =
    kaiV2.bookmarks.filter(
      bookmark =>
        bookmark.id !== id
    );


  kaiSaveState();

  kaiNotify(
    "Bookmark removed."
  );
}


function kaiIsBookmarked(id) {

  return kaiV2.bookmarks.some(
    bookmark =>
      bookmark.id === id
  );

}


/* =========================================================
   NOTIFICATION
   ========================================================= */

function kaiNotify(message) {

  const old =
    document.getElementById(
      "kaiNotification"
    );


  if (old) {
    old.remove();
  }


  const notification =
    document.createElement("div");


  notification.id =
    "kaiNotification";


  notification.textContent =
    message;


  notification.style.cssText = `
    position: fixed;
    left: 50%;
    bottom: 90px;
    transform: translateX(-50%);
    z-index: 3000;
    width: max-content;
    max-width: 90%;
    padding: 12px 17px;
    border-radius: 999px;
    background: #25c58a;
    color: #07111f;
    font-size: 12px;
    font-weight: 800;
    box-shadow: 0 12px 35px rgba(0,0,0,.3);
  `;


  document.body.appendChild(
    notification
  );


  setTimeout(() => {

    notification.remove();

  }, 2500);
}


/* =========================================================
   THEME
   ========================================================= */

function kaiSetupTheme() {

  const button =
    document.getElementById(
      "themeToggle"
    );


  if (!button) return;


  const savedTheme =
    localStorage.getItem(
      "kai_v2_theme"
    );


  if (
    savedTheme === "light"
  ) {

    document.body.classList.add(
      "light-mode"
    );

    button.textContent = "☀️";

  }


  button.addEventListener(
    "click",
    () => {

      const light =
        document.body.classList.toggle(
          "light-mode"
        );


      button.textContent =
        light ? "☀️" : "🌙";


      localStorage.setItem(
        "kai_v2_theme",
        light ? "light" : "dark"
      );

    }
  );

}


/* =========================================================
   MENU
   ========================================================= */

function kaiSetupMenu() {

  const button =
    document.getElementById(
      "menuButton"
    );


  if (!button) return;


  button.addEventListener(
    "click",
    () => {

      const menu =
        document.getElementById(
          "kaiMenu"
        );


      if (menu) {

        menu.classList.toggle(
          "open"
        );

        return;
      }


      kaiShowMenu();

    }
  );

}


function kaiShowMenu() {

  const existing =
    document.getElementById(
      "kaiMenu"
    );


  if (existing) {
    existing.remove();
    return;
  }


  const menu =
    document.createElement("div");


  menu.id =
    "kaiMenu";


  menu.innerHTML = `

    <div class="kai-menu-inner">

      <div class="kai-menu-title">
        ☪ Know About Islam
      </div>

      <button data-menu-section="quran">
        📖 Qur'an
      </button>

      <button data-menu-section="hadith">
        📜 Hadith
      </button>

      <button data-menu-section="adhkar">
        🤲 Adhkar
      </button>

      <button data-menu-section="fiqh">
        🕌 Fiqh
      </button>

      <button data-menu-section="sunnah">
        🌙 Sunnah
      </button>

      <button data-menu-section="principles">
        🧭 Principles
      </button>

      <button data-menu-section="quiz">
        🎯 Quiz
      </button>

      <button data-menu-section="tasbih">
        📿 Tasbih
      </button>

    </div>

  `;


  menu.style.cssText = `
    position: fixed;
    top: 70px;
    right: 14px;
    z-index: 2500;
    width: min(280px, calc(100% - 28px));
    padding: 10px;
    border-radius: 18px;
    background: #0d1a2b;
    border: 1px solid rgba(255,255,255,.1);
    box-shadow: 0 20px 50px rgba(0,0,0,.4);
  `;


  document.body.appendChild(
    menu
  );


  menu
    .querySelectorAll(
      "[data-menu-section]"
    )
    .forEach(button => {

      button.style.cssText = `
        display: block;
        width: 100%;
        padding: 12px;
        margin: 3px 0;
        border: 0;
        border-radius: 12px;
        background: transparent;
        color: #f5f7fa;
        text-align: left;
        font-size: 13px;
      `;


      button.addEventListener(
        "click",
        () => {

          kaiGoTo(
            button.dataset.menuSection
          );

          menu.remove();

        }
      );

    });

}


/* =========================================================
   LEARNING PROGRESS
   ========================================================= */

function kaiCompleteLesson() {

  kaiV2.lessons += 1;


  if (
    kaiV2.progress < 100
  ) {

    kaiV2.progress += 1;

  }


  kaiSaveState();

  kaiUpdateDashboard();

  kaiNotify(
    "📚 Lesson completed!"
  );

}


/* =========================================================
   DAILY STREAK
   ========================================================= */

function kaiUpdateStreak() {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  const lastVisit =
    localStorage.getItem(
      "kai_v2_last_visit"
    );


  if (
    lastVisit === today
  ) {

    return;
  }


  kaiV2.streak += 1;


  localStorage.setItem(
    "kai_v2_last_visit",
    today
  );


  kaiSaveState();

}


/* =========================================================
   QURAN PLACEHOLDER
   ========================================================= */

function kaiOpenQuran() {

  kaiGoTo("quran");

  kaiNotify(
    "📖 Qur'an library selected."
  );

}


/* =========================================================
   HADITH PLACEHOLDER
   ========================================================= */

function kaiOpenHadith() {

  kaiGoTo("hadith");

  kaiNotify(
    "📜 Hadith library selected."
  );

}


/* =========================================================
   ADHKAR PLACEHOLDER
   ========================================================= */

function kaiOpenAdhkar() {

  kaiGoTo("adhkar");

  kaiNotify(
    "🤲 Adhkar section selected."
  );

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

function kaiInitializeV2() {

  console.log(
    "☪ Know About Islam V2 initializing..."
  );


  kaiLoadState();

  kaiUpdateStreak();

  kaiUpdateDashboard();

  kaiSetupNavigation();

  kaiSetupSearch();

  kaiSetupTheme();

  kaiSetupMenu();


  console.log(
    "☪ Know About Islam V2 initialized successfully."
  );

}


/* =========================================================
   START
   ========================================================= */

if (
  document.readyState === "loading"
) {


  document.addEventListener(
    "DOMContentLoaded",
    kaiInitializeV2
  );

} else {

  kaiInitializeV2();

}

/* =========================================================
   HADITH LIBRARY — V2
   ========================================================= */

(function initHadithLibrary() {

    function renderHadith() {

        const list = document.getElementById("hadith-list");
        const searchInput = document.getElementById("hadith-search");
        const categorySelect = document.getElementById("hadith-category");

        if (!list || !searchInput || !categorySelect) return;

        const searchTerm = searchInput.value
            .trim()
            .toLowerCase();

        const selectedCategory = categorySelect.value;

        const results = (window.hadithData || []).filter(hadith => {

            const searchableText = [
                hadith.collection,
                hadith.book,
                hadith.narrator,
                hadith.topic,
                hadith.english,
                hadith.arabic,
                hadith.reference
            ]
            .join(" ")
            .toLowerCase();

            const matchesSearch =
                !searchTerm ||
                searchableText.includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                hadith.topic === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        if (results.length === 0) {
            list.innerHTML = `
                <div class="progress-card" style="text-align:center;padding:25px;">
                    <h3>🔎 No Hadith found</h3>
                    <p style="color:var(--muted);margin-top:8px;">
                        Try another search or topic.
                    </p>
                </div>
            `;
            return;
        }

        list.innerHTML = results.map(hadith => `
            <article class="progress-card hadith-card"
                style="margin-bottom:16px;padding:20px;">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                    flex-wrap:wrap;
                    margin-bottom:12px;
                ">
                    <strong>📚 ${hadith.collection}</strong>

                    <span style="
                        color:var(--muted);
                        font-size:.85rem;
                    ">
                        ${hadith.reference}
                    </span>
                </div>

                <div style="
                    color:var(--muted);
                    font-size:.9rem;
                    margin-bottom:14px;
                ">
                    ${hadith.book} • ${hadith.topic}
                </div>

                <div dir="rtl" style="
                    font-size:1.35rem;
                    line-height:2;
                    margin:18px 0;
                    text-align:right;
                ">
                    ${hadith.arabic}
                </div>

                <div style="
                    line-height:1.7;
                    margin-bottom:16px;
                ">
                    ${hadith.english}
                </div>

                <div style="
                    border-top:1px solid var(--border);
                    padding-top:12px;
                    color:var(--muted);
                    font-size:.88rem;
                ">
                    <div>
                        👤 <strong>Narrator:</strong>
                        ${hadith.narrator}
                    </div>

                    <div style="margin-top:6px;">
                        ⭐ <strong>Grade:</strong>
                        ${hadith.grade}
                    </div>
                </div>

            </article>
        `).join("");
    }

    function setupHadith() {

        const searchInput =
            document.getElementById("hadith-search");

        const categorySelect =
            document.getElementById("hadith-category");

        if (!searchInput || !categorySelect) return;

        searchInput.addEventListener(
            "input",
            renderHadith
        );

        categorySelect.addEventListener(
            "change",
            renderHadith
        );

        renderHadith();

        console.log(
            `KAI V2: Hadith library loaded — ${
                (window.hadithData || []).length
            } Hadith`
        );
    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            setupHadith
        );

    } else {

        setupHadith();

    }

})();
