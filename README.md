# 📚 Manimo — Anime & Manga Browser

A modern single-page application for discovering, searching, and exploring anime and manga.  
Manimo provides fast browsing, rich filters, and detailed information for each title — all powered by a public API such as **Jikan / MyAnimeList**.

---

## 🚀 What It Is

Manimo is a **frontend web app** that lets users:

- Search anime or manga by name  
- Filter by genres, type, status  
- Sort results by score, popularity, or release date  
- Browse a responsive list of titles (cards)  
- View full details (synopsis, genres, episodes/chapters, studios/authors, scores, external links, etc.)

It is built as a **React SPA** with dynamic routing and a polished, responsive UI.

---

## 🔧 The Problem It Solves

Public APIs return raw JSON but don’t provide:

- A fast way to browse hundreds of titles  
- Rich search, filters, or sorting  
- Clean detail views  
- Smooth navigation between list → details  

Manimo solves this by offering an elegant UI and efficient client-side navigation — all without leaving the app.

---

## 🎯 Main Goals

- ⚡ Reliable API fetching with proper loading & error UI  
- 📱 Responsive card-based list view  
- 🔗 Dynamic routing for detail pages  
- 🔍 Search, multi-filtering, sorting, and pagination  
- 🔐 API URLs/keys stored in environment variables  
- ♻️ Reusable components + clean state management  
- 🛡️ Handle API edge cases (rate limits, empty results, missing fields)  
- 🎨 Polished UX, accessible navigation, and 404 support  

---

## 🧠 Frontend Concepts & Techniques Practiced

### 📡 Data Fetching & Effects
- `useEffect` for side effects  
- `async/await` + try/catch  
- Loading, empty, and error states  

### 🧩 Component Architecture
- Reusable components: Card, Filters, Input, Selectors, Header, Footer  
- Lifting state vs. props drilling  
- Controlled inputs  
- Debounced search  

### 🔍 Filtering, Sorting & State Logic
- Multi-filter by genre/type/status  
- Immutable operations (`slice()` before `.sort()`)  
- Pagination & limit controls  
- Query param management  

### 🛣️ Routing (React Router)
- Static + dynamic routes  
- `Link`, `useParams`, nested pages  
- 404 fallback  

### ⚙️ Environment Variables
- `import.meta.env` with Vite  
- Hiding API URLs/keys  

### 🖼️ UI, UX & Accessibility
- Semantic HTML & alt attributes  
- Focus states & keyboard navigation  
- Responsive grid/flex layouts  
- Safe access (`?.`)  
- Formatting (dates, numbers, truncation)  

### 🛠️ Defensive UX
- Rate limit handling  
- Retry UI  
- Graceful fallback for missing data  

---

## 📦 Features Overview

- 📝 Anime & manga search  
- 🎛️ Multi-filter controls  
- ↕️ Sorting (score, popularity, date)  
- 🔄 Pagination / limit selector  
- 📄 Detailed metadata page  
- 🌐 External links to MyAnimeList  
- 💎 Modern UI & responsive design  

---

## 🗂️ Project Structure (Example)

```txt
src/
  components/
    Card/
    Filters/
    SearchInput/
  pages/
    Home.jsx
    Detail.jsx
    NotFound.jsx
  hooks/
    useFetch.js
  utils/
    formatters.js
  App.jsx
  main.jsx
```

---

## 🛠️ Tech Stack

- **React + Vite**
- **React Router**
- **Fetch API / Axios**
- **CSS Grid & Flexbox**
- **Environment Variables**

---

## 📄 Environment Variables Example

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://api.jikan.moe/v4
VITE_API_KEY=your_key_if_needed
```

---

## 🚧 Future Improvements

- Favorites & watchlist
- Infinite scroll
- Dark mode
- React Query / SWR caching
- Animations (Framer Motion)
