const hungerEl = document.getElementById("hunger");
const anxietyEl = document.getElementById("anxiety");
const energyEl = document.getElementById("energy");
const moneyEl = document.getElementById("money");
const neutralEl = document.getElementById("neutral");
const moodEl = document.getElementById("mood");
const petImage = document.getElementById("pet-image");

const pet = {
  hunger: 50,
  anxiety: 50,
  energy: 30,
  money: 0
};

function saveGame() {
  localStorage.setItem("tonyPet", JSON.stringify(pet));
}

function loadGame() {
  const saved = localStorage.getItem("tonyPet");
  if (saved) Object.assign(pet, JSON.parse(saved));
}

function clamp(val) {
  return Math.max(0, Math.min(100, val));
}

const moodImages = {
  Neutral: "images/neutral.jpeg",
  Hungry: "images/hungry.jpeg",
  Anxious: "images/anxious.jpeg",
  Sleepy: "images/sleepy.jpeg",
  Happy: "images/happy.jpeg"
};

function updateUI() {
  hungerEl.textContent = pet.hunger;
  anxietyEl.textContent = pet.anxiety;
  energyEl.textContent = pet.energy;
  moneyEl.textContent = pet.money;

  let mood = "Neutral";

  if (pet.hunger > 70) mood = "Hungry";
  else if (pet.anxiety > 70) mood = "Anxious";
  else if (pet.energy < 30) mood = "Sleepy";
  else if (pet.hunger < 30 && pet.anxiety < 30 && pet.energy > 60)
    mood = "Happy";

  moodEl.textContent = mood;
  petImage.src = moodImages[mood];

  saveGame();
}


function animatePet() {
  petImage.classList.add("shake");
  setTimeout(() => petImage.classList.remove("shake"), 300);
}


document.getElementById("feedBtn").addEventListener("click", () => {
  pet.hunger = clamp(pet.hunger - 20);
  pet.energy = clamp(pet.energy + 10);
  animatePet();
  updateUI();
});

document.getElementById("therapyBtn").addEventListener("click", () => {
  pet.anxiety = clamp(pet.anxiety - 25);
  animatePet();
  updateUI();
});

document.getElementById("medsBtn").addEventListener("click", () => {
  pet.anxiety = clamp(pet.anxiety - 15);
  animatePet();
  updateUI();
});

document.getElementById("sleepBtn").addEventListener("click", () => {
  pet.energy = clamp(pet.energy + 30);
  pet.hunger = clamp(pet.hunger + 10);
  animatePet();
  updateUI();
});

document.getElementById("collectBtn").addEventListener("click", () => {
  pet.money += 50;
  pet.anxiety = clamp(pet.anxiety + 5);
  pet.energy = clamp(pet.energy - 10);
  pet.hunger = clamp(pet.hunger + 10);
  animatePet();
  updateUI();
});


setInterval(() => {
  pet.hunger = clamp(pet.hunger + 2);
  pet.anxiety = clamp(pet.anxiety + 1);
  pet.energy = clamp(pet.energy - 1);
  updateUI();
}, 5000);

setInterval(() => {
  pet.money += 25;
  updateUI();
}, 20000);

loadGame();
updateUI();
