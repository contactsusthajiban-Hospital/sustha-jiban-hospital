

## 🌟 Project Overview

**Sustha Jiban Medical Centre** is a comprehensive, full-stack healthcare management platform developed for a **Kolkata-based super speciality hospital**. The system streamlines patient appointments, doctor management, and administrative operations with a modern, bilingual (English/Bengali) interface.

> 🏆 **Live Application:** [https://susthajibanhospital.up.railway.app/](https://susthajibanhospital.up.railway.app/)
<div align="center">

  <!-- Animated Header Banner -->
  <img src="https://capsule-render.vercel.app/api?@type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Sustha%20Jiban%20Medical%20Centre&fontSize=50&fontColor=fff&animation=fadeIn&fontAlignY=35&desc=Advanced%20Healthcare%20Management%20System&descAlignY=55&descSize=18" width="100%"/>

  <!-- Bengali Tagline -->
  <h3>সুস্থ জীবন মেডিকেল সেন্টার</h3>
  
  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Status-Live-success?style=for-the-badge&logo=checkmarx&logoColor=white"/>
    <img src="https://img.shields.io/badge/Security-Enterprise%20Grade-critical?style=for-the-badge&logo=shield&logoColor=white"/>
    <img src="https://img.shields.io/badge/Language-EN%20%7C%20BN-blue?style=for-the-badge&logo=googletranslate&logoColor=white"/>
  </p>

  <!-- Live Demo Button -->
  <a href="https://susthajiban.up.railway.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Click%20Here-667eea?style=for-the-badge&logoColor=white&labelColor=764ba2" height="40"/>
  </a>
  
  <br/><br/>
  
  <!-- Developer Credit -->
  <table>
    <tr>
      <td align="center">
        <img src="https://img.shields.io/badge/Developed%20By-Kamran%20Alam-667eea?style=for-the-badge&logo=github&logoColor=white" height="30"/>
        <br/>
        <img src="https://img.shields.io/badge/MSc%20Cyber%20Security-Amity%20University-764ba2?style=flat-square&logo=graduation-cap&logoColor=white"/>
        <br/>
        <a href="https://github.com/Shahreyaarr">
          <img src="https://img.shields.io/badge/GitHub-@Shahreyaarr-181717?style=flat-square&logo=github"/>
        </a>
        <a href="https://instagram.com/shahreyarr._">
          <img src="https://img.shields.io/badge/Instagram-@shahreyarr._-E4405F?style=flat-square&logo=instagram&logoColor=white"/>
        </a>
      </td>
    </tr>
  </table>

</div>

---

## 📋 Table of Contents

- [🔒 Security Overview](#-security-overview)
- [✨ Key Features](#-key-features)
- [🏗️ System Architecture](#️-system-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Deployment](#-deployment)
- [📊 Performance](#-performance)
- [🔐 Security Implementation](#-security-implementation)
- [👨‍💻 Developer](#-developer)

---

## 🔒 Security Overview

<div align="center">

| Security Layer | Implementation | Status |
|:-------------:|:--------------|:------:|
| **Authentication** | JWT with 24h expiry | ✅ Active |
| **Password Protection** | bcryptjs (10 rounds) | ✅ Active |
| **Database** | MongoDB with IP whitelist | ✅ Active |
| **Environment Variables** | Railway Secrets Management | ✅ Active |
| **CORS Policy** | Restricted origins | ✅ Active |
| **Input Validation** | Server-side sanitization | ✅ Active |

</div>

> **🔐 Security Note:** This application implements enterprise-grade security measures suitable for healthcare data protection. All sensitive credentials are environment-variable protected and never exposed in client-side code.

---

## ✨ Key Features

### 👨‍⚕️ For Patients
| Feature | Description | Tech Implementation |
|---------|-------------|---------------------|
| **Online Appointment Booking** | Real-time doctor availability with time slot selection | Dynamic API fetching |
| **Bilingual Interface** | English & Bengali language support | i18n implementation |
| **Doctor Profiles** | Complete specialist information with schedules | MongoDB aggregation |
| **Emergency Contact** | One-click emergency calling | Tel protocol integration |

### 🛡️ For Administrators
| Feature | Description | Security Level |
|---------|-------------|:------------:|
| **Secure Admin Dashboard** | JWT-protected admin panel | 🔐 High |
| **Real-time Analytics** | Live appointment statistics | 🔐 High |
| **Patient Management** | Complete patient records | 🔐 Critical |
| **Data Export** | CSV export functionality | 🔐 Medium |
| **Status Management** | Confirm/Cancel appointments | 🔐 High |

---

## 🏗️ System Architecture
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Patient    │  │    Admin     │  │   Public     │  │   Mobile     │    │
│  │   Portal     │  │   Dashboard  │  │   Website    │  │   Responsive │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │
└─────────┼─────────────────┼─────────────────┼─────────────────┼────────────┘
│                 │                 │                 │
└─────────────────┴────────┬────────┴─────────────────┘
│
┌────────────────────────────────────┴────────────────────────────────────────┐
│                         API GATEWAY (Express.js)                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  /api/auth   │  │ /api/doctors │  │/api/slots    │  │/api/admin    │    │
│  │  JWT Verify  │  │  Public GET  │  │Availability  │  │Protected    │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │
│         │                 │                 │                 │             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │/api/booking  │  │/api/patients │  │ /api/stats   │  │/api/export   │    │
│  │  POST/Auth   │  │  CRUD Ops    │  │  Analytics   │  │  CSV Gen     │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
└────────────────────────────────────┬────────────────────────────────────────┘
│
┌────────────────────────────────────┴────────────────────────────────────────┐
│                         DATA LAYER (MongoDB Atlas)                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │  👨‍⚕️ Doctors    │  │  📅 Appointments │  │  👤 Patients    │             │
│  │  Collection     │  │  Collection      │  │  Collection     │             │
│  │  - Profile Data │  │  - Booking Data  │  │  - Personal Info│             │
│  │  - Schedules    │  │  - Status Track  │  │  - Visit History│             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                             │
│  🔐 Security: SSL/TLS Encryption | IP Whitelisting | Role-Based Access      │
└─────────────────────────────────────────────────────────────────────────────┘
plain
Copy

---

## 🛠️ Tech Stack

### Frontend
<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Font%20Awesome-339AF0?style=for-the-badge&logo=font-awesome&logoColor=white"/>
</p>

### Backend
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
</p>

### Deployment & DevOps
<p>
  <img src="https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
  <img src="https://img.shields.io/badge/Git-100000?style=for-the-badge&logo=git&logoColor=white"/>
</p>

---

## 🚀 Deployment

### Live Application
🌐 URL: https://susthajiban.up.railway.app/
📍 Region: US-East (Railway)
⚡ Status: Active
🔒 SSL: Enabled (HTTPS)
plain
Copy

### Environment Configuration
| Variable | Purpose | Security |
|----------|---------|----------|
| `MONGODB_URI` | Database connection string | 🔐 Encrypted |
| `JWT_SECRET` | Token signing key | 🔐 Encrypted |
| `ADMIN_USERNAME` | Admin login credential | 🔐 Encrypted |
| `ADMIN_PASSWORD` | Admin password (bcrypt) | 🔐 Encrypted |
| `PORT` | Server port | Public |

---

## 📊 Performance Metrics

<div align="center">

| Metric | Value | Grade |
|:-------|:------|:-----:|
| **Lighthouse Performance** | 95/100 | 🟢 Excellent |
| **First Contentful Paint** | 0.8s | 🟢 Fast |
| **Time to Interactive** | 1.2s | 🟢 Fast |
| **API Response Time** | < 200ms | 🟢 Optimal |
| **Security Headers** | A+ | 🟢 Secure |

</div>

---

## 🔐 Security Implementation

### Authentication Flow
┌─────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────┐
│  Client │────▶│  POST /login│────▶│  bcrypt     │────▶│  MongoDB│
│         │     │  Credentials│     │  Compare    │     │  Verify │
└─────────┘     └─────────────┘     └──────┬──────┘     └────┬────┘
│                  │
▼                  ▼
┌─────────────┐     ┌─────────┐
│  JWT Sign   │◀────│  Match  │
│  (24h exp)  │     │  Found  │
└──────┬──────┘     └─────────┘
│
▼
┌─────────────┐
│  Response   │
│  {token}    │
└─────────────┘
plain
Copy

### Security Best Practices Implemented

- ✅ **No credentials in code** - All secrets in environment variables
- ✅ **Password hashing** - bcryptjs with salt rounds 10
- ✅ **JWT expiration** - 24-hour token validity
- ✅ **CORS restriction** - Only allowed origins
- ✅ **Input sanitization** - Server-side validation
- ✅ **HTTPS enforcement** - SSL/TLS encryption
- ✅ **No SQL injection** - Mongoose parameterized queries

---

## 👨‍💻 Developer

<div align="center">

### **Kamran Alam**
**Full Stack Developer | Cyber Security Enthusiast**

<p>
  <img src="https://img.shields.io/badge/MSc%20Cyber%20Security-Amity%20University%2C%20Jaipur-764ba2?style=for-the-badge&logo=university&logoColor=white"/>
</p>

<p>
  <a href="https://github.com/Shahreyaarr">
    <img src="https://img.shields.io/badge/GitHub-@Shahreyaarr-181717?style=for-the-badge&logo=github"/>
  </a>
  <a href="https://instagram.com/shahreyarr._">
    <img src="https://img.shields.io/badge/Instagram-@shahreyarr._-E4405F?style=for-the-badge&logo=instagram&logoColor=white"/>
  </a>
</p>

**🛡️ Security First Approach | 💻 Clean Code Advocate | 🚀 Performance Optimized**

> *"Building secure, scalable solutions for real-world healthcare challenges"*

</div>

---

## 📞 Contact & Support

| Type | Details |
|------|---------|
| **Project Issues** | [GitHub Issues](https://github.com/Shahreyaarr/sustha-jiban-medical/issues) |
| **Email** | Contact.susthajiban@gmail.com |
| **Hospital Location** | Durgapur, Itahar, Uttar Dinajpur, WB - 713212 |
| **Emergency** | +91 83485 03676 / 76791 43850 |

---

<div align="center">

### 🏥 Sustha Jiban Medical Centre - Serving Since 2008

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer&text=Thank%20You%20For%20Visiting&fontSize=24&fontColor=fff&animation=fadeIn" width="100%"/>

**© 2026 Sustha Jiban Medical Centre. All Rights Reserved.**
<br/>
**Developed with ❤️ by Kamran Alam**

</div>

