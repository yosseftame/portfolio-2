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
//
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const btn = contactForm.querySelector(".send-btn");
  const originalBtnText = btn.innerHTML;

  const userName = contactForm.querySelector('input[name="name"]').value;

  btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
  btn.style.pointerEvents = "none";

  const formData = new FormData(this);

  try {
    const response = await fetch(this.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      Swal.fire({
        title: "Message Sent!",
        text: `Thank you ${userName}, I will get back to you soon.`,
        icon: "success",
        timer: 4000,
        showConfirmButton: false,
        background: "#1a333a",
        color: "#fff",
        iconColor: "#f4d06f",
        toast: true,
        position: "top-end",
        timerProgressBar: true,
      });
      contactForm.reset();
    } else {
      throw new Error();
    }
  } catch (error) {
    Swal.fire({
      title: "Oops!",
      text: "Something went wrong. Please try again.",
      icon: "error",
      background: "#1a333a",
      color: "#fff",
      confirmButtonColor: "#f4d06f",
    });
  } finally {
    btn.innerHTML = originalBtnText;
    btn.style.pointerEvents = "all";
  }
});