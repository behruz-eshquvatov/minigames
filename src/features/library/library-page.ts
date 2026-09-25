import './library-page.scss';
import arrowBackIcon from '../../assets/icons/arrow_back.svg';
import favoriteIcon from '../../assets/icons/favorite.svg';
import starIcon from '../../assets/icons/star.svg';
import allGamesRaw from '../../tasks/mock-data/all-games-seed.json';
import categoriesRaw from '../../tasks/mock-data/categories.json';

const gameImageModules = import.meta.glob<{ default: string }>(
  '../../assets/images/games/*-card.jpg',
  { eager: true }
);

export interface GameItem {
  slug: string;
  name: string;
  category: string;
  price: string;
  shortDescription: string;
  rating: number;
  likesCount: number;
  cardImage: string;
  featured: boolean;
}

export interface LibraryPageCallbacks {
  onGameDetailsClick?: (game: GameItem) => void;
}

export class LibraryPage {
  private element: HTMLElement;
  private games: GameItem[];
  private activeCategory = 'all';
  private activeSort = 'Rating ↓';
  private currentPage = 1;
  private itemsPerPage = 6;
  private totalPages = 4;
  private isSortOpen = false;
  private callbacks: LibraryPageCallbacks;

  public constructor(callbacks: LibraryPageCallbacks = {}) {
    this.callbacks = callbacks;
    this.games = allGamesRaw.data;
    this.element = this.createPageElement();
    this.renderCards();
    this.setupInteractivity();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private getGameImageUrl(slug: string): string {
    const key = `../../assets/images/games/${slug}-card.jpg`;
    if (gameImageModules[key]) {
      return gameImageModules[key].default;
    }
    return '';
  }

  private formatLikes(count: number): string {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  }

  private createPageElement(): HTMLElement {
    const page: HTMLElement = document.createElement('div');
    page.className = 'library-page';

    const categories = categoriesRaw.data;
    const sortOptions = ['Rating ↓', 'Rating ↑', 'Popular', 'Newest', 'Price'];

    page.innerHTML = `
      <!-- Library Header: Title & Subtitle -->
      <header class="library-header">
        <h1 class="library-header__title">Game Library</h1>
        <p class="library-header__subtitle">Browse our collection of casual mini-games</p>
      </header>

      <!-- Filtering & Sorting Bar -->
      <section class="library-filter-section" aria-label="Game filters and sorting">
        <div class="library-filter-section__controls-row">
          <div class="library-filter-section__chips-wrapper" tabindex="0" role="region" aria-label="Categories">
            <div class="library-filter-section__chips-row" role="tablist">
              ${categories
                .map(
                  (cat): string => `
                <button
                  type="button"
                  class="library-filter-section__chip ${
                    cat.slug === this.activeCategory ? 'library-filter-section__chip--active' : ''
                  }"
                  data-category="${cat.slug}"
                  role="tab"
                  aria-selected="${cat.slug === this.activeCategory}"
                >
                  ${cat.label}
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <div class="library-filter-section__sort-container">
            <button type="button" class="library-filter-section__sort-btn" aria-haspopup="listbox" aria-expanded="false">
              <span>Sort by: <strong class="sort-current-label">${this.activeSort}</strong></span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <ul class="library-filter-section__sort-dropdown" role="listbox">
              ${sortOptions
                .map(
                  (opt): string => `
                <li class="library-filter-section__sort-item ${
                  opt === this.activeSort ? 'library-filter-section__sort-item--active' : ''
                }" role="option" data-sort="${opt}">
                  ${opt}
                </li>
              `
                )
                .join('')}
            </ul>
          </div>
        </div>
      </section>

      <!-- Game Cards Grid Section -->
      <section class="library-grid-section" aria-label="Games list">
        <div class="library-grid-section__grid"></div>
      </section>

      <!-- Pagination Section -->
      <nav class="library-pagination" aria-label="Library pagination">
        <button
          type="button"
          class="library-pagination__arrow-btn library-pagination__arrow-btn--prev"
          aria-label="Previous page"
          disabled
        >
          <img src="${arrowBackIcon}" alt="Previous" />
        </button>

        <ul class="library-pagination__pages-list">
          <li>
            <button type="button" class="library-pagination__page-btn library-pagination__page-btn--active" data-page="1">1</button>
          </li>
          <li>
            <button type="button" class="library-pagination__page-btn" data-page="2">2</button>
          </li>
          <li>
            <button type="button" class="library-pagination__page-btn" data-page="3">3</button>
          </li>
          <li>
            <button type="button" class="library-pagination__page-btn library-pagination__page-btn--desktop-only" data-page="4">4</button>
          </li>
        </ul>

        <button
          type="button"
          class="library-pagination__arrow-btn library-pagination__arrow-btn--next"
          aria-label="Next page"
        >
          <img src="${arrowBackIcon}" alt="Next" />
        </button>
      </nav>
    `;

    return page;
  }

  private renderCards(): void {
    const grid = this.element.querySelector('.library-grid-section__grid');
    if (!grid) {
      return;
    }

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const pageGames = this.games.slice(start, start + this.itemsPerPage);

    grid.innerHTML = pageGames
      .map((game): string => {
        const imgUrl = this.getGameImageUrl(game.slug);
        const formattedLikes = this.formatLikes(game.likesCount);

        return `
        <article class="library-card" data-slug="${game.slug}">
          <div class="library-card__thumb-wrap">
            <img src="${imgUrl}" alt="${game.name}" class="library-card__image" loading="lazy" />
          </div>
          <div class="library-card__body">
            <div class="library-card__top-row">
              <div class="library-card__title-group">
                <h2 class="library-card__title">${game.name}</h2>
                <span class="library-card__category">${game.category}</span>
              </div>
              <span class="library-card__price ${
                game.price === 'Free' ? '' : 'library-card__price--paid'
              }">${game.price}</span>
            </div>

