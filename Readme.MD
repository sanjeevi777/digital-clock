# Digital Clock

## Overview
A polished, real-time digital clock built entirely with HTML5, CSS3, and vanilla JavaScript. It displays the current local time down to the second, alongside the date and day of the week, wrapped in a modern glassmorphism card with dark and light themes.

## Features
- Real-time clock that updates every second
- Date and day-of-week display
- 12/24-hour format toggle
- Dark / Light mode toggle (with system-preference detection and persistence)
- Fully responsive design (desktop, tablet, mobile)
- Uses the visitor's local system time — no server or database required

## Technologies
- HTML5
- CSS3 (custom properties, glassmorphism, responsive layout)
- JavaScript (ES6, vanilla — no frameworks or libraries)

## Project Structure
```
digital-clock/
│
├── index.html              # Semantic markup for the clock UI
├── style.css                # Theming, layout, and animations
├── script.js                 # Clock logic, format toggle, theme toggle
├── README.md                 # Project documentation
└── screenshots/
    └── clock-preview.png     # App preview image
```

## How to Run
No build step or server required — it's a static site.

1. Clone or download this repository.
2. Open `index.html` directly in your browser, **or** serve it locally:
   ```bash
   # Using Python
   python3 -m http.server 8000

   # Then visit
   http://localhost:8000
   ```
3. That's it — the clock starts ticking immediately using your device's local time.

## Live Demo
https://YOUR-USERNAME.github.io/digital-clock/

## Screenshots
![Digital Clock](screenshots/clock-preview.png)

## Learning Outcomes
Building this project reinforces core front-end fundamentals:
- Working with JavaScript's `Date()` object to read and format live time
- Using `setInterval()` correctly to drive real-time UI updates without a page reload
- Structuring CSS with custom properties (variables) to build a clean, swappable theming system
- Building accessible, responsive layouts with Flexbox and fluid typography (`clamp()`)
- Persisting user preferences across sessions with `localStorage`
- Writing clean, well-commented, beginner-friendly vanilla JavaScript

## Future Improvements
- Support for multiple time zones side by side
- A built-in stopwatch mode
- A countdown timer with custom durations
- An alarm feature with browser notifications
- Additional custom color themes beyond dark/light