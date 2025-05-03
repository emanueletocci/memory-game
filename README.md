# ⚠️ About this repository ⚠️

This repository contains **multiple versions** of the classic Memory game, each developed with different technologies and organized into **separate branches**. 

Among the available versions, you will find a *Progressive Web App* (**PWA**) on **default branch** `pwa`, one built with ***React Native***, and another implemented using ***Flutter***.

*Check out the other branches to explore different versions of the game!*

The PWA linked to this repository (see it is only a partial PWA implementation because GitHub Pages does not support service workers. However, you can still open it in a Chromium-based browser and install it!

## Main Features

- **Dynamic grid**: The game features a 4x4 grid with 16 cards (8 pairs of emojis).
- **Random shuffling**: Cards are shuffled randomly at the start of each game, ensuring a unique experience every time.
- **Game mechanics**: Users can click on two cards to reveal them; if the cards match, they remain face up, otherwise they are flipped back after a short delay.
- **Restart button**: The game can be restarted at any time using the “Restart” button.
- **Status notifications**: The app notifies users of changes in network connectivity (online/offline).
- **Responsive interface**: The layout adapts to different screen sizes, making the game accessible on both desktop and mobile devices.

This application is designed to provide a simple, intuitive, and accessible gaming experience, challenging users’ memory skills in an engaging way.

## Memory Game *React-Native*

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)

This repository contains an App implementation of the classic **Memory Game**, developed using ![React-Native](https://reactnative.dev/) and ![Expo](https://expo.dev/) framework.

<p align="center">
  <img src="assets/screenshots/memory1.png" width="350" height="500"/>
  <img src="assets/screenshots/memory2.png" width="350" height="500"/>
</p>

## Getting Start

⚠️ Make sure you have already installed ![node.js](https://nodejs.org/en)!

1. **Clone repo**: Firstly you have to clone this repo and select or check if you are on the right branch:
    ```
    git clone https://github.com/emanueletocci/memory-game
    cd memory-game
    git checkout react-native
    ```
2. **Install dependencies**: You must install all *js* dependencies using ![npm](https://www.npmjs.com/). 
Navigate to the project directory (you should see a file named *'package.json'*) and run:
    ```
    npm install
    ```
    Now you should have a new folder named *'node_modules'*.

3. **Run *Expo***: Launch a local development server using expo framework:
    ```
    npx expo start
    ```
4. **Switch to Expo Go**: By default expo uses a local development build that must be configured manually... I suggest to use **Expo Go** instead. You can switch to **expo go** simply pressing `s` letter on the keyboard. Now you can use a android/ios emulator, a simple web view or expo go **mobile app**.

Take a look to the expo enviroment ![setup](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&platform=android&device=simulated). 
