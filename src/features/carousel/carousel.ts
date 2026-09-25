import './carousel.scss';
import arrow_back from '../../assets/icons/arrow_back.svg';
import favoriteIcon from '../../assets/icons/favorite.svg';
import starIcon from '../../assets/icons/star.svg';

import catMailCoImg from '../../assets/images/games/cat-mail-co-card.jpg';
import heartopiaImg from '../../assets/images/games/heartopia-card.jpg';
import islandersImg from '../../assets/images/games/islanders-new-shores-card.jpg';
import paliaImg from '../../assets/images/games/palia-card.jpg';
import shelvePotionsImg from '../../assets/images/games/shelve-the-potions-card.jpg';
import tailsideImg from '../../assets/images/games/tailside-cozy-cafe-sim-card.jpg';
import tinyGladeImg from '../../assets/images/games/tiny-glade-card.jpg';
import vacationCafeImg from '../../assets/images/games/vacation-cafe-simulator-card.jpg';
import winterBurrowImg from '../../assets/images/games/winter-burrow-card.jpg';

export interface FeaturedGame {
  slug: string;
  name: string;
  rating: number;
  likesCount: number;
  likesFormatted: string;
  cardImage: string;
}

export interface CarouselCallbacks {
  onGameClick?: (game: FeaturedGame) => void;
}

export class Carousel {
  private element: HTMLElement;
  private games: FeaturedGame[] = [
    {
      slug: 'vacation-cafe-simulator',
      name: 'Vacation Cafe Simulator',
      rating: 4.8,
      likesCount: 28_750,
      likesFormatted: '28.7K',
      cardImage: vacationCafeImg,
    },
    {
      slug: 'winter-burrow',
      name: 'Winter Burrow',
      rating: 4.9,
      likesCount: 32_400,
      likesFormatted: '32.4K',
      cardImage: winterBurrowImg,
    },
    {
      slug: 'shelve-the-potions',
      name: 'Shelve the Potions!',
      rating: 4.7,
      likesCount: 21_300,
      likesFormatted: '21.3K',
      cardImage: shelvePotionsImg,
    },
    {
      slug: 'heartopia',
      name: 'Heartopia',
      rating: 4.6,
      likesCount: 46_800,
      likesFormatted: '46.8K',
      cardImage: heartopiaImg,
    },
    {
      slug: 'palia',
      name: 'Palia',
      rating: 4.9,
      likesCount: 42_100,
      likesFormatted: '42.1K',
      cardImage: paliaImg,
    },
    {
      slug: 'cat-mail-co',
      name: 'Cat Mail Co.',
      rating: 4.8,
      likesCount: 38_900,
      likesFormatted: '38.9K',
      cardImage: catMailCoImg,
    },
    {
      slug: 'tiny-glade',
      name: 'Tiny Glade',
      rating: 4.9,
      likesCount: 51_200,
      likesFormatted: '51.2K',
      cardImage: tinyGladeImg,
    },
    {
      slug: 'tailside-cozy-cafe-sim',
      name: 'Tailside: Cozy Cafe Sim',
      rating: 4.8,
      likesCount: 18_400,
      likesFormatted: '18.4K',
      cardImage: tailsideImg,
    },
    {
      slug: 'islanders-new-shores',
      name: 'ISLANDERS: New Shores',
      rating: 4.9,
      likesCount: 54_200,
      likesFormatted: '54.2K',
      cardImage: islandersImg,
    },
  ];

  private centerIndex = 0;
  private autoplayTimer: ReturnType<typeof setInterval> | undefined;
  private callbacks: CarouselCallbacks;

  private startX = 0;
  private isSwiping = false;

