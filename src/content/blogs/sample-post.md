---
title: "Unveiling Project Stardust: A Journey into Imaginary Realms"
publishDate: "2025-10-15 00:00:00"
img: "/assets/stock-2.jpg"
img_alt: "Abstract image of swirling colors and shapes."
description: "A deep dive into the creation of a generative art project using Rust, WebAssembly, and Three.js."
tags: ["creative-coding", "generative-art", "web-assembly", "performance"]
---

### The Genesis of Stardust

Project Stardust began as a simple experiment: could we generate a universe from a single line of code? This post explores the technical and creative journey behind this ambitious generative art project.

### The Challenge: From Chaos to Cosmos

Our primary challenge was to create a system that felt both chaotic and ordered, much like the universe itself. We explored various algorithms, from cellular automata to fractal noise, before settling on a custom physics engine written in Rust and compiled to WebAssembly.

> The core of Stardust is a particle simulation where each particle's behavior is governed by a set of "cosmic laws" we defined. The interplay of these laws creates the emergent complexity you see.

### A Glimpse Under the Hood

The tech stack for Project Stardust is as unique as the visuals it produces:

-   **Rust:** For the core physics and generation engine.
-   **WebAssembly (WASM):** To run the Rust code at near-native speed in the browser.
-   **Three.js:** For rendering the 3D visuals and handling the camera.
-   **Astro:** For the static site that hosts the project.

Here’s a simplified look at how a "cosmic law" is defined in our Rust engine:

```rust
// A simplified example of a gravity-like force
fn apply_gravity(particle: &mut Particle, other: &Particle) {
    let distance = particle.pos.distance_to(other.pos);
    if distance > 0.0 {
        let force = G * (particle.mass * other.mass) / (distance * distance);
        let direction = (other.pos - particle.pos).normalize();
        particle.apply_force(direction * force);
    }
}
```

### Visualizing the Universe

Rendering millions of particles in real-time was a major hurdle. We used a combination of instanced rendering and custom shaders in Three.js to achieve smooth performance.

![A beautiful, abstract, colorful, and vibrant image of a nebula.](/assets/stock-3.jpg)
*An early render from the Stardust engine, showcasing a "nebula" formation.*

### Lessons Learned

1.  **Performance is Key:** WASM was a game-changer, but careful optimization was still necessary.
2.  **Emergence is Beautiful:** The most stunning visuals were often the result of unexpected interactions between simple rules.
3.  **The Browser is a Powerful Canvas:** Modern web technologies are capable of incredible things.

Project Stardust is a testament to the power of creative coding. It's a reminder that sometimes, the most beautiful things are born from a little bit of chaos and a lot of imagination.
