// steps:
// 1. Load the HTML content
// 2. Hide all elements
// 3. on Card Click, the tile has to be flipped.
// 4. cannot have more than two tiles open
// 5. if two tiles are a match, then they cannot be closed.
// 6. count the no. of moves
// 7. display the stars based on that.

// Fishes- Yates shuffle algorithm aka Knuth algorithm
function shuffle(arr) {
  var n = arr.length, i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    arr[i].parentNode.insertBefore(arr[i], arr[0]);
  }
}

var moves = 0;
var count = 0;
var matched = [];
const arr = document.getElementsByClassName('card');
const resetElem = document.getElementsByClassName("restart");
resetElem[0].addEventListener('click', reset);
var stars = document.getElementsByClassName("fa fa-star");

function setMoves(moves) {
  const elem = document.getElementsByClassName("moves");
  if (elem) {
    elem[0].innerHTML = "moves: " + moves;
  }
}

function onCardClick(e) {
  var target = e.target;
  var classList = Array.from(target.classList);

  if (target.nodeName !== "LI" && target.nodeName === "I") {
    const parent = target.parentElement;
    target = parent;
  }

  if (classList.includes("open")) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  moves++;
  setMoves(moves);

  target.classList.toggle("show");
  target.classList.toggle("open");
  matched.push(target);

  setTimeout(function () {
    if (matched.length === 2) {
      if (matched[0].children[0].className !== matched[1].children[0].className) {
        matched[0].classList.toggle("open");
        matched[0].classList.toggle("show");
        matched[1].classList.toggle("open");
        matched[1].classList.toggle("show");
      }
      if (matched[0].children[0].className === matched[1].children[0].className) {
        count += 2;
      }
      matched.length = [];
      if (count === 16) {
        alert("Yay! You have completed the game. Press restart to play again.")
        let starCount = 0;
        if (moves) {
          moves < 20 ? starCount = 3 : (moves < 30 ? starCount = 2 : starCount = 1)
        }
        let i = 0;
        while (starCount > 0) {
          stars[i].classList.toggle("yellow");
          i++;
          starCount--;
        }
        count = 0;
      }
    }
  }, 800)
}

function init() {
  Array.from(arr).forEach(x => {
    x.addEventListener('click', onCardClick, { capture: false })
  });
}

function reset() {
  moves = 0;
  setMoves(moves);
  Array.from(arr).forEach((x) => {
    x.classList.remove("open");
    x.classList.remove("show");
  })
  Array.from(stars).forEach((x) => x.classList.remove("yellow"));
  shuffle(arr);
}

window.onload = init;