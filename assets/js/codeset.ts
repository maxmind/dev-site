const langChangeEvent = "mm-langChange";
const langStorageKey = "mm-lang";

const codesets = document.querySelectorAll<HTMLElement>(".js-codeset");
codesets.forEach((codeset) => {
  const codeSnippets = codeset.querySelectorAll<HTMLElement>(".highlight");
  const selector = codeset.querySelector(".js-selector");
  const tabFragment = new DocumentFragment();
  const langs = new Set<string>();

  codeSnippets.forEach((codeSnippet) => {
    codeSnippet.classList.add("hide");

    const code = codeSnippet.querySelector<HTMLElement>("code");
    if (code === null) {
      return;
    }
    const lang = code.dataset.lang;
    codeSnippet.dataset.lang = lang;
    if (lang === undefined) {
      return;
    }
    langs.add(lang);

    if (getLang() === null) {
      setLang(lang);
    }

    if (lang === getLang()) {
      codeSnippet.classList.remove("hide");
    }

    const button = document.createElement("button");
    button.textContent = lang;
    button.dataset.lang = lang;
    button.classList.add("btn", "codeset__btn");
    button.addEventListener("click", () => {
      setLang(lang);
    });
    tabFragment.appendChild(button);
  });
  selector?.appendChild(tabFragment);
  maybeShowFirstLang(langs, codeSnippets);
  setActiveButtons();
  codeset.classList.remove("hide");
});

document.addEventListener(langChangeEvent, () => {
  codesets.forEach((codeset) => {
    const codeSnippets = codeset.querySelectorAll<HTMLElement>(".highlight");
    const langs = new Set<string>();
    codeSnippets.forEach((codeSnippet) => {
      const lang = codeSnippet.dataset.lang;
      if (lang === undefined) {
        return;
      }
      langs.add(lang);
      if (lang === getLang()) {
        codeSnippet.classList.remove("hide");
      } else {
        codeSnippet.classList.add("hide");
      }
    });
    maybeShowFirstLang(langs, codeSnippets);
    setActiveButtons();
  });
});

function getLang() {
  return localStorage.getItem(langStorageKey);
}

function setLang(lang: string) {
  localStorage.setItem(langStorageKey, lang);
  const evt = new Event(langChangeEvent);
  document.dispatchEvent(evt);
}

function maybeShowFirstLang(
  langs: Set<string>,
  codeSnippets: NodeListOf<HTMLElement>
) {
  const lang = getLang();
  if (lang === null) {
    return;
  }
  if (!langs.has(lang) && codeSnippets.length > 0) {
    codeSnippets[0].classList.remove("hide");
  }
}

function setActiveButtons() {
  const lang = getLang();
  codesets.forEach((codeset) => {
    const buttons = codeset.querySelectorAll(".codeset__btn");
    const langs = new Set<string>();
    buttons.forEach((button: HTMLElement) => {
      const lang = button.dataset.lang;
      langs.add(lang);
      if (lang === getLang()) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    if (!langs.has(lang) && buttons.length > 0) {
      buttons[0].classList.add("active");
    }
  });
}
