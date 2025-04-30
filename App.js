import React, { useState } from "react";
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

const gridSize = 16;
const numPairs = gridSize / 2;
const emojis = allEmojis.slice(0, numPairs);
const cardValues = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

export default function App() {
	// Stato delle carte girate - segno in un array gli indici delle carte che giro
	const [flippedIndexes, setFlippedIndexes] = useState([]); // inizializzato come array vuoto

	// Stato per bloccare la board
	const [lockBoard, setLockBoard] = useState(false);

	// Funzione per gestire il flip della carta
	function handleFlip(index) {
		if (lockBoard) return;
		if (flippedIndexes.includes(index)) return;

		// Flippa la carta
		setFlippedIndexes((prev) => [...prev, index]); // aggiorna l'array prev aggiungendo index, ovvero l'elemento corrente
		checkForMatch();
	}

	function checkForMatch() {}
	// Render della singola carta
	function Item({ icon, index, flipped, onFlip }) {
		return (
			<Pressable onPress={() => onFlip(index)} disabled={flipped || lockBoard}>
				<View style={[styles.item, flipped && styles.flipped]}>
					<Text
						style={{ fontSize: 36, color: flipped ? "black" : "transparent" }}
					>
						{icon}
					</Text>
				</View>
			</Pressable>
		);
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
			<Text style={styles.paragraph}>Attemps: 0</Text>
			<Button
				title="Restart"
				color="#2196F3"
				onPress={() => {
					setFlippedIndexes([]);
					setLockBoard(false);
				}}
			/>

			<FlatList
				style={{ maxHeight: 500 }}
				data={cardValues}
				renderItem={({ item, index }) => (
					<Item
						icon={item}
						index={index}
						flipped={flippedIndexes.includes(index)}
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
