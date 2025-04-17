# 🛒 Augment Cart

Augment Cart is a next-gen grocery shopping platform that combines traditional web/app interfaces with an immersive 3D store experience.

## 🔗 Live Links

- 🌐 **Website**: [https://augment-cart.netlify.app](https://augment-cart.netlify.app)
- 📱 **Download App (APK)**: [Augment Cart.apk](https://drive.google.com/file/d/1IHgE_IJyzyyPhYD9kOcNx8RJsqSACi84/view?usp=sharing)  

---

## 🧩 Project Structure

### 1. 📱 App (React Native)
A mobile shopping app built with:

- React Native
- Razorpay integration for payments
- React Navigation
- AsyncStorage for session/cart persistence

### 2. 💻 Website (React + Vite)
A web interface with:

- React + Vite
- Razorpay (for web checkout)
- React Router DOM for routing
- Notiflix for toast/notifications
- Axios for API calls

### 3. ⚙️ Backend (Express + MongoDB)
Robust backend server:

- Express.js + Node.js
- MongoDB (Mongoose)
- Multer for image upload support
- JWT-based authentication
- Razorpay order creation

### 4. 🛍️ 3D Store (Blender + Unity)
An immersive store experience built with:

- Unity Engine
- Blender (for 3D modeling)
- Product models sourced from Sketchfab
- Real-time integration with backend for live product data

> ⚠️ **Note**: Before opening the 3D Store (via embedded WebView or browser), please wait until the backend hosted on Render spins up. This may take a few seconds. Wait until product categories and data are fully loaded before interacting.

---

## 🚀 Features

- Product browsing by category
- Wishlist and Cart support (sync via local storage)
- Google Sign-In (App)
- Full profile management (image, address, mobile)
- Razorpay checkout (App + Web)
- Reorder from past orders
- 3D Virtual Store with real-time data

---

## 🛠 Tech Stack

| Frontend | Backend | Payments | Storage |
|----------|---------|----------|---------|
| React Native, React + Vite, Unity | Node.js + Express | Razorpay | MongoDB, AsyncStorage |

---

## 📥 Installation & Dev Setup (Optional)

### Backend
```bash
cd backend
npm install
npm start
```

### Website
```bash
cd website
npm install
npm run dev
```

### App
Open with Expo or your preferred React Native dev environment.

---

## 🤝 Contributions

Feel free to fork, suggest improvements, or open issues!

---


