🎲 Snake & Ladder Multiplayer Game

A real-time multiplayer Snake & Ladder game built using ASP.NET Core Web API, React, and PostgreSQL. Two players can create or join a room, play turn-by-turn with live updates, encounter snakes and ladders, and compete to reach exactly 100.

![.NET](https://img.shields.io/badge/.NET-10-purple)
![React](https://img.shields.io/badge/React-19.2.7-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.1.1-646CFF?logo=vite)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-green)

🎮 Gameplay Rules
Each player starts at position 1.
Players take turns rolling a dice.
Rolling 6 grants an extra turn.
Landing on a ladder climbs upward.
Landing on a snake slides downward.
A player must roll the exact number required to reach 100.
The first player to reach 100 wins.

📷 Screenshots

Create Room

<img width="1920" height="1080" alt="Screenshot (721)" src="https://github.com/user-attachments/assets/94a9946a-d71c-478e-8a38-50666147300b" />
<img width="1920" height="1080" alt="Screenshot (722)" src="https://github.com/user-attachments/assets/f14b0d83-07f7-4f96-b131-362ec01f8e61" />


Join Room

<img width="1920" height="1080" alt="Screenshot (723)" src="https://github.com/user-attachments/assets/7dd22112-016d-44ce-8088-e6c65955e209" />

Gameplay

<img width="1920" height="1080" alt="Screenshot (726)" src="https://github.com/user-attachments/assets/cecccb58-ecb8-43aa-81e3-fc2175cf30ee" />

<img width="1920" height="1080" alt="Screenshot (727)" src="https://github.com/user-attachments/assets/947b64fe-2892-43a1-afd6-ca33e48d3ee6" />

<img width="1920" height="1080" alt="Screenshot (728)" src="https://github.com/user-attachments/assets/54551f24-152f-4704-b84b-be88b77fb302" />

Winner Popup

<img width="1920" height="1080" alt="Screenshot (729)" src="https://github.com/user-attachments/assets/0ddb0575-d633-4227-bc53-f1d7ae595aa3" />

Exit 

<img width="1920" height="1080" alt="Screenshot (731)" src="https://github.com/user-attachments/assets/c6dd25ec-306b-40e6-a7c3-df48505a54fd" />

Mobile View

<img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 7 35 47 PM" src="https://github.com/user-attachments/assets/e4eda129-8f10-4ff0-9901-e15f6cb404cc" />

✨ Features
Two-player gameplay
Responsive for desktop and mobile layout
Create private game rooms
Waiting room before second player joins
Join using room code and Copy invite link
Turn-based system
Live game synchronization using polling
Live move notifications
Automatic winner detection
Popups for every roll, Game over, Winner

✨User Experience

View Player names and Position
Random dice generation
Snakes and ladders
Animated player movement
Exact roll required to reach 100
Rolling a 6 grants another turn
Exit game support

🛠 Tech Stack

Backend
ASP.NET Core Web API (.NET 10)
Entity Framework Core 10.0.9
Npgsql Entity Framework Provider 10.0.2

Frontend
React 19.2.7
React Router DOM 7.18.1
Axios 1.18.1
Vite 8.1.1
CSS

Database
PostgreSQL

🏗 Architecture
React UI
      │
Axios API Calls
      │
ASP.NET Core Web API
      │
Controllers
      │
Application Layer
      │
Entity Framework Core
      │
PostgreSQL

📂 Project Structure

SnakeLadder

Backend
│
├── API
├── Application
├── Domain
├── Infrastructure

Frontend
│
├── components
├── pages
├── api
├── assets

🚀 Getting Started

Backend
cd Backend

dotnet restore

dotnet run

Frontend

cd Frontend

npm install

npm run dev

🔮 Future Improvements
SignalR for real-time gameplay
Multiple game rooms
Chat system
Sound effects
Dice animation
Player avatars
Match history
Leaderboard
AI opponent

👩‍💻 Author
Rakshita Bangera
Software Developer



 
