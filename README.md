# 🇮🇳 DemocracyLens

**DemocracyLens** is a modern, interactive web application designed to simplify and educate users about the Indian Election System. Built with Next.js and a premium design system, it breaks down complex electoral processes into bite-sized, engaging modules.

## 🚀 Live Demo
Experience the app live: **[https://election-assistant-574005567405.us-central1.run.app](https://election-assistant-574005567405.us-central1.run.app)**

---

## ✨ Key Features

- **Interactive Timeline**: A step-by-step journey of the election process, from Delimitation to Results.
- **Study Flashcards**: Master key terminology like EVM, VVPAT, and Model Code of Conduct with 3D flip-cards.
- **Knowledge Quizzes**: Test your understanding with multiple-choice quizzes and detailed explanations.
- **Election Assistant Chat**: A simulated AI chatbot to answer specific questions about voter registration and election rules.
- **Premium UI**: Dark mode support, glassmorphism, and smooth micro-animations.

---

## 🛠 Tech Stack

```mermaid
graph TD
    A[Next.js 15] --> B[React 19]
    A --> C[Vanilla CSS]
    A --> D[Lucide React Icons]
    E[Deployment] --> F[Google Cloud Run]
    E --> G[Cloud Buildpacks]
```

---

## 🗳 The Election Process

Here is the journey of an election in India as presented in the app:

```mermaid
graph TD
    Step1(1. Delimitation) --> Step2(2. Voter Registration)
    Step2 --> Step3(3. Notification)
    Step3 --> Step4(4. Nomination)
    Step4 --> Step5(5. Scrutiny)
    Step5 --> Step6(6. Campaigning)
    Step6 --> Step7(7. Polling Day)
    Step7 --> Step8(8. Results)
    
    style Step1 fill:#ff9933,stroke:#333,stroke-width:2px,color:#fff
    style Step8 fill:#138808,stroke:#333,stroke-width:2px,color:#fff
```

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/thenikhilbisht/DemocracyLens.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components (Navbar, Footer, etc.).
- `src/data`: Mock data for timelines, quizzes, and flashcards.
- `src/app/globals.css`: Premium design system and utility classes.

---

## 📜 License
This project is for educational purposes. Built with ❤️ for Indian Democracy.
