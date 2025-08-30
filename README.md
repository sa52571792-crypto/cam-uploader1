# Camera Capture & Upload (Consent-based)
This project shows a simple web page that asks for camera permission, lets a user capture a photo, and **automatically uploads** it to a server you control. You can then open `/gallery` from your phone to view photos as they arrive.

## Run locally
1. Install Node.js (v16+).
2. In this folder, run:
   ```bash
   npm install
   npm start
   ```
3. Open http://localhost:3000 on the same device. Camera works on **localhost** without HTTPS.
4. To test from another phone on your Wi‑Fi, use your computer's LAN IP and port 3000 AND HTTPS is required by most mobile browsers for camera on non-localhost. For quick tests, run it on the phone itself, or deploy to an HTTPS host.

## Deploy (HTTPS)
Use any Node hosting (Render, Railway, Fly.io, etc.). They provide HTTPS by default.
- After deploy, share the site URL with your friend.
- Your friend taps **Allow** for camera.
- When they hit **Capture & Upload**, the image is uploaded to your server into `/uploads`.
- You can view images at `/gallery` or directly via the returned URL.

## Legal
- Always get explicit consent. Browsers show a camera permission prompt by design. Don't attempt to bypass it.
