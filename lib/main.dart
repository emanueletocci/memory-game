import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

const int GRID_SIZE = 16;

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: const Color(0xFFF9EFE6),
        body: const SafeArea(
          child: MemoryHomePage(),
        ),
      ),
    );
  }
}

// Stateless homepage: solo composizione dei widget
class MemoryHomePage extends StatelessWidget {
  const MemoryHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: const [
          SizedBox(height: 24),
          Text(
            "Let's play Memory!",
            style: TextStyle(
              fontSize: 36,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 8),
          Text(
            "Test your brain ability!",
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 16),
          AttemptsAndGrid(),
        ],
      ),
    );
  }
}

// Widget che gestisce lo stato dei tentativi e la logica restart
class AttemptsAndGrid extends StatefulWidget {
  const AttemptsAndGrid({super.key});

  @override
  State<AttemptsAndGrid> createState() => _AttemptsAndGridState();
}

class _AttemptsAndGridState extends State<AttemptsAndGrid> {
  int attempts = 0;

  void _incrementAttempts() {
    setState(() {
      attempts++;
    });
  }

  void _restart() {
    setState(() {
      attempts = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          "Attempts: $attempts",
          style: const TextStyle(
            fontSize: 18,
          ),
        ),
        const SizedBox(height: 16),
        ElevatedButton(
          onPressed: _restart,
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(6),
            ),
          ),
          child: const Text(
            "Restart",
            style: TextStyle(fontSize: 18, color: Colors.white),
          ),
        ),
        const SizedBox(height: 32),
        MemoryGrid(onCardTap: _incrementAttempts),
      ],
    );
  }
}

// Widget della griglia delle card, stateless, riceve callback
class MemoryGrid extends StatelessWidget {
  final VoidCallback onCardTap;
  const MemoryGrid({super.key, required this.onCardTap});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 340,
      child: GridView.count(
        crossAxisCount: 4,
        mainAxisSpacing: 16,
        crossAxisSpacing: 16,
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        children: List.generate(GRID_SIZE, (i) {
          return MemoryCard(onTap: onCardTap);
        }),
      ),
    );
  }
}

// Widget della singola card
class MemoryCard extends StatelessWidget {
  final VoidCallback onTap;
  const MemoryCard({super.key, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.orange,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.orange.withOpacity(0.3),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
      ),
    );
  }
}