            <p class="library-card__description">${game.shortDescription}</p>

            <div class="library-card__bottom-row">
              <div class="library-card__stats">
                <span class="library-card__rating">
                  <img src="${starIcon}" alt="Star" />
                  ${game.rating}
                </span>
                <span class="library-card__likes">
                  <img src="${favoriteIcon}" alt="Likes" />
                  ${formattedLikes}
                </span>
              </div>
              <button type="button" class="library-card__details-btn" data-slug="${game.slug}">Details</button>
            </div>
          </div>
        </article>
      `;
      })
      .join('');

    // Attach Details button clicks
    const detailButtons = grid.querySelectorAll<HTMLButtonElement>('.library-card__details-btn');
    for (const btn of detailButtons) {
      btn.addEventListener('click', (): void => {
        const slug = btn.dataset.slug;
        const game = this.games.find((g): boolean => g.slug === slug);
        if (game) {
          this.callbacks.onGameDetailsClick?.(game);
        }
      });
    }
  }

  private setupInteractivity(): void {
    // 1. Filtering Chips
    const chips = this.element.querySelectorAll<HTMLButtonElement>('.library-filter-section__chip');
    for (const chip of chips) {
      chip.addEventListener('click', (): void => {
        const cat = chip.dataset.category;
        if (!cat) {
          return;
        }
        this.activeCategory = cat;
        for (const c of chips) {
          const isActive = c.dataset.category === cat;
          c.classList.toggle('library-filter-section__chip--active', isActive);
          c.setAttribute('aria-selected', isActive.toString());
        }
      });
    }

    // Horizontal drag for chips wrapper
    const chipsWrapper = this.element.querySelector<HTMLElement>(
      '.library-filter-section__chips-wrapper'
    );
    if (chipsWrapper) {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      chipsWrapper.addEventListener('mousedown', (e: MouseEvent): void => {
        isDown = true;
        startX = e.pageX - chipsWrapper.offsetLeft;
        scrollLeft = chipsWrapper.scrollLeft;
      });

      chipsWrapper.addEventListener('mouseleave', (): void => {
        isDown = false;
      });

      chipsWrapper.addEventListener('mouseup', (): void => {
        isDown = false;
      });

      chipsWrapper.addEventListener('mousemove', (e: MouseEvent): void => {
        if (!isDown) {
          return;
        }
        e.preventDefault();
        const x = e.pageX - chipsWrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        chipsWrapper.scrollLeft = scrollLeft - walk;
      });
    }

    // 2. Sort Dropdown
    const sortBtn = this.element.querySelector<HTMLButtonElement>(
      '.library-filter-section__sort-btn'
    );
    const sortDropdown = this.element.querySelector<HTMLUListElement>(
      '.library-filter-section__sort-dropdown'
    );
    const sortItems = this.element.querySelectorAll<HTMLLIElement>(
      '.library-filter-section__sort-item'
    );
    const sortLabel = this.element.querySelector<HTMLElement>('.sort-current-label');

    if (sortBtn && sortDropdown) {
      sortBtn.addEventListener('click', (e: MouseEvent): void => {
        e.stopPropagation();
        this.isSortOpen = !this.isSortOpen;
        sortBtn.classList.toggle('library-filter-section__sort-btn--open', this.isSortOpen);
        sortDropdown.classList.toggle(
          'library-filter-section__sort-dropdown--open',
          this.isSortOpen
        );
        sortBtn.setAttribute('aria-expanded', this.isSortOpen.toString());
      });

      for (const item of sortItems) {
        item.addEventListener('click', (): void => {
          const val = item.dataset.sort;
          if (!val) {
            return;
          }
          this.activeSort = val;
          if (sortLabel) {
            sortLabel.textContent = val;
          }
          for (const s of sortItems) {
            s.classList.toggle('library-filter-section__sort-item--active', s.dataset.sort === val);
          }
          this.isSortOpen = false;
          sortBtn.classList.remove('library-filter-section__sort-btn--open');
          sortDropdown.classList.remove('library-filter-section__sort-dropdown--open');
          sortBtn.setAttribute('aria-expanded', 'false');
        });
      }

      document.addEventListener('click', (e: MouseEvent): void => {
        if (!this.element.contains(e.target as Node)) {
          this.isSortOpen = false;
          sortBtn.classList.remove('library-filter-section__sort-btn--open');
          sortDropdown.classList.remove('library-filter-section__sort-dropdown--open');
          sortBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // 3. Pagination
    const prevArrow = this.element.querySelector<HTMLButtonElement>(
      '.library-pagination__arrow-btn--prev'
    );
    const nextArrow = this.element.querySelector<HTMLButtonElement>(
      '.library-pagination__arrow-btn--next'
    );
    const pageButtons = this.element.querySelectorAll<HTMLButtonElement>(
      '.library-pagination__page-btn'
    );

    const updatePagination = (page: number): void => {
      this.currentPage = page;
      if (prevArrow) {
        prevArrow.disabled = this.currentPage === 1;
      }
      if (nextArrow) {
        nextArrow.disabled = this.currentPage === this.totalPages;
      }
      for (const btn of pageButtons) {
        const p = Number(btn.dataset.page);
        btn.classList.toggle('library-pagination__page-btn--active', p === page);
      }
      this.renderCards();
    };

    for (const btn of pageButtons) {
      btn.addEventListener('click', (): void => {
        const p = Number(btn.dataset.page);
        if (p) {
          updatePagination(p);
        }
      });
    }

    if (prevArrow) {
      prevArrow.addEventListener('click', (): void => {
        if (this.currentPage > 1) {
          updatePagination(this.currentPage - 1);
        }
      });
    }

    if (nextArrow) {
      nextArrow.addEventListener('click', (): void => {
        if (this.currentPage < this.totalPages) {
          updatePagination(this.currentPage + 1);
        }
      });
    }
  }
}
