# Memory Game *PWA*

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

This repository contains a *Progressive Web App **(PWA)*** implementation of the classic **Memory Game**, developed using HTML, CSS, and JavaScript.

## Main Features

- **Dynamic grid**: The game features a 4x4 grid with 16 cards (8 pairs of emojis).
- **Random shuffling**: Cards are shuffled randomly at the start of each game, ensuring a unique experience every time.
- **Game mechanics**: Users can click on two cards to reveal them; if the cards match, they remain face up, otherwise they are flipped back after a short delay.
- **Restart button**: The game can be restarted at any time using the “Restart” button.
- **Status notifications**: The app notifies users of changes in network connectivity (online/offline).
- **Responsive interface**: The layout adapts to different screen sizes, making the game accessible on both desktop and mobile devices.

This application is designed to provide a simple, intuitive, and accessible gaming experience, challenging users’ memory skills in an engaging way.

## Getting start
⚠️ Make sure you have already installed ![node.js](https://nodejs.org/en)!

1. **Install dependencies**: After **locally cloning** the repository and checked out to the *pwa* branch, you must install all *js* dependencies using ![npm](https://www.npmjs.com/). 
Navigate to the project directory (you should see a file named *'package.json'*) and run:
    ```
    npm install
    ```
    Now you should have a new folder named *'node_modules'*.

2. **Run webserver**: Launch a local development server using http-server:
    ```
    npx http-server
    ```
3. **Install PWA** (optional): Open a chromium based browser (like *google chrome*) and open your browser and go to the address shown in the terminal by the web server (usually `http://localhost:8000`). Now a small “Install” icon will appear in the address bar at the top right (usually represented by a monitor with a downward arrow or a plus sign).
Click on this icon and then confirm by selecting “Install” to add the PWA to your system



