import { includeHTML } from "./include.js";

const GNB = () => {
  const header = document.querySelector(".guide-header");
  if (!header) return;

  const links = header.querySelectorAll("a");

  // 클래스추가
  const addClass = (event) => {
    event.target.classList.add("--active");
  };

  // 클래스제거
  const removeClass = () => {
    links.forEach((link) => {
      link.classList.remove("--active");
    });
  };

  // Include
  const handleInclude = (event) => {
    const href = event.target.getAttribute("href");
    includeHTML(href, "#contents");
  };

  // History
  const handleHistory = (event) => {
    const history = window.history;
    const array = event.target.getAttribute("href").split("/");
    const index = array.pop();
    const url = index.replace(".html", "");

    history.pushState(null, "", `/${url}`);
  };

  const insertHeading = (e) => {
    const text = e.target.textContent;
    const main = document.querySelector(".guide-main");
    const contents = main.querySelector("#contents");
    const heading = main.querySelector("#heading");

    if (heading) {
      heading.textContent = text;
    } else {
      contents.insertAdjacentHTML("beforebegin", `<h2 id="heading">${text}</h2>`);
    }
  };

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      removeClass();
      addClass(e);
      handleInclude(e);
      // handleHistory(e);
      insertHeading(e);
    });
  });
};

GNB();
