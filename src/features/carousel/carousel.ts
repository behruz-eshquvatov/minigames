import './carousel.scss';
import sliderCard1 from '../../assets/images/slider-card1.jpg';
import sliderCard2 from '../../assets/images/slider-card2.jpg';
import sliderCard3 from '../../assets/images/slider-card3.jpg';
import sliderCard4 from '../../assets/images/slider-card4.jpg';
import sliderCard5 from '../../assets/images/slider-card5.jpg';
import starIcon from '../../assets/icons/star.svg';
import favoriteIcon from '../../assets/icons/favorite.svg';
import arrow_back from '../../assets/icons/arrow_back.svg';

export interface CarouselGame {
  title: string;
  rating: number;
  likes: string;
  image: string;
  widthType: 'normal' | 'wide' | 'narrow';
}

export class Carousel {
  private element: HTMLElement;

  public constructor() {
    this.element = this.createCarouselElement();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private createCarouselElement(): HTMLElement {
    const section: HTMLElement = document.createElement('section');
    section.className = 'carousel-section';

    const games: CarouselGame[] = [
      {
        title: 'Tailside: Cozy Cafe Sim',
        rating: 4.8,
        likes: '18.4K',
        image: sliderCard3,
        widthType: 'narrow',
      },
      {
        title: 'ISLANDERS: New Shores',
        rating: 4.9,
        likes: '54.2K',
        image: sliderCard2,
        widthType: 'normal',
      },
      {
        title: 'Vacation Cafe Simulator',
        rating: 4.8,
        likes: '28.7K',
        image: sliderCard1,
        widthType: 'wide',
      },
      {
        title: 'Winter Burrow',
        rating: 4.9,
        likes: '32.4K',
        image: sliderCard4,
        widthType: 'normal',
      },
      {
        title: 'Shelve the Potions!',
        rating: 4.7,
        likes: '21.3K',
        image: sliderCard5,
        widthType: 'narrow',
      },
    ];

    section.innerHTML = `
      <div class="carousel-section__container">
        <div class="carousel-section__header">
          <h2 class="carousel-section__title">
            <span class="carousel-section__title-pill"></span>
            New Games
          </h2>
          <div class="carousel-section__controls">
            <button type="button" class="carousel-section__control-btn carousel-section__control-btn--prev" aria-label="Previous slide">
              <img src='${arrow_back}' alt='Previous' />
            </button>
            <button type="button" class="carousel-section__control-btn carousel-section__control-btn--next" aria-label="Next slide">
              <img src='${arrow_back}' alt='Next' />
            </button>
          </div>
        </div>

        <div class="carousel-section__track-wrapper">
          <div class="carousel-section__track"></div>
        </div>
      </div>
    `;

    const widthTypes: ('narrow' | 'normal' | 'wide')[] = [
      'narrow',
      'normal',
      'wide',
      'normal',
      'narrow',
    ];

    const renderTrack = (): void => {
      const track: HTMLElement | null = section.querySelector('.carousel-section__track');
      if (!track) {
        return;
      }
      track.innerHTML = games
        .map((game: CarouselGame, index: number): string => {
          const widthType = widthTypes[index] || 'normal';
          return `
              <div class="game-card game-card--${widthType}" tabindex="0" role="group" aria-label="${game.title}">
                <img src="${game.image}" alt="${game.title}" class="game-card__image" />
                <div class="game-card__overlay">
                  <div class="game-card__info">
                    <h3 class="game-card__title">${game.title}</h3>
                    <div class="game-card__meta">
                      <span class="game-card__rating">
                        <img src="${starIcon}" alt="Rating star" class="game-card__star-icon" width="24" height="24" />
                        ${game.rating}
                      </span>
                      <span class="game-card__likes">
                        <img src="${favoriteIcon}" alt="Favorite heart" class="game-card__like-icon" width="24" height="24" />
                        ${game.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            `;
        })
        .join('');
    };

    renderTrack();

    const prevBtn: HTMLButtonElement | null = section.querySelector(
      '.carousel-section__control-btn--prev'
    );
    const nextBtn: HTMLButtonElement | null = section.querySelector(
      '.carousel-section__control-btn--next'
    );

    if (prevBtn) {
      prevBtn.addEventListener('click', (): void => {
        const last = games.pop();
        if (last) {
          games.unshift(last);
          renderTrack();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (): void => {
        const first = games.shift();
        if (first) {
          games.push(first);
          renderTrack();
        }
      });
    }

    return section;
  }
}
