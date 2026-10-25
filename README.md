# Artist Portfolio: High-Performance Visual Media Showcase

A high-performance, media-centric Angular frontend application engineered specifically to display sequential art, comics, and illustrations. Designed as an architectural prototype demonstrating zero-runtime-cost static hosting, browser-native canvas manipulation, and advanced layout rendering without heavy external gallery libraries.

---

## Technical Highlights & Architecture

* **Framework Core**: Angular (latest standalone architecture), TypeScript (strict mode enabled), SCSS.
* **State Management**: Reactive state isolation via Angular Signals (`signal`, `computed`, `effect`), eliminating unnecessary zone re-renders.
* **Zero Cumulative Layout Shift (CLS)**: Dynamic CSS `aspect-ratio` bounding boxes pre-calculated at the data layer to preserve exact rendering coordinates prior to image network delivery.
* **Responsive Asset Pipeline**: High-density display targeting utilizing `<picture>` and `srcset` for AVIF and WebP delivery, backed by native asynchronous decoding (`decoding="async"`) and lazy loading (`loading="lazy"`).
* **Native Canvas Pixel Sampling**: Offscreen HTML5 Canvas execution (`getImageData`) to dynamically extract dominant and accent color palettes from active visual assets, binding them directly to root CSS custom properties for ambient UI theming.
* **Hardware-Accelerated View Engines**:
  * **Masonry Mode**: Responsive multi-column layout engine reflowing dynamically across breakpoints without column gaps or image clipping.
  * **Dual-Page Spread Reader Mode**: Double-page desktop rendering with seamless single-page mobile fallback, Right-to-Left (RTL) reading toggle for manga formats, and native keyboard navigation listeners.
  * **Webtoon Infinite Scroll Mode**: High-framerate vertical strip rendering designed for continuous sequential storytelling with optimized viewport memory management.
  * **Lightroom Detail Modal**: Interactive canvas/matrix transform viewer supporting wheel zoom, click-drag panning, and mobile touch gestures.

---

## Component Architecture & Hierarchy

The application strictly separates presentational components, business state, and browser-level integrations:

```text
src/app/
├── core/
│   ├── constants/             # Immutable configuration and static datasets
│   ├── models/                # Domain types (Artwork, LayoutMode, ExtractedPalette)
│   └── services/              # Global signal stores and Canvas extraction engines
├── features/
│   ├── comic-spread/          # Dual-page RTL/LTR reading engine
│   ├── gallery/               # Masonry layout, category filters, and mode toggles
│   ├── lightroom/             # Pan/zoom modal inspection layer
│   └── webtoon/               # Vertical continuous strip reader
└── shared/
    └── components/
        ├── artwork-card/      # Zero-CLS media unit with LQIP placeholder
        └── palette-glow/      # Ambient background lighting provider