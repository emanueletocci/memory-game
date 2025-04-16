const cards = document.querySelectorAll(".memory-card");
const allEmojis = [
    "🍎", "🍌", "🍒", "🍇", "🍉", "🍓", "🍍", "🥝",
    "🍑", "🍈", "🍋", "🍊", "🍏", "🍐", "🍅", "🥥"
];

// Select a subset of emojis based on the grid size
const gridSize = 16; 
const numPairs = gridSize / 2; 
const emojis = allEmojis.slice(0, numPairs); 
const cardValues = [...emojis, ...emojis]; 
const statusDisplay = document.getElementById("status");

// Variables to keep track of the flipped cards
let isFlipped = false;
let firstCard, secondCard;
let lockBoard = false; // Variable to lock the board
let matchedCards = 0; // Variable to keep track of matched cards

window.addEventListener("load", () => {
    if(navigator.online){
        statusDisplay.style.display = "none"; 
        console.log("Online");
    }
    else {
        statusDisplay.style.display = "block";
        statusDisplay.textContent = "You're offline! Check your connection!";
        console.log("Offline");
    }
  });
  
  window.addEventListener("offline", () => {
    statusDisplay.style.display = "block";
    statusDisplay.textContent = "You're offline! Check your connection!";
    console.log("Offline");
  });
  
  window.addEventListener("online", () => {
    statusDisplay.style.display = "none";
    console.log("Online");
});
  
// Add event listener to handle click on cards
cards.forEach(card => card.addEventListener("click", flipCard));

// Add event listener to handle click on the restart button
document.getElementById("restartButton").addEventListener("click", resetGame);

shuffle(cardValues);

// Assign emojis to cards
cards.forEach((card, index) => {
    card.innerHTML = `<span class="emoji">${cardValues[index]}</span>`;
});


// Function to shuffle the card values
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to flip cards
function flipCard() {
    if (lockBoard) return; // Prevent flipping more than two cards
    if (this === firstCard) return; // Prevent clicking the same card twice

    this.classList.add("flipped");

    if (!isFlipped) {
        // First card flipped
        isFlipped = true;
        firstCard = this;
        return;
    }

    // Second card flipped
    secondCard = this;
    checkForMatch();
}

// Function to check for a match
function checkForMatch() {
    const firstEmoji = firstCard.querySelector(".emoji").textContent;
    const secondEmoji = secondCard.querySelector(".emoji").textContent;
    const isMatch = firstEmoji === secondEmoji; // Check if the cards match

    if (isMatch) {
        // Cards match, add matched class
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCards += 2; // Increment the matched cards count
        updateBoard();
        checkForWin();
    } else {
        // Lock the board to prevent further clicks
        lockBoard = true;
        // Cards do not match, unflip them after a short delay
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            updateBoard();
        }, 1000);
    }
}

// Function to update the board after a match
function updateBoard() {
    [isFlipped, firstCard, secondCard, lockBoard] = [false, null, null, false]; // Reset the variables
}

// Function to check for a win
function checkForWin() {
    if (matchedCards === gridSize) {
        setTimeout(() => {
            alert("Congratulations! You've matched all the cards!");
            showRestartButton();
        }, 500);
    }
}

// Function to show the restart button
function showRestartButton() {
    const restartButton = document.getElementById("restartButton");
    restartButton.style.display = "block";
}

// Function to reset the game
function resetGame() {
    matchedCards = 0;
    shuffle(cardValues);
    cards.forEach((card, index) => {
        card.classList.remove("flipped", "matched");
        card.innerHTML = `<span class="emoji">${cardValues[index]}</span>`;
    });
    updateBoard();
    const restartButton = document.getElementById("restartButton");
}

