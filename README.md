# Vertical Jump Pro

A polished, mobile-first static PWA for the 24-week vertical jump macrocycle.

## Files
- `index.html` — app shell
- `styles.css` — UI styling
- `app.js` — workout data, rendering, timers, tracking, calendar logic, and optional cloud sync
- `manifest.json` — PWA manifest
- `sw.js` — service worker for offline caching
- `icons/` — app icons

## Host it
### Netlify Drop
1. Unzip the folder.
2. Open the folder that contains `index.html`.
3. Go to Netlify Drop.
4. Drag the folder onto the page.
5. Open the generated URL on your phone.
6. Add it to your home screen.

### GitHub Pages
1. Create a new GitHub repository.
2. Upload these files.
3. Go to **Settings → Pages**.
4. Publish from the `main` branch and the repository root.
5. Open the Pages URL on your phone.

## What changed in this version
- Today, Tracker, and Settings now render fully.
- The app can auto-follow the real date using your program start date.
- You can still browse other weeks and days manually.
- Optional Google sign-in and cloud sync hooks are included through Firebase.

## Firebase cloud sync setup
1. Create a Firebase project and add a **Web App**.
2. In Firebase Authentication, enable **Google** as a sign-in method.
3. In Firestore, create a database.
4. Copy your Firebase web app config into **Settings → Cloud sync**.
5. Save the config, then sign in with Google.
6. Use **Save to cloud** and **Load from cloud**, or turn on auto-sync.

## Notes
- Without Firebase config, the app still works fully with local browser storage.
- Use **Settings** to enter training maxes, set your program start date, and export/import a JSON backup.
- Use **Tracker** once per week to log bodyweight, jump numbers, sleep, and leg feel.
- Service worker install/offline behavior works when hosted on HTTPS or localhost.

New in this build:
- Click any exercise card to open a detail modal with a short description, cues, what to avoid, and a placeholder illustration.
- Responsive layout now works better on both phones and laptops. Mobile keeps the bottom tab bar; desktop shifts to a left-side navigation layout.
- Firebase Authentication with Google sign-in and Firestore sync is still optional and already wired in Settings. Add your Firebase web app config there to turn it on.
