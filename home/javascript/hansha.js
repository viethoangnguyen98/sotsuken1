let cntDown = 3;
let times = 0;
let avg = 0;
let cnt = 0;
const div = document.querySelector("div");
const main = document.querySelector(".main");
const mainsub = document.querySelector(".mainsub");
const back = document.querySelector(".back");
const average = document.querySelector(".average");
main.animate(
  { opacity: [1, 0, 1] },
  { duration: 4000, iterations: "Infinity" }
);
// パソコンかスマートフォンか判定
const eventType = ((window.ontouchstart !== null) ? 'click' : 'touchstart');

// スタート画面でクリックされた時の処理
div.addEventListener(eventType, countDown);
function countDown() {
  div.removeEventListener(eventType, countDown);
  let id = setInterval(() => {
    main.textContent = cntDown;
    main.animate({ opacity: [1, 0] }, { duration: 1000, fill: "forwards" });
    if (cntDown === 0) {
      clearInterval(id);
      main.textContent = "";
      changeColor();
    }
    cntDown--;
  }, 1000);
}

// ランダム秒後にパネルの色を変える
function changeColor() {
  let time = Math.floor(Math.random() * 3000) + 2000;
  setTimeout(() => {
    div.style.background = "#FFFF77";
    const startTime = new Date();
    timer(startTime);
  }, time);
}

// タイム計測・表示
function timer(startTime) {
  div.addEventListener(eventType, stop);
  function stop() {
    const stopTime = new Date();
    const time = (stopTime.getTime() - startTime.getTime()) / 1000;
    const ul = document.querySelector("ul");
    let li = document.createElement("li");
    // 0.1秒以下はフライング
    if (time < 0.1) {
      main.textContent = "フライング";
      main.animate({ opacity: [1, 0] }, { duration: 2000, fill: "forwards" });
      div.removeEventListener(eventType, stop);
      div.style.background = "";
      changeColor();
      return;
    }

    cnt += 1;
    main.textContent = time;
    times += time;
    avg = (times / cnt).toFixed(3);
    li.textContent = `${cnt}: ${time}`;
    ul.appendChild(li);
    main.animate({ opacity: [1, 0] }, { duration: 2000, fill: "forwards" });
    li.animate({ opacity: [0, 1] }, { duration: 1000, fill: "forwards" });
    average.animate({ opacity: [0, 1] }, { duration: 1000, fill: "forwards" });
    average.textContent = `平均タイム: ${avg}`;
    div.removeEventListener(eventType, stop);
    div.style.background = "";
    // 計測回数が5回になった時の処理
    if (cnt < 5) {
      changeColor();
    } else {
      main.textContent = avg;
      mainsub.textContent = "平均タイム";
      back.textContent = "Back";
      main.animate(
        { opacity: [1, 0, 1] },
        { duration: 4000, iterations: "Infinity" }
      );
      mainsub.animate(
        { opacity: [1, 0, 1] },
        { duration: 4000, iterations: "Infinity" }
      );
      div.addEventListener(eventType, () => {
        location.reload();
      });
    }
  }
}



