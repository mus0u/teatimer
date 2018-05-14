function parseSeconds() {
  var splitURL = window.location.toString().split("?");
  if (splitURL.length !== 2) {
    return NaN;
  }
  var combinedTime = splitURL[splitURL.length - 1].split("m");
  if (combinedTime.length === 1) {
    return (60 * combinedTime[0]);
  } else if (combinedTime.length == 2) {
    var minutes = parseInt(combinedTime[0]);
    var seconds = parseInt(combinedTime[1]);
    return Math.abs((60 * minutes) + seconds);
  } else {
    return NaN;
  }
}

function chime(audio) {
  audio.play();
  alert("your tea is ready!");
}

function tick(audio) {
  var countdown = document.getElementById("countdown");
  var seconds = parseInt(countdown.innerText) - 1;
  if (seconds > 0) {
    countdown.innerText = seconds;
    document.title = "teatimer: " + seconds;
  } else {
    countdown.innerText = "your tea is ready!";
    document.title = "your tea is ready!";
    clearInterval(window.timerInterval);
    chime(audio);
  }
}

function startTimer() {
  this.style.display = "none";
  var audio = new Audio("chime.mp3");
  window.timerInterval = setInterval(tick, 1000, audio);
}

function main() {
  var seconds = parseSeconds();
  if (isNaN(seconds)) {
    return;
  }
  var countdown = document.createElement("span");
  countdown.id = "countdown";
  countdown.innerText = seconds;
  var content = document.getElementById("content");
  var body = content.parentNode;
  body.replaceChild(countdown, content);
  var startButton = document.createElement("button");
  startButton.id = "startButton";
  startButton.onclick = startTimer;
  startButton.innerText = "start timer";
  body.appendChild(startButton);
}

main();
