const cards = document.querySelectorAll(".memory-card");
const allEmojis = [
    "🍎", "🍌", "🍒", "🍇", "🍉", "🍓", "🍍", "🥝",
    "🍑", "🍈", "🍋", "🍊", "🍏", "🍐", "🍅", "🥥"
];

// Select a subset of emojis based on the grid size
const gridSize = 16; 
const numPairs = gridSize / 2; 
const emojis = allEmojis.slice(0, numPairs); 
const statusDisplay = document.getElementById("status");
let rounds = 0;
const attemps = document.getElementById("attempts");


let cardValues = [...emojis, ...emojis].sort(() => Math.random());

// Variables to keep track of the flipped cards
let isFlipped = false;
let firstCard, secondCard;
let lockBoard = false; // Variable to lock the board
let matchedCards = 0; // Variable to keep track of matched cards
  
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

// Assign emojis to cards
cards.forEach((card, index) => {
    card.innerHTML = `<span class="emoji">${cardValues[index]}</span>`;
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flipped");

    if (!isFlipped) {
        isFlipped = true;
        firstCard = this;
        return;
    }

    // Second card flipped
    secondCard = this;

    rounds++;
    attempts.innerHTML = rounds;

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
    cards.forEach((card, index) => {
        card.classList.remove("flipped", "matched");
        card.innerHTML = `<span class="emoji">${cardValues[index]}</span>`;
    });
    cardValues = [...emojis, ...emojis].sort(() => Math.random());

    updateBoard();
    const restartButton = document.getElementById("restartButton");
}

