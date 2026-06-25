# Server — Portfolio Contact API

A lightweight Express.js backend that powers the contact form on the portfolio site. It validates incoming requests, forwards messages via SMTP, and sends an auto-reply to the sender.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check — returns `{ ok: true, smtpConfigured: bool }` |
| POST | `/api/contact` | Submit a contact form message |

---

## Local Development

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your SMTP credentials. At minimum you need:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

> **Gmail users**: Generate an [App Password](https://myaccount.google.com/apppasswords) (requires 2FA enabled) and use it as `SMTP_PASS`.

### 3. Start the server

```bash
npm start
```

The server starts on the port defined by `PORT` (default: `5000`).

```
Server running on port 5000
Allowed frontend origins: http://localhost:5173
```

---

## Required Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `5000` | Port the server listens on |
| `SMTP_HOST` | Yes | — | SMTP server hostname |
| `SMTP_PORT` | Yes | — | SMTP server port (e.g. `587` or `465`) |
| `SMTP_USER` | Yes | — | SMTP username / email |
| `SMTP_PASS` | Yes | — | SMTP password or app password |
| `SMTP_SECURE` | No | `false` | Set `true` for port 465 (SSL) |
| `MAIL_FROM` | No | `SMTP_USER` | From address shown in emails |
| `CONTACT_TARGET_EMAIL` | No | `SMTP_USER` | Where contact form submissions are delivered |
| `FRONTEND_ORIGINS` | No | `http://localhost:5173` | Comma-separated list of allowed CORS origins |

---

## Render Deployment

### Step 1 — Create a new Web Service on [Render](https://render.com)

1. Click **New → Web Service**
2. Connect your GitHub repository
3. Configure:

| Setting | Value |
|---|---|
| **Root Directory** | `server` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### Step 2 — Add environment variables

In the Render dashboard, go to **Environment** and add all required variables from the table above. At minimum:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TARGET_EMAIL`
- `FRONTEND_ORIGINS` → set to your Vercel deployment URL (e.g. `https://yourportfolio.vercel.app`)

### Step 3 — Deploy

Click **Deploy**. Once live, copy the Render service URL (e.g. `https://portfolio-api.onrender.com`).

### Step 4 — Update the frontend

In your Vercel project's environment variables, set:

```
VITE_API_URL=https://portfolio-api.onrender.com
```

Redeploy the frontend for the change to take effect.

---

## CORS

CORS is configured via the `FRONTEND_ORIGINS` environment variable. Provide a comma-separated list of trusted origins:

```
FRONTEND_ORIGINS=https://yourportfolio.vercel.app,http://localhost:5173
```

Requests without an `Origin` header (e.g. server-to-server or health checks) are always allowed.
