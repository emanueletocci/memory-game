import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	FlatList,
	Pressable,
	Alert,
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

const styles = StyleSheet.create({
	title: {
		fontWeight: "bold",
		textAlign: "center",
		padding: 10,
	},
	paragraph: {
		fontWeight: "bold",
		fontSize: 14,
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
		borderWidth: 2,
		borderColor: "#FE9A00",
	},
	flipped: {
		backgroundColor: "white", // android renders emojis as bitmaps with a white background! I can't use transparent
	},
	boxShadow: {
		shadowColor: "black",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 8,
	},
	matched: {
		opacity: 0.7,
	},
});

const gridSize = 16;
const numPairs = gridSize / 2;
const emojis = allEmojis.slice(0, numPairs);
let cardValues = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

export default function App() {
	// State for flipped cards - I keep an array of the indexes of the cards that are flipped
	const [flippedIndexes, setFlippedIndexes] = useState([]); // initialized as an empty array

	// State for matched cards - I keep an array of the indexes of the matched cards
	const [matchedIndexes, setMatchedIndexes] = useState([]);

	// State to lock the board
	const [lockBoard, setLockBoard] = useState(false);

	const [attempts, setAttempts] = useState(0);

	// useEffect calls the following function every time matchedIndexes changes.
	// This is needed since state changes in React are asynchronous and not immediate
	useEffect(() => {
		if (matchedIndexes.length === gridSize) {
			console.log("Win condition met!");
			Alert.alert("WIN!", "You matched all pairs!", [
				{ text: "OK", onPress: () => resetGame() },
			]);
		}
	}, [matchedIndexes]);

	// Function to handle card flip
	function handleFlip(index) {
		if (lockBoard) return;
		if (flippedIndexes.includes(index)) return;

		const newFlipped = [...flippedIndexes, index];
		setFlippedIndexes(newFlipped);

		if (newFlipped.length === 2) {
			setLockBoard(true);
			setTimeout(() => {
				checkForMatch(newFlipped);
			}, 1000);
		}
	}

	function checkForMatch([firstIdx, secondIdx]) {
		setAttempts((prev) => prev + 1);
		if (cardValues[firstIdx] === cardValues[secondIdx]) {
			// If the cards match, add them to the matched array
			setMatchedIndexes((prev) => [...prev, firstIdx, secondIdx]);
		} else {
			// If they DON'T match, flip ONLY these two cards back after 1 second
			setFlippedIndexes((prev) =>
				prev.filter((idx) => idx !== firstIdx && idx !== secondIdx)
			);
		}

		// Unlock the board and reset flipped cards
		setFlippedIndexes([]);
		setLockBoard(false);
	}

	// Render a single card
	function Item({ icon, index, flipped, matched, onFlip }) {
		return (
			<Pressable onPress={() => onFlip(index)} disabled={flipped || lockBoard}>
				<View
					style={[
						styles.item,
						styles.boxShadow,
						flipped && styles.flipped,
						flipped && styles.boxShadow,
						matched && styles.matched,
					]}
				>
					<Text
						style={{ fontSize: 36, color: flipped ? "black" : "transparent" }}
					>
						{icon}
					</Text>
				</View>
			</Pressable>
		);
	}

	function resetGame() {
		setFlippedIndexes([]);
		setMatchedIndexes([]);
		setLockBoard(false);
		cardValues = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
		setAttempts(0);
	}

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
			<Text style={styles.paragraph}>Attempts: {attempts} </Text>
			<View style={{ margin: 10 }}>
				<Button
					title="Restart"
					onPress={() => {
						resetGame();
					}}
				/>
			</View>
			<FlatList
				style={{ maxHeight: 500 }}
				data={cardValues}
				renderItem={({ item, index }) => (
					<Item
						icon={item}
						index={index}
						flipped={
							flippedIndexes.includes(index) || matchedIndexes.includes(index)
						}
						matched={matchedIndexes.includes(index)}
						onFlip={handleFlip}
					/>
				)}
				keyExtractor={(_, idx) => idx.toString()}
				numColumns={numColumns}
				contentContainerStyle={styles.memoryCt}
				scrollEnabled={false}
			/>
		</View>
	);
}
