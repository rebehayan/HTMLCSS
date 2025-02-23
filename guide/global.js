const GNB = () => {
  const header = document.querySelector(".guide-header");
  if (!header) return;

  const links = header.querySelectorAll("a");

  const bindEvent = (e) => {
    removeClass();
    addClass(e);
    insertHeading(e);
    iframe();
  };

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

  // 제목삽입
  const insertHeading = (e) => {
    const text = e.target.textContent;
    const href = e.target.getAttribute("href");
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

  links.forEach((link) => {
    link.removeEventListener("click", bindEvent); // 메모리누수 방지
    link.addEventListener("click", bindEvent);
  });
};

const iframe = () => {
  const frame = document.querySelector("iframe");
  if (!frame) return;

  frame.onload = null;
  frame.onload = () => {
    try {
      const doc = frame.contentDocument || frame.contentWindow.document;
    } catch (error) {
      console.log(error);
    }
  };
};

GNB();
