# 🚀 Cumulative Project: User Auth & Webhook Listener

This project demonstrates a full-stack implementation of **user authentication** using **Next.js** and **NextAuth**, along with a **ClickUp Webhook Listener** that reacts to task creation events.

---

## 📘 Overview

The application includes:
1. 🔑 **Login / Signup using Credentials (JWT-based)**
2. 🔐 **Google OAuth Authentication**
3. 🔔 **ClickUp Webhook Listener for Task Creation**

It provides a secure authentication flow, supports Google sign-in, and includes an integrated webhook endpoint for ClickUp automation.

---

## 🧩 Features

### 1️⃣ Login / Signup using Credentials (JWT-based)
- Users can **create an account** and **log in** with email and password.  
- Upon successful authentication:
  - A **JWT (JSON Web Token)** is generated and securely stored in the user’s session (managed by NextAuth).  
  - Tokens are validated on each request, maintaining a **stateless and secure** session.  
- Passwords are **hashed** before storage to ensure security.

---

### 2️⃣ Google OAuth Login with NextAuth
- Integrated **Google OAuth** .
- Users can log in securely with their **Google account** — no password needed.
- On successful login:
  - Retrieves user details such as name, email, and profile image.
  - Creates a **NextAuth session** stored using JWTs.

**Environment Variables Required:**
```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret

```
📄 **ClickUp Documentation:** [View Here](https://doc.clickup.com/90161286992/d/h/2kz0g3ug-1356/cdad2148867e962)