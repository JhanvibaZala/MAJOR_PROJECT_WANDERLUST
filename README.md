# 🌍 Wanderlust - Travel Explorer Web App

**Wanderlust** is a full-stack web application that allows users to explore, review, and discover travel destinations. It features location mapping, image uploads, and user authentication — providing a seamless travel-sharing experience for adventurers and explorers.

## 📌 Key Features

- 🌐 Explore destinations with image galleries
- 📍 View locations on interactive Map (Mapbox)
- 📝 Add and manage reviews
- 🔐 User authentication (Register/Login)
- 🧭 Search and filter places
- 📸 Upload multiple images via Cloudinary
- 📱 Fully responsive design for all devices

---

## 🛠️ Tech Stack

| Layer       | Technologies                                 |
|-------------|----------------------------------------------|
| Frontend    | React.js, Tailwind CSS (or Bootstrap)        |
| Backend     | Node.js, Express.js                          |
| Database    | MongoDB (with Mongoose)                      |
| Auth        | Passport.js or JWT                           |
| Image Upload| Cloudinary                                   |
| Maps        | Mapbox API                                   |
| Deployment  | Render         |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/JhanvibaZala/wanderlust.git
cd wanderlust
````

### 2. Install Dependencies

Install frontend:

```bash
cd client
npm install
```

Install backend:

```bash
cd ../server
npm install
```

### 3. Create `.env` Files

#### For backend (`server/.env`):

```
MONGO_URI=your_mongo_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
MAPBOX_TOKEN=your_mapbox_token
SESSION_SECRET=your_secret
```

---

### 4. Run the Application

Start backend:

```bash
npm run dev
```

Start frontend (in a new terminal):

```bash
cd client
npm start
```

---

## 📸 Screenshots

> (Include screenshots in a `screenshots/` folder and replace the names below)

| Home Page                     | Destination Details                 | Add Review Form                 |
| ----------------------------- | ----------------------------------- | ------------------------------- |
| ![Home](screenshots/home.png) | ![Details](screenshots/details.png) | ![Form](screenshots/review.png) |

---

## 🌐 Live Demo

👉 [View Live Project](https://major-project-wanderlust-r930.onrender.com/listings)

---

## 📂 Folder Structure

```
wanderlust/
├── client/              # React Frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
├── server/              # Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── app.js
├── .env
└── README.md
```

---

## 👩‍💻 Developer

Made with ❤️ by **Jhanviba Zala**

* 💼 [LinkedIn](www.linkedin.com/in/jhanviba-zala-507061283)
* 💻 [GitHub](https://github.com/JhanvibaZala)
* 📧 Email: [jhanvibazala3@gamil.com](mailto:jhanvibazala3@gmail.com)

---


## 💡 Future Enhancements

* Add likes/favorites/bookmarks for destinations
* Admin panel for moderation
* Real-time chat or Q\&A on destinations
* Trip planning tools

```

---

Let me know:
- If you want to use **JWT or Passport** so I mention it specifically
- The name of your deployment link, so I can update the **Live Demo**
- If you want this in **PDF format** for documentation or college submission

I'm happy to customize it more based on your exact codebase.
```
