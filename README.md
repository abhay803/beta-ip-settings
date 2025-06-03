# Admin Security Feature – IP Whitelisting

This admin UI enables developers to manage IP whitelisting and security settings with support for CIDR-based IP rules. Users can optionally opt out of IP restrictions after acknowledging associated risks. The interface features a clean 2-column layout with a guided configuration flow, including a visual diagram for better clarity.

---

## 🚀 Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/abhay803/beta-ip-settings.git
   cd admin-security-feat
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

---

## 🏃 Running the Project

Start the development server:

```sh
npm dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## ⚙️ Features

- Add/edit/delete CIDR IP entries
- Input validation with real-time feedback
- Optional opt-out with risk confirmation
- Auto-activation of rules on save (no toggle)
- Visual flow of the configuration process

---

## 📝 Notes

- Ensure you have Node.js and npm/yarn installed.

---
