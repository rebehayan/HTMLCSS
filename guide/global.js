/* -------------------------------------------------------------------------- */
/*                                     설정                                   */
/* -------------------------------------------------------------------------- */
const config = {
  active: "--active",
  storageName: "activeNav",
};
const { active, storageName } = config;

/* -------------------------------------------------------------------------- */
/*                                     GNB                                    */
/* -------------------------------------------------------------------------- */
const GNB = () => {
  const header = document.querySelector(".guide-header");
  if (!header) return;

  const links = header.querySelectorAll("a");

  const bindEvent = (e) => {
    removeClass();
    addClass(e);
    setState(e);
    insertHeading();
  };

  // 클래스추가
  const addClass = (event) => {
    event.target.classList.add(active);
  };

  // 클래스제거
  const removeClass = () => {
    links.forEach((link) => {
      link.classList.remove(active);
    });
  };

  // 상태저장
  const setState = (e) => {
    sessionStorage.setItem(storageName, e.target.getAttribute("href"));
    sessionStorage.setItem("activeText", e.target.textContent);
  };

  // 이벤트실행
  links.forEach((link) => {
    link.removeEventListener("click", bindEvent); // 메모리누수 방지
    link.addEventListener("click", bindEvent);
  });
};

/* -------------------------------------------------------------------------- */
/*                                  새로고침 상태관리                            */
/* -------------------------------------------------------------------------- */
const getState = () => {
  const frame = document.querySelector("iframe");
  if (!frame) return;

  // iframe
  const activeNav = sessionStorage.getItem(storageName);

  if (activeNav === null) {
    frame.setAttribute("src", "/pages/main.html");
  } else {
    frame.setAttribute("src", activeNav);
  }

  // Nav Active
  const gnbs = document.querySelectorAll('[name="gnb"]');
  const links = document.querySelectorAll('[name="gnb"] a');
  links.forEach((link) => {
    if (link.getAttribute("href") === activeNav) {
      link.classList.add(active);
    }
  });
  gnbs.forEach((gnb) => {
    if (gnb.querySelector(`.${active}`)) {
      gnb.setAttribute("open", "true");
    }
  });
};

/* -------------------------------------------------------------------------- */
/*                                    쓰로틀링                                    */
/* -------------------------------------------------------------------------- */
function throttle(callback, delay) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      callback.apply(this, args);
    }
  };
}

/* -------------------------------------------------------------------------- */
/*                                    제목삽입                                 */
/* -------------------------------------------------------------------------- */
const insertHeading = () => {
  const text = sessionStorage.getItem("activeText");
  const href = sessionStorage.getItem("activeNav");
  const main = document.querySelector(".guide-main");
  const contents = main.querySelector("#contents");
  const heading = main.querySelector("#heading");

  document.title = `${text} - Rebehayan`; // <title> 변경

  if (heading) {
    heading.querySelector("span").textContent = text;
    heading.querySelector("a").setAttribute("href", href);
  } else {
    contents.insertAdjacentHTML("beforebegin", `<h2 id="heading"><span>${text}</span><a href="${href}" target="_blank">새창 보기</a></h2>`);
  }
};

/* ---------------------------------- 함수실행 ---------------------------------- */
GNB();
insertHeading();
getState();
