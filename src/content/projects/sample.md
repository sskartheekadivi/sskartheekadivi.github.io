---
title: "Project Cygnus: A Retro-Futuristic Music Sequencer"
publishDate: 2024-08-15 00:00:00
img: "/assets/stock-4.jpg"
img_alt: "A vibrant, abstract image of sound waves and geometric shapes."
description: |
  A web-based music sequencer that blends the aesthetics of vintage hardware with modern web technologies to create a unique and playful audio experience.
tags:
  - "Web Audio"
  - "Svelte"
  - "UI/UX"
  - "Interactive"
---

## The Vision: A Digital Playground for Sound

Project Cygnus was born from a love for old-school synthesizers and a desire to create a musical tool that was both powerful and fun. The goal was to build a sequencer that felt tactile and immediate, encouraging experimentation and happy accidents.

> We wanted to capture the feeling of twisting knobs and patching cables, but in a digital format that was accessible to everyone, regardless of their musical background.

### Core Features

The sequencer boasts a range of features designed for both beginners and experienced musicians:

*   **Polyphonic Synthesis:** A custom-built synth engine with multiple oscillators, filters, and envelopes.
*   **Step Sequencer:** An intuitive grid-based sequencer for creating patterns and melodies.
*   **Modular Routing:** A virtual patch bay that allows users to connect different modules and create complex signal chains.
*   **Visual Feedback:** Real-time oscilloscopes and spectrum analyzers to visualize the sound.

### The Technology Behind the Music

We chose a modern, reactive tech stack to bring Project Cygnus to life:

| Technology      | Role                    | Reason for Choosing                               |
| --------------- | ----------------------- | ------------------------------------------------- |
| **SvelteKit**   | Application Framework   | Fast, lightweight, and a joy to develop with.     |
| **Web Audio API** | Core Audio Engine     | Provides the low-level control needed for synthesis. |
| **TypeScript**  | Language                | For type safety and a better developer experience. |
| **Figma**       | UI/UX Design            | To prototype and refine the retro-futuristic look. |

Here's a small taste of how we used the Web Audio API to create a simple oscillator:

```javascript
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, duration) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}
```

### Design and Aesthetics

The design was heavily inspired by the brutalist and minimalist aesthetics of 1970s and 80s hardware. We used a limited color palette, chunky knobs, and a clean, grid-based layout to create a user interface that is both visually striking and easy to navigate.

![A close-up shot of a modular synthesizer with many patch cables.](/assets/stock-1.jpg)
*Inspiration for the modular routing system in Project Cygnus.*

### Challenges and Future Plans

One of the biggest challenges was managing the complexity of the audio graph in a way that was both performant and easy to reason about. We ended up creating our own state management system to handle the audio node connections and disconnections.

For the future, we plan to add:

1.  **MIDI support:** To allow users to connect external keyboards and controllers.
2.  **Sample loading:** So users can import their own sounds.
3.  **A community preset library:** For sharing and discovering new sounds and patterns.