  public constructor(callbacks: CarouselCallbacks = {}) {
    this.callbacks = callbacks;
    this.element = this.createCarouselElement();
    this.renderTrack();
    this.setupControls();
    this.startAutoplay();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private createCarouselElement(): HTMLElement {
    const section: HTMLElement = document.createElement('section');
    section.className = 'carousel-section';

    section.innerHTML = `
      <div class="carousel-section__container">
        <div class="carousel-section__header">
          <h2 class="carousel-section__title">
            <span class="carousel-section__title-pill"></span>
            New Games
          </h2>
          <div class="carousel-section__controls">
            <button type="button" class="carousel-section__control-btn carousel-section__control-btn--prev" aria-label="Previous slide">
              <img src="${arrow_back}" alt="Previous" />
            </button>
            <button type="button" class="carousel-section__control-btn carousel-section__control-btn--next" aria-label="Next slide">
              <img src="${arrow_back}" alt="Next" />
            </button>
          </div>
        </div>

        <div class="carousel-section__track-wrapper">
          <div class="carousel-section__track"></div>
        </div>
      </div>
    `;

    return section;
  }

  private getVisibleGames(): { game: FeaturedGame; widthType: 'narrow' | 'normal' | 'wide' }[] {
    const total = this.games.length;
    // Slots: -2 (narrow), -1 (normal), 0 (wide), +1 (normal), +2 (narrow)
    const slotConfigs: ('narrow' | 'normal' | 'wide')[] = [
      'narrow',
      'normal',
      'wide',
      'normal',
      'narrow',
    ];

    return slotConfigs.map(
      (widthType, slotOffset): { game: FeaturedGame; widthType: 'narrow' | 'normal' | 'wide' } => {
        const offsetIndex = (this.centerIndex + (slotOffset - 2) + total * 10) % total;
        return {
          game: this.games[offsetIndex],
          widthType,
        };
      }
    );
  }

  private renderTrack(): void {
    const track = this.element.querySelector('.carousel-section__track');
    if (!track) {
      return;
    }

    const visibleItems = this.getVisibleGames();

    track.innerHTML = visibleItems
      .map(
        (item): string => `
      <div class="game-card game-card--${item.widthType}" tabindex="0" role="button" aria-label="${item.game.name}" data-slug="${item.game.slug}">
        <img src="${item.game.cardImage}" alt="${item.game.name}" class="game-card__image" />
        <div class="game-card__overlay">
          <div class="game-card__info">
            <h3 class="game-card__title">${item.game.name}</h3>
            <div class="game-card__meta">
              <span class="game-card__rating">
                <img src="${starIcon}" alt="Star" class="game-card__star-icon" width="20" height="20" />
                ${item.game.rating}
              </span>
              <span class="game-card__likes">
                <img src="${favoriteIcon}" alt="Likes" class="game-card__like-icon" width="20" height="20" />
                ${item.game.likesFormatted}
              </span>
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    // Attach card click handlers (opens Game Details dialog)
    const cards = track.querySelectorAll<HTMLElement>('.game-card');
    for (const card of cards) {
      const slug = card.dataset.slug;
      const game = this.games.find((g): boolean => g.slug === slug);
      if (game) {
        card.addEventListener('click', (): void => {
          this.callbacks.onGameClick?.(game);
        });
        card.addEventListener('keydown', (e: KeyboardEvent): void => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.callbacks.onGameClick?.(game);
          }
        });
      }
    }

    this.checkCardWidthThresholds();
  }

  // Cards with rendered width < 288px hide the overlay per acceptance criteria
  private checkCardWidthThresholds(): void {
    const track = this.element.querySelector('.carousel-section__track');
    if (!track) {
      return;
    }
    const cards = track.querySelectorAll<HTMLElement>('.game-card');
    for (const card of cards) {
      const overlay = card.querySelector<HTMLElement>('.game-card__overlay');
      if (overlay) {
        const width = card.getBoundingClientRect().width;
        if (width > 0 && width < 288) {
          overlay.style.display = 'none';
        } else if (width >= 288) {
          overlay.style.display = '';
        }
      }
    }
  }

  public next(): void {
    this.centerIndex = (this.centerIndex + 1) % this.games.length;
    this.renderTrack();
  }

  public prev(): void {
    this.centerIndex = (this.centerIndex - 1 + this.games.length) % this.games.length;
    this.renderTrack();
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = setInterval((): void => {
      this.next();
    }, 4000);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer !== undefined) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
  }

  private resetAutoplay(): void {
    this.startAutoplay();
  }

  private setupControls(): void {
    const prevBtn = this.element.querySelector<HTMLButtonElement>(
      '.carousel-section__control-btn--prev'
    );
    const nextBtn = this.element.querySelector<HTMLButtonElement>(
      '.carousel-section__control-btn--next'
    );

    if (prevBtn) {
      prevBtn.addEventListener('click', (): void => {
        this.prev();
        this.resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (): void => {
        this.next();
        this.resetAutoplay();
      });
    }

    const trackWrapper = this.element.querySelector<HTMLElement>(
      '.carousel-section__track-wrapper'
    );

    if (trackWrapper) {
      // Pause autoplay on mouse enter / press and hold
      trackWrapper.addEventListener('pointerdown', (e: PointerEvent): void => {
        this.startX = e.clientX;
        this.isSwiping = true;
        this.stopAutoplay();
      });

      trackWrapper.addEventListener('pointerup', (e: PointerEvent): void => {
        if (!this.isSwiping) {
          return;
        }
        this.isSwiping = false;
        const deltaX = e.clientX - this.startX;

        if (Math.abs(deltaX) > 40) {
          if (deltaX < 0) {
            this.next();
          } else {
            this.prev();
          }
          this.resetAutoplay();
        } else {
          // No swipe occurred, simply resume remaining autoplay
          this.startAutoplay();
        }
      });

      trackWrapper.addEventListener('pointercancel', (): void => {
        this.isSwiping = false;
        this.startAutoplay();
      });

      trackWrapper.addEventListener('mouseenter', (): void => {
        this.stopAutoplay();
      });

      trackWrapper.addEventListener('mouseleave', (): void => {
        this.isSwiping = false;
        this.startAutoplay();
      });
    }

    window.addEventListener('resize', (): void => {
      this.checkCardWidthThresholds();
    });
  }

  public destroy(): void {
    this.stopAutoplay();
  }
}
