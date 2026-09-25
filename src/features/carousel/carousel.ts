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
  private hasSwiped = false;
  private isAnimating = false;

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

  private createCardElement(
    game: FeaturedGame,
    widthType: 'narrow' | 'normal' | 'wide'
  ): HTMLElement {
    const card = document.createElement('div');
    card.className = `game-card game-card--${widthType}`;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', game.name);
    card.dataset.slug = game.slug;

    card.innerHTML = `
      <img src="${game.cardImage}" alt="${game.name}" class="game-card__image" />
      <div class="game-card__overlay">
        <div class="game-card__info">
          <h3 class="game-card__title">${game.name}</h3>
          <div class="game-card__meta">
            <span class="game-card__rating">
              <img src="${starIcon}" alt="Star" class="game-card__star-icon" width="20" height="20" />
              ${game.rating}
            </span>
            <span class="game-card__likes">
              <img src="${favoriteIcon}" alt="Likes" class="game-card__like-icon" width="20" height="20" />
              ${game.likesFormatted}
            </span>
          </div>
        </div>
      </div>
    `;

    this.attachCardEvents(card, game);
    return card;
  }

  private attachCardEvents(card: HTMLElement, game: FeaturedGame): void {
    card.addEventListener('click', (): void => {
      if (this.hasSwiped || this.isAnimating) {
        return;
      }
      this.callbacks.onGameClick?.(game);
    });

    card.addEventListener('keydown', (e: KeyboardEvent): void => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (this.isAnimating) {
          return;
        }
        this.callbacks.onGameClick?.(game);
      }
    });
  }

  private renderTrack(): void {
    const track = this.element.querySelector<HTMLElement>('.carousel-section__track');
    if (!track) {
      return;
    }

    track.innerHTML = '';
    const visibleItems = this.getVisibleGames();
    for (const item of visibleItems) {
      track.append(this.createCardElement(item.game, item.widthType));
    }
  }

  public next(): void {
    if (this.isAnimating) {
      return;
    }
    this.slide('next');
  }

  public prev(): void {
    if (this.isAnimating) {
      return;
    }
    this.slide('prev');
  }

  private slide(direction: 'next' | 'prev'): void {
    const track = this.element.querySelector<HTMLElement>('.carousel-section__track');
    if (!track || this.isAnimating) {
      return;
    }

    const cards = [...track.querySelectorAll<HTMLElement>('.game-card')];
    if (cards.length !== 5) {
      this.centerIndex =
        direction === 'next'
          ? (this.centerIndex + 1) % this.games.length
          : (this.centerIndex - 1 + this.games.length) % this.games.length;
      this.renderTrack();
      return;
    }

    this.isAnimating = true;
    const total = this.games.length;

    if (direction === 'next') {
      const nextGame = this.games[(this.centerIndex + 3 + total * 10) % total];
      const incomingCard = this.createCardElement(nextGame, 'narrow');
      incomingCard.classList.add('game-card--collapsed', 'game-card--collapse-right');
      track.append(incomingCard);

      requestAnimationFrame((): void => {
        requestAnimationFrame((): void => {
          // Old leftmost card collapses
          cards[0].classList.add('game-card--collapsed', 'game-card--collapse-left');

          // Transition intermediate card classes
          cards[1].className = 'game-card game-card--narrow';
          cards[2].className = 'game-card game-card--normal';
          cards[3].className = 'game-card game-card--wide';
          cards[4].className = 'game-card game-card--normal';

          // Incoming card expands
          incomingCard.classList.remove('game-card--collapsed', 'game-card--collapse-right');

          setTimeout((): void => {
            cards[0].remove();
            this.centerIndex = (this.centerIndex + 1) % total;
            this.isAnimating = false;
          }, 420);
        });
      });
    } else {
      const prevGame = this.games[(this.centerIndex - 3 + total * 10) % total];
      const incomingCard = this.createCardElement(prevGame, 'narrow');
      incomingCard.classList.add('game-card--collapsed', 'game-card--collapse-left');
      track.prepend(incomingCard);

      requestAnimationFrame((): void => {
        requestAnimationFrame((): void => {
          // Old rightmost card collapses
          cards[4].classList.add('game-card--collapsed', 'game-card--collapse-right');

          // Transition intermediate card classes
          cards[3].className = 'game-card game-card--narrow';
          cards[2].className = 'game-card game-card--normal';
          cards[1].className = 'game-card game-card--wide';
          cards[0].className = 'game-card game-card--normal';

          // Incoming card expands
          incomingCard.classList.remove('game-card--collapsed', 'game-card--collapse-left');

          setTimeout((): void => {
            cards[4].remove();
            this.centerIndex = (this.centerIndex - 1 + total) % total;
            this.isAnimating = false;
          }, 420);
        });
      });
    }
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
        this.hasSwiped = false;
        this.stopAutoplay();
      });

      trackWrapper.addEventListener('pointerup', (e: PointerEvent): void => {
        if (!this.isSwiping) {
          return;
        }
        this.isSwiping = false;
        const deltaX = e.clientX - this.startX;

        if (Math.abs(deltaX) > 40) {
          this.hasSwiped = true;
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
  }

  public destroy(): void {
    this.stopAutoplay();
  }
}
