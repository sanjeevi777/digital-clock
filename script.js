/* ===================================================================
   Digital Clock — script.js
   Vanilla JavaScript. No frameworks, no dependencies.
   =================================================================== */

// ---- Cache DOM references once, instead of querying repeatedly ----
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const meridiemEl = document.getElementById("meridiem");
const dayLabelEl = document.getElementById("dayLabel");
const dateLabelEl = document.getElementById("dateLabel");

const format12Btn = document.getElementById("format12");
const format24Btn = document.getElementById("format24");
const themeToggleBtn = document.getElementById("themeToggle");

const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ---- State: is the clock in 12-hour or 24-hour mode? ----
// Restored from localStorage if the user chose one before, otherwise 12-hour.
let use12HourFormat = localStorage.getItem("clockFormat") !== "24";

/**
 * Adds a leading zero to single-digit numbers (e.g. 5 -> "05").
 * Keeps the clock digits visually aligned at all times.
 */
function padWithZero(number) {
  return String(number).padStart(2, "0");
}

/**
 * Reads the current system time and paints it into the DOM.
 * Called once immediately, then every second via setInterval.
 */
function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const isPM = hours >= 12;

  if (use12HourFormat) {
    // Convert 0-23 hour range into the 12-hour clock range (1-12).
    hours = hours % 12;
    if (hours === 0) hours = 12;
    meridiemEl.textContent = isPM ? "PM" : "AM";
    meridiemEl.classList.remove("is-hidden");
  } else {
    meridiemEl.classList.add("is-hidden");
  }

  hoursEl.textContent = padWithZero(hours);
  minutesEl.textContent = padWithZero(minutes);
  secondsEl.textContent = padWithZero(seconds);

  dayLabelEl.textContent = DAY_NAMES[now.getDay()];
  dateLabelEl.textContent = `${MONTH_NAMES[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}

/**
 * Switches between 12-hour and 24-hour display, updates the toggle
 * button styling, saves the preference, and re-renders immediately.
 */
function setTimeFormat(formatIs12Hour) {
  use12HourFormat = formatIs12Hour;
  localStorage.setItem("clockFormat", formatIs12Hour ? "12" : "24");

  format12Btn.classList.toggle("is-active", formatIs12Hour);
  format24Btn.classList.toggle("is-active", !formatIs12Hour);

  updateClock();
}

/**
 * Applies a theme ("light" or "dark") to the document root and
 * remembers the choice for future visits.
 */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("clockTheme", theme);
  themeToggleBtn.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  );
}

/**
 * Flips the current theme to its opposite.
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
}

/**
 * Determines the theme to use on first load: a saved preference wins,
 * otherwise fall back to the visitor's OS-level preference.
 */
function getInitialTheme() {
  const saved = localStorage.getItem("clockTheme");
  if (saved === "dark" || saved === "light") return saved;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

// ---- Wire up event listeners ----
format12Btn.addEventListener("click", () => setTimeFormat(true));
format24Btn.addEventListener("click", () => setTimeFormat(false));
themeToggleBtn.addEventListener("click", toggleTheme);

// ---- Initialize the app ----
applyTheme(getInitialTheme());
setTimeFormat(use12HourFormat); // syncs button styling + first render
updateClock();
setInterval(updateClock, 1000); // keep the clock ticking every second