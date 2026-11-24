/* Edit these details and messages to make the scrapbook yours. */
const personal = {
  herName: "Bhagya",
  letter: `I don't say this enough, but having you as my best friend means a lot to me. You have this way of turning an ordinary chat into my favourite part of the day, and your kindness makes the people around you feel safe and seen. I care about you so much, Bhagya, and I'm grateful for every laugh, late-night conversation, and ridiculous bit of lore we've collected. Life is brighter with you in it. Please accept this website as proof that your favourite idiot can occasionally be sincere.`,
  signoff: "Your favourite idiot",
  finalMessage: "You're genuinely one of my favourite people in the world. You make life warmer, funnier, and a little more magical just by being my friend. I'm grateful for you every day, Bhagya. Your favourite idiot is always in your corner. 💗",
  memories: [
    { image: "assets/images/IMG20261105180229.jpg", caption: "The bestie camera roll, exhibit one", alt: "Photo memory of Bhagya and her best friend", placeholder: "📸", note: "A friendship photo" },
    { image: "assets/images/IMG20261105180242.jpg", caption: "Two-person chaos, documented", alt: "Photo memory of Bhagya and her best friend", placeholder: "📸", note: "A friendship photo" },
    { image: "assets/images/IMG20261105180336.jpg", caption: "Certified main-character moment", alt: "Photo memory of Bhagya and her best friend", placeholder: "📸", note: "A friendship photo" },
    { image: "assets/images/IMG20261107183228.jpg", caption: "Friendship lore: a new chapter", alt: "Photo memory of Bhagya and her best friend", placeholder: "📸", note: "A friendship photo" },
    { image: "assets/images/IMG20261107184202.jpg", caption: "Proof we make a pretty great team", alt: "Photo memory of Bhagya and her best friend", placeholder: "📸", note: "A friendship photo" },
    { image: "assets/images/1644037787145.jpg", caption: "A favorite day out", alt: "Bhagya and her friend sitting together outdoors", placeholder: "📸", note: "A friendship photo" },
    { image: "assets/images/IMG-20181020-WA0021.jpg", caption: "Bestie archives: 2018", alt: "Bhagya and her friend sitting together indoors", placeholder: "📸", note: "A friendship photo" },
    { image: "assets/images/IMG-20181020-WA0022.jpg", caption: "Same day, more laughs", alt: "Bhagya and her friend sharing a moment indoors", placeholder: "📸", note: "A friendship photo" },
    { image: "assets/images/IMG-20261123-WA0006.jpg", caption: "A little selfie moment", alt: "Bhagya taking a selfie", placeholder: "📸", note: "A friendship photo" }
  ],
  reasons: [
    "A five-minute catch-up with you somehow turns into a whole event.",
    "You remember little things I mentioned ages ago. It makes me feel heard.",
    "One of your messages can make a very ordinary day better.",
    "You can make me laugh even when I'm trying very hard to be serious."
  ],
  rescueMessages: {
    badDay: [
      "Today is being rude. You are allowed to log off, get a snack, and try again tomorrow.",
      "This day does not get to define you. It barely gets to pick the playlist.",
      "Tiny steps still count. So does lying down dramatically for five minutes."
    ],
    laugh: [
      "Breaking news: local bestie is still iconic. Sources: me, your favourite idiot.",
      "I would tell you a joke about your bad mood, but it looks like it has no sense of humour.",
      "Please picture me attempting a cool entrance and immediately walking into a door."
    ],
    low: [
      "You don't have to be cheerful to be wonderful. I'm here either way.",
      "No fixing required. Take a breath, drink some water, and message me when you're ready.",
      "You've made it through every hard day so far. That's a pretty good record."
    ],
    reminder: [
      "You are smart, kind, funny, and far more capable than your brain is admitting today.",
      "You matter to your people. Yes, that includes this idiot. Especially this idiot.",
      "Your bestie status is permanent. No renewal fee, no awkward paperwork."
    ]
  }
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const world = document.querySelector("#world");
const welcome = document.querySelector("#welcome");

function personalizePage() {
  document.querySelectorAll("[data-her-name]").forEach((element) => {
    element.textContent = personal.herName;
  });
  document.querySelector(".hero-kicker").textContent = `official appreciation page for ${personal.herName}`;
}

// Add a small, fixed number of background hearts to keep animation lightweight.
function createFloatingHearts() {
  if (reduceMotion) return;
  const layer = document.querySelector(".floating-hearts");
  for (let index = 0; index < 12; index += 1) {
    const star = document.createElement("span");
    star.className = "floating-heart";
    star.textContent = index % 3 === 0 ? "✦" : "✧";
    star.style.left = `${(index * 37 + 8) % 100}%`;
    star.style.setProperty("--duration", `${17 + (index % 5) * 2}s`);
    star.style.setProperty("--delay", `${-(index * 1.7)}s`);
    star.style.setProperty("--drift", `${(index % 2 ? 1 : -1) * (18 + index * 2)}px`);
    star.style.fontSize = `${12 + (index % 4) * 4}px`;
    layer.append(star);
  }
}

function enterWorld() {
  world.hidden = false;
  world.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => world.classList.add("is-visible"));
  welcome.classList.add("is-leaving");
  window.setTimeout(() => {
    welcome.hidden = true;
    document.querySelector("#hero-title").focus({ preventScroll: true });
  }, reduceMotion ? 0 : 550);
}

