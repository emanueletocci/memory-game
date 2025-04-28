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
let matchedCards = 0; // Variable to keep track of matched cards

const Item = ({ icon }) => {
	const [flipped, setFlipped] = useState(false); // Manca questa riga!
	let content;
	conent = flipCard(icon, flipped, setFlipped);
  	// `flipped && styles.flipped` restituisce `styles.flipped` solo se `flipped` è `true`; altrimenti restituisce `false` o `undefined`, che React Native ignora	  
	return (
	  <Pressable onPress={() => setFlipped(!flipped)}>
      <View style={[styles.item, flipped && styles.flipped]}>	
		{content}
		</View>
	  </Pressable>
	);
  };
  
  function flipCard(icon, flipped, setFlipped) {
	let content;
	// Se la carta è stata girata, mostra l'icona, altrimenti mostra un quadrato vuoto
	if (flipped) {
	  return <Text style={{ fontSize: 36 }}>{icon}</Text>;
	} else {
	  return <Text style={{ fontSize: 36, color: 'transparent' }}>{icon}</Text>;
	}
}

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
		width: 70,
		height: 70,
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
				renderItem={({ item }) => <Item icon={item}/>}
				keyExtractor={(_, idx) => idx.toString()}
				numColumns={numColumns}
				contentContainerStyle={styles.memoryCt}
				scrollEnabled={false}
			/>
		</View>
	);

	function checkForMatch(flippedPair) {
		setLockBoard(true);
		const [first, second] = flippedPair;
		const isMatch = cards[first].emoji === cards[second].emoji;
	}

	// Function to reset the game
	function resetGame() {
		setMatchedCards(0);
		cardValues = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
		updateBoard();
	}

	// Function to update the board after a match
	function updateBoard() {
		[isFlipped, firstCard, secondCard, lockBoard] = [false, null, null, false]; // Reset the variables
	}
}
