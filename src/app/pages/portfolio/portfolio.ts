
import { Component, signal, computed, HostListener } from '@angular/core';
import artworkData from '../../artworks.generated.json';

// Artwork categories
type ArtworkCategory =
  | 'manga'
  | 'illustration'
  | 'character-design'
  | 'background';

// Artwork data structure
interface Artwork {
  id: string;
  title: string;
  image: string;
  category: ArtworkCategory;
}

@Component({
  selector: 'app-portfolio',
  imports: [],
  styleUrl: './portfolio.scss',
  templateUrl: './portfolio.html',
})
export class Portfolio {

  // Automatically generated artwork collection
  artworks: Artwork[] = artworkData as Artwork[];

  // Selected gallery category
  selectedCategory = signal<'all' | ArtworkCategory>('all');

  // Artworks matching the selected category
  filteredArtworks = computed(() => {
    const category = this.selectedCategory();

    if (category === 'all') {
      return this.artworks;
    }

    return this.artworks.filter(
      artwork => artwork.category === category
    );
  });

  // Currently selected artwork in the lightbox
  selectedArtwork = signal<Artwork | null>(null);

  // Change gallery category
  setCategory(category: 'all' | ArtworkCategory) {
    this.selectedCategory.set(category);
  }

  // Open the lightbox
  openLightbox(artwork: Artwork) {
    this.selectedArtwork.set(artwork);
  }

  // Close the lightbox
  closeLightbox() {
    this.selectedArtwork.set(null);
  }

  // Navigate through the filtered artworks
  navigateLightbox(direction: number) {
    const current = this.selectedArtwork();

    if (!current) return;

    const artworks = this.filteredArtworks();

    const currentIndex = artworks.findIndex(
      artwork => artwork.id === current.id
    );

    if (currentIndex === -1) return;

    const nextIndex =
      (currentIndex + direction + artworks.length) % artworks.length;

    this.selectedArtwork.set(artworks[nextIndex]);
  }

  // Keyboard navigation for the lightbox
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.selectedArtwork()) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.navigateLightbox(-1);
        break;

      case 'ArrowRight':
        event.preventDefault();
        this.navigateLightbox(1);
        break;

      case 'Escape':
        this.closeLightbox();
        break;
    }
  }
}
