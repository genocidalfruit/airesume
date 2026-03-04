# AI Resume Search Portal

A React + Vite frontend for uploading resumes and searching ranked resume matches from a backend API.

## What this site does

This site provides two core workflows:

1. **Submit resumes** (`/submit`)
   - Upload a PDF resume.
   - Sends the file to the backend `/submit` endpoint.
   - Shows success/error toast notifications.

2. **Search resumes** (`/search`)
   - Enter a natural-language query (for example, `3 years experience in React`).
   - Sends the query to the backend `/search` endpoint.
   - Displays ranked resume results with:
     - Candidate name
     - Final score (when keyword matches are present)
     - Common keywords
     - Resume download link

The root route (`/`) currently opens the **Submit Resume** page.

## Tech stack

- **React 19**
- **Vite 6**
- **React Router**
- **Framer Motion** (animations)
- **React Toastify** (notifications)
- **Tailwind CSS 4**

## Local development

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite (usually `http://localhost:5173`).

## Available scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Backend dependency

This frontend calls remote API endpoints configured directly in the source code (`Submit.jsx` and `Search.jsx`).
If those endpoints are unavailable, submit/search/download features will fail.
