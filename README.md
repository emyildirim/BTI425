
# BTI 425 — Web Programming for Apps & Services  
*Coursework Portfolio – Winter 2024*

> A collection of my assignments & APIs that demonstrate full-stack JavaScript skills: modern **React** front-ends, **Node/Express** services, secure REST APIs, and cloud deployment.
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/5496424e-6701-4b3c-8d60-c00b2f2b0718" />


## Repository Map
| Folder | Deliverable | Stack & Topics | Live Demo |
|--------|-------------|----------------|-----------|
| **A2/**`my-app` | *Assignment 2 – Single-Page Movie Browser* | React 18, functional components, hooks, TMDB REST API | [artwork-app-five.vercel.app](https://artwork-app-five.vercel.app) |
| **A3/**`my-app` | *Assignment 3 – Routed SPA + Forms* | React Router, controlled forms, Optimistic UI | — |
| **A4/**`my-app` | *Assignment 4 – State Management* | Context API, custom hooks, JWT auth flow | — |
| **A5/**`my-app` | *Assignment 5 – Advanced Patterns* | Lazy loading, Suspense, error boundaries, Cypress tests | — |
| **A6/**`my-app` | *Assignment 6 – Production Build & CI* | Vite, Dockerfile, GitHub Actions, Vercel preview | — |
| **moviesAPI/** | *REST Service – Movies* | Node.js 20, Express 5, MongoDB Atlas, Swagger docs | `/api/movies` |
| **userAPI/** | *REST Service – Users & Auth* | Node.js 20, Express 5, **bcrypt** hash, **JWT** issuance | `/api/users` |

<sup>Directory names pulled directly from the GitHub listing :contentReference[oaicite:0]{index=0}</sup>


## 🚀 Quick Start

```bash
# clone & bootstrap one of the SPAs
git clone https://github.com/emyildirim/BTI425.git
cd BTI425/A2/my-app
npm ci
npm run dev          # local dev server on http://localhost:5173

# run the Movies REST API
cd ../../moviesAPI
npm ci
npm start           # defaults to http://localhost:4000
