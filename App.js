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
		borderWidth: 2,
		borderColor: "#FE9A00",
	},
	flipped: {
		backgroundColor: "white", // android renderizza le emoji come bitmap a sfondo bianco! Non posso usare transparent
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
	// Stato delle carte girate - segno in un array gli indici delle carte che giro
	const [flippedIndexes, setFlippedIndexes] = useState([]); // inizializzato come array vuoto

	// Stato delle carte abbinate - segno in un array gli indiici delle carte abbinate
	const [matchedIndexes, setMatchedIndexes] = useState([]);

	// Stato per bloccare la board
	const [lockBoard, setLockBoard] = useState(false);

	const [attempts, setAttempts] = useState(0);

	// UseEffect chiama la seguente funzione ogni volta che matchedIndexes cambia. Serve in quanto il cambiamento di
	// stato in react é asincrono e non immediato
	useEffect(() => {
		if (matchedIndexes.length === gridSize) {
			console.log("Win condition met!");
			Alert.alert("WIN!", "You matched all pairs!", [
				{ text: "OK", onPress: () => resetGame() },
			]);
		}
	}, [matchedIndexes]);

	// Funzione per gestire il flip della carta
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
			// Se le carte matchano, aggiungile agli abbinati
			setMatchedIndexes((prev) => [...prev, firstIdx, secondIdx]);
		} else {
			// Se NON matchano, rigira SOLO queste due carte dopo 1 secondo
			setFlippedIndexes((prev) =>
				prev.filter((idx) => idx !== firstIdx && idx !== secondIdx)
			);
		}

		// Sblocca la board e resetta le carte girate
		setFlippedIndexes([]);
		setLockBoard(false);
	}

	// Render della singola carta
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
						matched={matchedIndexes.includes(index)} // <--- aggiungi qui
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
