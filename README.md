# Note-Taking App

A full-stack note-taking application built with the MERN stack (MongoDB, Express, React, Node.js). This app allows users to create, view, update, and delete notes with a modern UI and robust backend, including rate limiting for API protection.

---

## Features

- **Create, Read, Update, Delete (CRUD) Notes**
- **Responsive UI built with React and Tailwind CSS**
- **RESTful API with Express and MongoDB**
- **Rate limiting using Upstash Redis**
- **Error handling and user feedback**
- **Environment-based configuration**
- **Production-ready build setup**

---

## Live Demo

Access the live application here:  
**[Live URL](https://plp-capstone-note-taking-app-project.onrender.com)**

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), Upstash Redis
- **Dev Tools:** ESLint, Prettier, VS Code

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Upstash Redis account

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Vitalisn4/plp-capstone-note-taking-app-project.git
cd note-taking-app
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file in the `backend` folder and add your MongoDB URI, Upstash Redis credentials, and other environment variables:

  ```
  MONGO_URI=your-mongodb-uri
  PORT=port_number
  UPSTASH_REDIS_REST_URL=your-upstash-url
  UPSTASH_REDIS_REST_TOKEN=your-upstash-token
  NODE_ENV=depending_on_developer
  ```

- Start the backend server:

  ```bash
  npm run dev
  ```

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

- Start the frontend development server:

  ```bash
  npm run dev
  ```

---

## Folder Structure

```
Note-Taking-App/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── .env
    └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   │   └── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── package.json
└── README.md
```

---

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a single note by ID
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

---

## Environment Variables

See `.env.example` for required variables.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## License

This project is licensed under the MIT License.

---

## Author

Ngam Vitalis Yuh

---

## Acknowledgements

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Upstash Redis](https://upstash.com/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)