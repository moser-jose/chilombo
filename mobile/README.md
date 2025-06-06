# Chilombo

Chilombo project mobile app, developed with React Native, Expo, and TypeScript. This app aims to offer a modern, cross-platform experience for iOS users.

---

<div align="center">

<img src="assets/images/logo-light.png" width="250" alt="Chilombo Logo"/>

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![iOS](https://img.shields.io/badge/iOS-000000?style=flat&logo=apple&logoColor=white)](https://www.apple.com/ios/)

</div>

## Screenshots

### Main app screens:

<p align="center">
  <img src="assets/readme/login-white.PNG" alt="Login - Light Theme" width="230" />
  <img src="assets/readme/main-white.PNG" alt="Home - Light Theme" width="230" />
  <img src="assets/readme/main-white-01.PNG" alt="Home - Light Theme (variation 1)" width="230" />
</p>

<p align="center">
  <img src="assets/readme/login-black.jpeg" alt="Login - Dark Theme" width="230" />
  <img src="assets/readme/main-black.PNG" alt="Home - Dark Theme" width="230" />
  <img src="assets/readme/main-black-01.PNG" alt="Home - Dark Theme (variation 1)" width="230" />
</p>

---

## Overview

**Chilombo** is the official app of the Chilombo project, developed to facilitate cleaning service provision. Focused on accessibility, performance, and backend integration via API, the app efficiently connects clients and cleaning service providers. It uses modern navigation, authentication, optimized assets, and native integrations via Expo.

**Chilombo's Differentials:**

- **Accessibility:** Interface adapted for screen readers, enhanced contrast, and easy navigation for all audiences.
- **Performance:** Asset optimization, lazy loading of components, use of WebP images, and smooth animations with react-native-reanimated.
- **API REST Integration:** Robust and secure communication with the backend, including JWT authentication and real-time data updates.
- **Modern Navigation:** Uses expo-router for dynamic routes, deep linking, and smooth screen transitions.
- **Secure Authentication:** Integration with OAuth providers, secure token storage with expo-secure-store, and social login flows.
- **Native Integrations via Expo:** Push notifications, location access, secure storage, permissions, and device features.
- **Light/Dark Theme Support:** Automatic adaptation to system theme, with responsive and customizable design.
- **Offline Experience:** Data caching, offline fallback, and automatic sync when reconnecting.
- **Automated Testing:** Unit test coverage and continuous integration with Jest and Expo.
- **Advanced Security Practices:** Input validation, HTTPS communication, XSS protection, and use of encrypted storage.

---

## Technologies Used

- React Native
- Expo
- TypeScript
- Jest (testing)
- ESLint & Prettier (code style)

---

## Requirements

- Node.js (recommended version: see package.json)
- Yarn or npm
- Expo CLI (`npm install -g expo-cli`)
- Xcode (to run on emulators or physical devices)

---

## Installation and Running

```bash
# Install dependencies
yarn

# iOS
yarn expo run:ios
```

---

## Folder Structure

```
mobile/
├── assets/         # Images, fonts, etc.
├── src/            # Main source code
├── android/        # Android settings
├── ios/            # iOS settings
├── .expo/          # Expo settings
├── ...             # Other configuration files
```

---

## Code Standards

- Use TypeScript for all code files.
- Run `yarn lint`, `lint:fix`, and `yarn format` before opening PRs.
- Write tests for new features.

---

## Contributing

1. Fork the project.
2. Create a branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -m 'feat: my new feature'`
4. Push to the branch: `git push origin my-feature`
5. Open a Pull Request.

---

## 📧 Contact

- Email: mosmmy@gmail.com
- LinkedIn: [Moser José](https://linkedin.com/in/moser-jose)
- GitHub: [@moser-jose](https://github.com/moser-jose)

---

<div align="center">
Made with ❤️ by Moser José
</div>
