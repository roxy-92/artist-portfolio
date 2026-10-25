
import { Component, signal, computed } from '@angular/core';

// Artwork data structure
interface Artwork {
  id: number;
  title: string;
  image: string;
  category: 'manga' | 'illustration';
}

@Component({
  selector: 'app-portfolio',
  imports: [],
  styleUrl: './portfolio.scss',
  templateUrl: './portfolio.html',
})
export class Portfolio {

  // Artwork collection
  artworks: Artwork[] = [
    ...Array.from({ length: 13 }, (_, index) => ({
      id: index + 1,
      title: `Manga ${index + 1}`,
      image: `images/portfolio/manga (${index + 1}).jpg`,
      category: 'manga' as const,
    })),

    ...Array.from({ length: 8 }, (_, index) => ({
      id: index + 14,
      title: `Illustration ${index + 1}`,
      image: `images/portfolio/manga (${index + 1}).jpg`,
      category: 'illustration' as const,
    })),

    {
      id: 22,
      title: 'Between Panels',
      image: 'images/portfolio/between_panels_wallpaper.png',
      category: 'illustration',
    },
  ];

  // Selected gallery category
  selectedCategory = signal<'all' | 'manga' | 'illustration'>('all');

  // Filter artwork by category
  filteredArtworks = computed(() => {
    const category = this.selectedCategory();

    if (category === 'all') {
      return this.artworks;
    }

    return this.artworks.filter(
      artwork => artwork.category === category
    );
  });

  // Change selected category
  setCategory(category: 'all' | 'manga' | 'illustration') {
    this.selectedCategory.set(category);
  }
}
