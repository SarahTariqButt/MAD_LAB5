# React Native Starter — PUCIT, BSSE 2024

This project is pinned to **Expo SDK 54**. Do not upgrade anything.

## Do this at home BEFORE Lecture 8

Not in the lab. The install downloads roughly 300 MB and sixty students
doing it at once will take the lab network down.

    cd rn-starter
    npm install

When it finishes you will have a `node_modules` folder. That means you are ready.

## Install Expo Go on your phone

| Phone   | Where to get it                                    |
|---------|----------------------------------------------------|
| Android | expo.dev/go — choose the **SDK 54** build          |
| iPhone  | App Store — the normal Expo Go                     |

Android students: use expo.dev/go, not whatever the Play Store offers.
A newer Expo Go will refuse to open this project.

## Running it

    npx expo start

A QR code appears. Scan it with the Expo Go app on Android, or with the
built-in Camera app on iPhone. Your phone and your laptop must be on the
**same WiFi**.

Leave that command running — it is a server. Closing the terminal stops your app.

### Useful keys while it runs

| Key      | What it does                  |
|----------|-------------------------------|
| `r`      | Reload the app                |
| `m`      | Open the developer menu       |
| `a`      | Open an Android emulator      |
| `Ctrl+C` | Stop the server               |

## If the QR will not connect

1. Check both devices are on the same WiFi, and that mobile data is off on the phone.
2. Try your own phone's hotspot: connect the laptop to it.
3. Run `npx expo start --tunnel` — slower, but it works around a network
   that blocks devices from talking to each other.

## If your phone says "Project is incompatible with this version of Expo Go"

Your Expo Go is the wrong version. Install the SDK 54 build. Your code is fine.

## Which files matter

| File           | Edit it?                       |
|----------------|--------------------------------|
| `App.js`       | Yes — this is your screen      |
| `app.json`     | Yes — app name and settings    |
| `package.json` | No — the pinned versions       |
| `node_modules/`| Never                          |

## Never do this

    npm update
    npm install expo@latest

Both will break the project so that it no longer opens in Expo Go.
