# Admin Security Feature – IP Whitelisting

This admin UI enables developers to manage IP whitelisting and security settings with support for CIDR-based IP rules. Users can optionally opt out of IP restrictions after acknowledging associated risks. The interface features a clean 2-column layout with a guided configuration flow, including a visual diagram for better clarity.

---

## 🚀 Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/abhay803/beta-ip-settings.git
   cd admin-security-feat
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

---

## 🏃 Running the Project

Start the development server:

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## 🧪 E2E Testing (Cypress)

1. **Install Cypress (if not already installed):**

   ```sh
   npm install --save-dev cypress
   ```

2. **Open Cypress UI:**

   ```sh
   npx cypress open
   ```

   or run all tests headlessly:

   ```sh
   npx cypress run
   ```

3. **Run E2E tests (with app running locally):**

   ```sh
   npm run cypress:open
   ```

   or

   ```sh
   npm run cypress:run
   ```

Test files are located in `cypress/e2e/`.
> **Note:** Make sure the development server is running locally before executing E2E tests.

---

## ⚙️ Features

- Add, edit, and delete CIDR IP entries
- Input validation with real-time feedback
- Optional opt-out with risk confirmation
- Auto-activation of rules on save (no toggle)
- Visual flow of the configuration process

---

## 📝 Notes

- Ensure you have Node.js and npm/yarn installed.

---