let typingTimer;
// Reveal the letter and type its text once the envelope is opened.
function openLetter() {
  const stage = document.querySelector(".letter-stage");
  const envelope = document.querySelector("#envelope-button");
  const paper = document.querySelector("#letter-paper");
  const message = document.querySelector("#letter-message");
  const isOpen = envelope.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    window.clearInterval(typingTimer);
    envelope.classList.remove("is-open");
    envelope.setAttribute("aria-expanded", "false");
    envelope.setAttribute("aria-label", "Open the best-friend letter");
    paper.classList.remove("is-visible");
    stage.classList.remove("has-letter");
    window.setTimeout(() => { paper.hidden = true; }, reduceMotion ? 0 : 350);
    return;
  }

  paper.hidden = false;
  message.textContent = "";
  document.querySelector("#letter-greeting").textContent = `Hey ${personal.herName},`;
  document.querySelector("#letter-signoff").textContent = personal.signoff;
  envelope.classList.add("is-open");
  envelope.setAttribute("aria-expanded", "true");
  envelope.setAttribute("aria-label", "Close the best-friend letter");
  stage.classList.add("has-letter");
  requestAnimationFrame(() => paper.classList.add("is-visible"));

  if (reduceMotion) {
    message.textContent = personal.letter;
    return;
  }
  let character = 0;
  typingTimer = window.setInterval(() => {
    message.textContent = personal.letter.slice(0, character + 1);
    character += 1;
    if (character >= personal.letter.length) window.clearInterval(typingTimer);
  }, 24);
}

// Build each scrapbook card from the editable memory list and provide a modal view.
function renderMemories() {
  const gallery = document.querySelector("#memory-gallery");
  const dialog = document.querySelector("#photo-dialog");
  const dialogImage = document.querySelector("#dialog-image");
  const dialogFallback = document.querySelector("#dialog-image-fallback");
  dialogImage.addEventListener("error", () => {
    dialogImage.hidden = true;
    dialogFallback.hidden = false;
  });

  personal.memories.forEach((memory, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "memory-card";
    card.style.setProperty("--tilt", `${index % 2 === 0 ? -2.3 : 2.1}deg`);
    card.setAttribute("aria-label", `View memory: ${memory.caption}`);
    const frame = document.createElement("span");
    frame.className = "photo-frame";
    const fallback = document.createElement("span");
    fallback.className = "photo-fallback";
    fallback.innerHTML = `<span class="placeholder-icon" aria-hidden="true"></span><span class="placeholder-note"></span>`;
    fallback.querySelector(".placeholder-icon").textContent = memory.placeholder;
    fallback.querySelector(".placeholder-note").textContent = memory.note;
    fallback.setAttribute("aria-hidden", "true");
    if (memory.image) {
      const image = document.createElement("img");
      image.src = memory.image;
      image.alt = memory.alt;
      image.loading = "lazy";
      image.onerror = () => card.classList.add("image-missing");
      frame.append(image);
    } else {
      card.classList.add("image-missing");
    }
    frame.append(fallback);
    card.append(frame);
    card.addEventListener("click", () => {
      if (memory.image) {
        dialogImage.hidden = false;
        dialogFallback.hidden = true;
        dialogImage.src = memory.image;
        dialogImage.alt = memory.alt;
      } else {
        dialogImage.hidden = true;
        dialogFallback.hidden = false;
        dialogFallback.textContent = `${memory.note} ✦`;
      }
      if (typeof dialog.showModal === "function") dialog.showModal();
    });
    gallery.append(card);
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    dialogImage.removeAttribute("src");
    dialogImage.hidden = false;
    dialogFallback.hidden = true;
  });
}

