const timeEl = document.getElementById("time");
const timerEl = document.getElementById("timer");
const nameEl = document.getElementById("name");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

function updateTimeElement() {
  const currentTime = new Date().toLocaleDateString();
  timeEl.textContent = `The time is : ${currentTime}`;

  chrome.storage.local.get(["timer"], (res) => {
    const time = res.timer ?? 0;
    timerEl.textContent = `The time is at: ${time} seconds`;
  });
}
updateTimeElement();
setInterval(updateTimeElement, 1000);

chrome.storage.sync.get(["name"], ({ name }) => {
  if (!name) return;
  nameEl.textContent = `Hello ${name}`;
});

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});

stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
    timer: 0,
  });
  chrome.action.setBadgeText({
    text: "0",
  });
});
