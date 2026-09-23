# 🚀 Sahayog Platform Free Deployment Guide

This guide walks you through deploying the complete **Sahayog** cooperative platform (Frontend + Backend + PostgreSQL Database) for **100% Free** with no credit card required.

---

## 🎯 Architecture

```
[ Frontend: Vercel / Netlify ] (Free)
             │
             ▼
[ Backend API: Render.com / Koyeb ] (Free)
             │
             ▼
[ Database: Neon.tech / Supabase PostgreSQL ] (Free Forever)
```

---

## 📋 Step 1: Create Free PostgreSQL Database (Neon.tech)

1. Go to **[https://neon.tech](https://neon.tech)** and sign up (Free).
2. Click **Create Project** -> Name it `sahayog-db`.
3. Copy your **Postgres Connection URI** string. It will look like:
   ```env
   postgresql://sahayog_owner:AbCdEf123456@ep-cool-lake-123456.us-east-2.aws.neon.tech/sahayog-db?sslmode=require
   ```

---

## ⚙️ Step 2: Deploy Backend to Render.com (Free)

1. Push this project to your GitHub account (or GitLab/Bitbucket).
2. Go to **[https://render.com](https://render.com)** and sign in.
3. Click **New +** -> Select **Web Service**.
4. Choose **"Build and deploy from a Git repository"** and select your `Sahayog` repository.
5. Configure the service settings:
   - **Name:** `sahayog-api`
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npx prisma db push && npm run build && npx ts-node src/prisma/seed.ts`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
6. Under **Environment Variables**, add:
   - `DATABASE_URL`: *(Paste your Neon.tech Postgres connection string from Step 1)*
   - `JWT_SECRET`: *(Enter any secret string, e.g. `sahayog_jwt_super_secret_key_2026`)*
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
7. Click **Deploy Web Service**.
8. In 2 minutes, your backend will be live at `https://sahayog-api.onrender.com`! Test it by opening `https://sahayog-api.onrender.com/api/health`.

> **Note on schema for Postgres:** Before pushing to Neon Postgres, open `server/prisma/schema.prisma` and change `provider = "sqlite"` to `provider = "postgresql"`.

---

## 🖥️ Step 3: Deploy Frontend to Vercel (Free)

1. Go to **[https://vercel.com](https://vercel.com)** and sign in with GitHub.
2. Click **Add New...** -> **Project**.
3. Select your `Sahayog` repository and click **Import**.
4. Configure the project:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./` (Leave default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://sahayog-api.onrender.com/api` *(Your Render backend URL from Step 2)*
6. Click **Deploy**.
7. In ~30 seconds, your frontend is live with automatic global CDN and SSL at `https://sahayog.vercel.app`!

---

## 🐳 Alternative: 1-Click Docker Deployment

If you want to run both frontend and backend in Docker containers on a VPS (DigitalOcean, AWS, Linode, or local):

```bash
# Start full stack (Frontend on port 80, Backend on port 5000)
docker compose up --build -d
```

---

## 📊 Live External Spreadsheets in Production

The live CSV export system works in production:
- Download spreadsheets anytime from:
  - `GET https://your-backend.onrender.com/api/sheets/download/user_accounts.csv`
  - `GET https://your-backend.onrender.com/api/sheets/download/workers_revenue.csv`
  - `GET https://your-backend.onrender.com/api/sheets/download/schedule_bookings.csv`
- Or click the **Export Sheets** button in the Admin Dashboard at any time.

---

## ✅ Deployment Checklist

- [ ] Neon.tech PostgreSQL database created
- [ ] `schema.prisma` set to `postgresql` datasource
- [ ] Render.com backend web service running and healthy at `/api/health`
- [ ] Vercel.com frontend deployed with `VITE_API_URL` pointing to Render
- [ ] Admin login verified (`admin@sahayog.in` / `demo1234`)
