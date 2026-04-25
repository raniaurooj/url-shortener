# 🔗 URL Shortener

A full-stack URL Shortener web application built with **Node.js**, **Express.js**, and **MongoDB**. Users can register, log in, shorten URLs, and track how many times each link has been clicked.

---

## 🚀 Features

- 🔐 User Authentication (Signup / Login) with JWT tokens stored in cookies
- ✂️ Shorten any long URL into a unique short ID
- 🔁 Redirect from short URL to original URL
- 📊 Click analytics — track visit history per short link
- 🛡️ Role-based access control (NORMAL user vs ADMIN)
- 📝 Request logging middleware (logs every request to `log.txt`)
- 👤 Each user sees only their own URLs; Admins see all

---

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Runtime    | Node.js                 |
| Framework  | Express.js              |
| Database   | MongoDB + Mongoose      |
| Auth       | JWT (jsonwebtoken)      |
| Templating | EJS                     |
| ID Gen     | shortid                 |

---

## 📁 Project Structure

```
src/
├── controllers/
│   ├── url.js          # URL shortening & analytics logic
│   └── user.js         # Signup & login logic
├── middleware/
│   ├── auth.js         # JWT auth check & role restriction
│   └── index.js        # Request logger
├── models/
│   ├── url.js          # URL schema (shortId, redirectURL, visitHistory)
│   └── user.js         # User schema (name, email, password, role)
├── routes/
│   ├── url.js          # /url routes
│   ├── user.js         # /user routes
│   └── staticRouter.js # Page routes (/, /login, /signup, /admin)
├── service/
│   └── auth.js         # JWT sign & verify helpers
├── views/
│   ├── home.ejs        # Dashboard with URL table
│   ├── login.ejs       # Login page
│   └── signup.ejs      # Signup page
├── connectiondb.js     # MongoDB connection
└── index.js            # App entry point
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/url-shortener.git
cd url-shortener

# 2. Install dependencies
npm install

# 3. Start the server
node index.js
```

The server will start at **http://localhost:8000**

---

## 🔑 Environment Variables

> ⚠️ Currently the JWT secret and MongoDB URI are hardcoded. Before deploying, move them to a `.env` file:

Create a `.env` file in the root:

```env
MONGO_URI=mongodb://127.0.0.1:27017/myAppDatabase
JWT_SECRET=your_secret_key_here
PORT=8000
```

Then install dotenv:
```bash
npm install dotenv
```

And add at the top of `index.js`:
```js
require('dotenv').config();
```

---

## 📌 API Routes

### User Routes (`/user`)
| Method | Endpoint       | Description         |
|--------|----------------|---------------------|
| POST   | `/user`        | Register a new user |
| POST   | `/user/login`  | Login               |

### URL Routes (`/url`)
| Method | Endpoint              | Description                      |
|--------|-----------------------|----------------------------------|
| POST   | `/url`                | Generate a new short URL         |
| GET    | `/url/:shortId`       | Redirect to original URL         |
| GET    | `/url/analytics/:shortId` | Get click analytics          |

### Page Routes
| Method | Endpoint       | Description                      |
|--------|----------------|----------------------------------|
| GET    | `/`            | Home dashboard (auth required)   |
| GET    | `/signup`      | Signup page                      |
| GET    | `/login`       | Login page                       |
| GET    | `/admin/urls`  | All URLs (ADMIN only)            |

---

## 🙋 Author

**Rania Urooj**  
[GitHub](https://github.com/raniaurooj) • [LinkedIn](https://linkedin.com/in/rania-urooj)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).