// Create keyboard-operable flip cards from the customizable reasons list.
function renderReasons() {
  const grid = document.querySelector("#reason-grid");
  personal.reasons.forEach((reason, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "reason-card";
    card.setAttribute("aria-pressed", "false");
    card.setAttribute("aria-label", `Reveal reason ${index + 1}`);
    card.innerHTML = `<span class="reason-card-inner"><span class="reason-face reason-front"><span class="reason-number">${String(index + 1).padStart(2, "0")}</span><span class="reason-heart" aria-hidden="true">✦</span><span class="reason-front-label">tap for a fact</span></span><span class="reason-face reason-back"><span class="reason-heart" aria-hidden="true">✧</span><span class="reason-back-copy"></span></span></span>`;
    card.querySelector(".reason-back-copy").textContent = reason;
    card.addEventListener("click", () => {
      const flipped = card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", String(flipped));
      card.setAttribute("aria-label", flipped ? `Reason ${index + 1}: ${reason}` : `Reveal reason ${index + 1}`);
    });
    grid.append(card);
  });
}

// Let each rescue button choose a message from its own themed set.
function renderRescueKit() {
  let previousByTopic = {};
  document.querySelectorAll("[data-rescue]").forEach((button) => {
    button.addEventListener("click", () => {
      const topic = button.dataset.rescue;
      const messages = personal.rescueMessages[topic];
      let nextIndex = Math.floor(Math.random() * messages.length);
      if (messages.length > 1 && nextIndex === previousByTopic[topic]) {
        nextIndex = (nextIndex + 1) % messages.length;
      }
      previousByTopic[topic] = nextIndex;
      const output = document.querySelector("#rescue-message");
      output.classList.add("is-changing");
      window.setTimeout(() => {
        output.textContent = messages[nextIndex];
        output.classList.remove("is-changing");
      }, reduceMotion ? 0 : 180);
    });
  });
}

function openGift() {
  const button = document.querySelector("#gift-button");
  if (button.getAttribute("aria-expanded") === "true") return;
  button.classList.add("is-open");
  button.setAttribute("aria-expanded", "true");
  document.querySelector("#gift-hint").textContent = "bestie certificate: officially awarded";
  const message = document.querySelector("#final-message");
  message.querySelector("p").textContent = personal.finalMessage;
  message.hidden = false;
  if (!reduceMotion) launchConfetti();
}

// Scatter a short-lived burst of decorative hearts and stars when the gift opens.
function launchConfetti() {
  const field = document.querySelector("#confetti-field");
  const symbols = ["✦", "✧", "✳", "☁", "★"];
  for (let index = 0; index < 28; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[index % symbols.length];
    piece.style.setProperty("--size", `${12 + (index % 4) * 4}px`);
    piece.style.setProperty("--delay", `${(index % 7) * 25}ms`);
    piece.style.setProperty("--x", `${-210 + ((index * 47) % 420)}px`);
    piece.style.setProperty("--y", `${-70 - ((index * 31) % 145)}px`);
    piece.style.setProperty("--turn", `${-180 + ((index * 67) % 360)}deg`);
    field.append(piece);
    window.setTimeout(() => piece.remove(), 1300);
  }
}

// Use the decorative cursor only when a fine pointer is available.
function setupCustomCursor() {
  if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
  const cursor = document.querySelector(".cursor-heart");
  document.body.classList.add("has-custom-cursor");
  window.addEventListener("pointermove", (event) => {
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  }, { passive: true });
}

personalizePage();
createFloatingHearts();
renderMemories();
renderReasons();
renderRescueKit();
setupCustomCursor();

document.querySelector("#open-world").addEventListener("click", enterWorld);
document.querySelector("#envelope-button").addEventListener("click", openLetter);
document.querySelector("#letter-close").addEventListener("click", openLetter);
document.querySelector("#gift-button").addEventListener("click", openGift);