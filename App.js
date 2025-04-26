import React from "react";
import { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	FlatList,
	Pressable,
} from "react-native";

const numColumns = 4;
const allEmojis = [
	"🍎",
	"🍌",
	"🍒",
	"🍇",
	"🍉",
	"🍓",
	"🍍",
	"🥝",
	"🍑",
	"🍈",
	"🍋",
	"🍊",
	"🍏",
	"🍐",
	"🍅",
	"🥥",
];

const gridSize = 16;
const numPairs = gridSize / 2;
const emojis = allEmojis.slice(0, numPairs);
const cardValues = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

// Variables to keep track of the flipped cards
let isFlipped = false;
let matchedCards = 0; // Variable to keep track of matched cards

const Item = ({ icon, index, flipCard }) => (
  <Pressable onPress={() => flipCard(index)}>
    <View style={styles.item}>
      <Text style={{ fontSize: 36 }}>{icon}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
	title: {
		fontWeight: "bold",
		textAlign: "center",
		padding: 10,
	},
	paragraph: {
		fontWeight: "bold",
		fontSize: 18,
		textAlign: "center",
	},

	memoryCt: {
		alignSelf: "center",
		padding: 10,
	},
	item: {
		width: 100,
		height: 100,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FE9A00",
		margin: 5,
		borderRadius: 8,
	},
	flipped: {
		backgroundColor: "transparent",
	},
});

export default function App() {
	// Gli stati devero essere necessariamente definiti qui
	const [lockBoard, setLockBoard] = useState(false);
	const [firstCard, setFirstCard] = useState(null);
	const [secondCard, setSecondCard] = useState(null);
	return (
		<View
			style={{
				backgroundColor: "#FFF7ED",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={[styles.title, { fontSize: 30 }]}>Let's play memory!</Text>
			<Text style={[styles.title, { fontSize: 20 }]}>
				Test your brain ability!
			</Text>
			<Text style={styles.paragraph}>Attemps: 0</Text>
			<Button title="Restart" color="#2196F3" onPress={resetGame} />

			<FlatList
      	style={{ maxHeight: "500" }}
				data={cardValues}
				renderItem={({ item, index }) => (
					<Item icon={item} index={index} flipCard={flipCard} />
				)}
				keyExtractor={(_, idx) => idx.toString()}
				numColumns={numColumns}
				contentContainerStyle={styles.memoryCt}
				scrollEnabled={false}
			/>
		</View>
	);

  function flipCard(id){
    if (lockBoard || matchedCards.includes(id) || flippedCards.includes(id)) return;

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      checkForMatch(newFlipped);
    }
  };

  function checkForMatch(flippedPair){
    setLockBoard(true);
    const [first, second] = flippedPair;
    const isMatch = cards[first].emoji === cards[second].emoji;

    if (isMatch) {
      setMatchedCards([...matchedCards, first, second]);
      resetTurn();
    } else {
      setTimeout(resetTurn, 1000);
    }
  };

	// Function to reset the game
	function resetGame() {
		matchedCards = 0;
		cardValues = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
		updateBoard();
	}

	// Function to update the board after a match
	function updateBoard() {
		[isFlipped, firstCard, secondCard, lockBoard] = [false, null, null, false]; // Reset the variables
	}
}
