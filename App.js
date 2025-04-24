import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Dimensions } from 'react-native';

const numColumns = 4;
const allEmojis = [
  "🍎", "🍌", "🍒", "🍇", "🍉", "🍓", "🍍", "🥝",
  "🍑", "🍈", "🍋", "🍊", "🍏", "🍐", "🍅", "🥥"
];

const gridSize = 16;
const emojis = allEmojis.slice(0, gridSize / 2);
const cardValues = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

const Item = ({ icon }) => (
  <View style={styles.item}>
    <Text style={{ fontSize: 36 }}>{icon}</Text>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  memoryCt: {
    alignSelf: 'center', // centra la griglia
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
  button: {
    backgroundColor: "green",
  }
});


export default function App() {
  return (
    <View style={{ backgroundColor: "#FFF7ED", flex: 1, padding: 20 }}>
      <Text style={[styles.title, { fontSize: 30 }]}>Let's play memory!</Text>
      <Text style={[styles.title, { fontSize: 20 }]}>Test your brain ability!</Text>
      <Button title="Restart" style={styles.button} onPress={() => console.log("funziona")} />
      <FlatList
        data={cardValues}
        renderItem={({ item }) => <Item icon={item} />}
        keyExtractor={(_, idx) => idx.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.memoryCt}
        scrollEnabled={false}
      />
    </View>
  );
}
