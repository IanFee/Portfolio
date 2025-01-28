const circlesContainer = document.querySelector(".circles-container");
const particles = [];
const numParticles = 200;
const SPEED_MULTIPLIER = 1;

class Particle{
  constructor(span,speedX,speedY){
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.span = span ;
    this.size = span.offSetWidth;
    this.speedX = speedX * SPEED_MULTIPLIER;
    this.speedY = speedY * SPEED_MULTIPLIER;

    this.span.style.left = `${this.x}px`;
    this.span.style.top = `${this.y}px`;
  }

  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x +this.size > window.innerWidth || this.x <0){
      this.speedX *= -1;
    }
    if(this.y +this.size > window.innerHeight || this.y <0){
      this.speedY *= -1;
    }
    this.span.style.left = `${this.x}px`;
    this.span.style.top = `${this.y}px`;
  }
}

function createParticleElement(){
  const span = document.createElement("span");
  circlesContainer.appendChild(span);
  return span;
}

function init(){
  for(let i=0;i<numParticles;i++){
    const speedX = Math.random() - 0.5;
    const speedY = Math.random() - 0.5;
    const span = createParticleElement()
    particles.push(new Particle(span, speedX, speedY));
  }
}
function animate(){
  particles.forEach((particle)=> {
    particle.update();
  });
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", ()=>{
  particles.forEach((particle)=>{
    particle.x = Math.random() * window.innerWidth;
    particle.y = Math.random() * window.innerHeight;
  });
});

// function openNav() {
//   var x = document.getElementById("navBar");
//   var y = document.getElementById("mainPage");
//   x.style.display = "block";
//   y.style.display = "none";
// }

// function closeNav(){
//   var x = document.getElementById("navBar");
//   var y = document.getElementById("mainPage");
//   y.style.display = "block";
//   x.style.display = "none";
// }

let currentPage = "main_page";

function showSection(sectionId) {
  // Hide all <main> elements
  const allSections = document.querySelectorAll("main");
  allSections.forEach((section) => {
    section.style.display = "none";
  });

  // Show the selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = "block";
  }
}

function openNav() {
  const navBar = document.getElementById("nav_bar");
  const mainPage = document.getElementById("main_page");
  const openNavButton = document.getElementById("open_nav");
  const closeNavButton = document.getElementById("close_nav");

  // Show the navigation bar
  navBar.style.height = "100vh"; // Slide down by setting height
  showSection("nav_bar");

  // Toggle buttons
  openNavButton.style.display = "none"; // Hide the open button
  closeNavButton.style.display = "block"; // Show the close button
}

function closeNav() {
  const navBar = document.getElementById("nav_bar");
  const openNavButton = document.getElementById("open_nav");
  const closeNavButton = document.getElementById("close_nav");

  // Slide up the navigation bar
  navBar.style.height = "0"; // Smoothly slide up
  setTimeout(() => {
    navBar.style.display = "none"; // Fully hide the navbar after animation
  }, 500); // Match transition duration in CSS
    showSection(currentPage);
   // Toggle buttons
   closeNavButton.style.display = "none"; // Hide the close button
   openNavButton.style.display = "block"; // Show the open button
}

// Attach event listeners for all navigation items
document.querySelectorAll("#nav-items li").forEach((item, index) => {
  const sectionIds = ["main_page", "about_me", "experience", "projects", "awards"]; // Add IDs for each <main>
  item.addEventListener("click", () => {
    const sectionId = sectionIds[index];
    currentPage = sectionId;
    showSection(sectionId);
    closeNav(); // Close the navbar after switching sections
  });
});

showSection("main_page");