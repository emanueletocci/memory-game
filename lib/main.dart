import 'package:flutter/material.dart';

// Enrtypoint - prende in input un widget che viene inserito come root nel widget tree
void main() {
  runApp(const MainApp());
}

// root del widget tree
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center, // centra tutto verticalmente
            children: [
              Text('Hello World!'),
              SizedBox(height: 20), // spazio tra testo e immagine
              Image.network(
                'https://images.unsplash.com/photo-1728044849316-b42a4b25e507?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                width: 200,
                height: 200,
              ),
            ],
          ),
        ),
      ),
    );
  }
}