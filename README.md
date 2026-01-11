# Card-Game---Hawk-Eye-Innovations
My submission for the Card Game Coding task for Hawk-Eye Innovations Software Engineer Graduate Scheme.

# Project Overview
This project implements a Blackjack card game in two formats:
  - Python CLI Version - Command-line interface game suitable for quick testing and gameplay.
  - React GUI Version - Web-based interactive version with an engaging interface and animations.

This project demonstrates skils in OOP, state management, UI design and game logic implementation.

# Features  
Python CLI Version:
  - Models a standard 52-card deck with suits and ranks.
  - Implements shuffling and card drawing.
  - Includes Blackjack rules (Hit, Stand, Dealer AI logic).
  - Handles Aces as 1 or 11 to avoid busts.
  - Simple text-based interface for gameplay.
  - Determines the winner automatically.

React GUI Version:
  - Fully interactive web interface built with React and TailwindCSS.
  - Real-time display of player and dealer hands with card components.
  - Displays current money, bets and outcomes with animations for wins, losses and ties.
  - Betting system with input validation and balance management.
  - Reset functionality for new games.
  - Optional restart popup when the player runs out of money.
  - Mobile responsive design.

# Technical Implementation
Python Version:
  - Classes: `Card`, `Deck`, `Hand`.
  - Deck Management: Standard 52 cards, shuffled via `random.shuffle`.
  - Game Logic: Hit/Stand, Dealer AI (hit < 17), bust handling, Ace value adjustment.
  - Winner Determination: Compares player vs dealer hand values, detects ties.

React Version:
  - Components: `App`, `MoneyScreen`, `PlayBlackjack`, `Card`.
  - State Management: `useState` and `useEffect` for hands, deck, money, bets and game over logic.
  - Deck Logic: `Deck` class shuffles and draws cards dynamically.
  - Animations: CSS transitions and `animate-pulse` for visual feedback on wins/losses/ties.
  - Responsive Layout: TailwindCSS flex/grid used for player and dealer cards.

# Decisions & Considerations 
  - Dual Implementation - Python CLI demonstrates fundamental OOP and logic skills; React GUI demonstrates front-end skills and interactive design.
  - Ace handling - Converted Ace value dynamically to prevent busts, following real Blackjack rules.
  - Betting system - Allows players to manage money, place bets and restart when balance reaches zero.
  - Component-based design - React components are modular for maintainability and easy extension.

# Possible Improvements
  - Add multiplayer support.
  - Include sound effects and card flip animations for more engaging gameplay.
  - Implement alternative card games such as Poker.
  - Add custom card decks for extended gameplay.

# Setup Instructions
Python CLI Version
  - Ensure Python 3.x is installed.
  - Navigate to Main folder.
  - Run:
      ```bash
      python card_game.py
      ```

React GUI Version
  - Ensure Node.js and npm are installed.
  - Navigate to the React project folder.
  - Install Dependencies:
      ```bash
      npm install
      ```
  - Start Development Server:
      ```bash
      npm run dev
      ```

# Demo
  - Live Demo available at: https://card-game-hawk-eye-innovations.vercel.app/
