const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const track = document.getElementById("sliderTrack");
let currentIndex = 0;

function toggleMenu() {
  sideMenu.classList.toggle("active");
  overlay.classList.toggle("active");
}

function moveSlider(direction) {
  const cards = document.querySelectorAll(".project-card");
  let visibleCards =
    window.innerWidth <= 600 ? 1 : window.innerWidth <= 950 ? 2 : 3;
  const maxIndex = cards.length - visibleCards;
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;
  const cardWidth = cards[0].offsetWidth + 30;
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 950 && sideMenu.classList.contains("active"))
    toggleMenu();
  currentIndex = 0;
  track.style.transform = "translateX(0)";
});
