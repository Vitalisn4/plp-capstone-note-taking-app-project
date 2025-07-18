import axios from "axios";

// This updated version simplifies the logic by relying on Vite's
// environment variable system, which is a standard best practice.
//
// 1. It attempts to read the base URL from the `VITE_API_BASE_URL`
//    variable defined in your `frontend/.env.local` file.
//
// 2. If that variable is not found, it falls back to a default
//    value, ensuring the app still works during development even if
//    the .env file is forgotten.
//
// This approach is cleaner than checking `import.meta.env.MODE` directly
// in the code and makes the API endpoint more configurable.

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
});

export default api;
