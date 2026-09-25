import './game-details-dialog.scss';
import tukoniHero from '../../assets/images/games/tukoni-forest-keepers-hero.jpg';
import starIcon from '../../assets/icons/star.svg';
import favoriteIcon from '../../assets/icons/favorite.svg';
import gameDataRaw from '../../tasks/mock-data/game-tukoni-forest-keepers.json';
import commentsDataRaw from '../../tasks/mock-data/comments-tukoni-forest-keepers.json';

interface SpecInfo {
  genre: string;
  players: string;
  duration: string;
  price: string;
}

interface TopRecord {
  position: number;
  playerName: string;
  score: number;
  achievedAt: string;
}

interface GameDetailInfo {
  slug: string;
  name: string;
  heroImage: string;
  rating: number;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  fullDescription: string;
  specs: SpecInfo;
  topRecords: TopRecord[];
}

interface CommentInfo {
  commentId: string;
  authorName: string;
  text: string;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  createdAt: string;
}

export class GameDetailsDialog {
  private backdropElement: HTMLElement;
  private dialogElement: HTMLElement;
  private isFavorite = false;
  private commentLikes: Map<string, { count: number; active: boolean }> = new Map();
  private textareaElement: HTMLTextAreaElement | undefined;
  private favoriteBtnElement: HTMLButtonElement | undefined;

  public constructor() {
    this.backdropElement = this.createBackdrop();
    this.dialogElement = this.backdropElement.querySelector('.game-details-dialog') as HTMLElement;
    this.setupListeners();
    document.body.append(this.backdropElement);
  }

  public getElement(): HTMLElement {
    return this.backdropElement;
  }

  public open(): void {
    this.resetTransientState();
    this.backdropElement.classList.add('game-details-backdrop--active');
    this.dialogElement.classList.add('game-details-dialog--active');
    document.body.style.overflow = 'hidden';
  }

  public close(): void {
    this.backdropElement.classList.remove('game-details-backdrop--active');
    this.dialogElement.classList.remove('game-details-dialog--active');
    document.body.style.overflow = '';
  }

  private resetTransientState(): void {
    // 1. Reset Add to Favorites
    this.isFavorite = false;
    if (this.favoriteBtnElement) {
      this.favoriteBtnElement.classList.remove('game-details-dialog__favorite-btn--active');
      const textSpan = this.favoriteBtnElement.querySelector('.fav-btn-text');
      if (textSpan) {
        textSpan.textContent = 'Add to Favorites';
      }
      this.favoriteBtnElement.setAttribute('aria-label', 'Add to Favorites');
    }

    // 2. Reset textarea value & height
    if (this.textareaElement) {
      this.textareaElement.value = '';
      this.textareaElement.style.height = 'auto';
    }

    // 3. Reset comment likes to initial
    const comments: CommentInfo[] = commentsDataRaw.data;
    this.commentLikes.clear();
    for (const comment of comments) {
      this.commentLikes.set(comment.commentId, {
        count: comment.likesCount,
        active: false,
      });
      const btn = this.backdropElement.querySelector(`[data-comment-id="${comment.commentId}"]`);
      if (btn) {
        btn.classList.remove('game-details-dialog__comment-like-btn--active');
        const countSpan = btn.querySelector('.like-count');
        if (countSpan) {
          countSpan.textContent = comment.likesCount.toString();
        }
      }
    }
  }

  private createBackdrop(): HTMLElement {
    const backdrop: HTMLDivElement = document.createElement('div');
    backdrop.className = 'game-details-backdrop';

    const game: GameDetailInfo = gameDataRaw.data;
    const comments: CommentInfo[] = commentsDataRaw.data;

    backdrop.innerHTML = `
      <div class="game-details-dialog" role="dialog" aria-modal="true" aria-labelledby="game-details-title">
        <div class="game-details-dialog__content">
          <!-- Hero Section -->
          <div class="game-details-dialog__hero">
            <img src="${tukoniHero}" alt="${game.name}" class="game-details-dialog__hero-image" />
            <div class="game-details-dialog__hero-overlay"></div>
            <button type="button" class="game-details-dialog__hero-close-btn" aria-label="Close dialog">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="game-details-dialog__body">
            <!-- Info Section -->
            <section class="game-details-dialog__info-section">
              <div class="game-details-dialog__header-meta">
                <h2 id="game-details-title" class="game-details-dialog__title">${game.name}</h2>
                <div class="game-details-dialog__stats">
                  <span class="game-details-dialog__rating">
                    <img src="${starIcon}" alt="Star" />
                    ${game.rating}
                  </span>
                  <span class="game-details-dialog__likes">
                    <img src="${favoriteIcon}" alt="Likes" />
                    ${(game.likesCount / 1000).toFixed(1)}K
                  </span>
                </div>
              </div>

              <div class="game-details-dialog__badges">
                <span class="game-details-dialog__badge">Genre: ${game.specs.genre}</span>
                <span class="game-details-dialog__badge">Players: ${game.specs.players}</span>
                <span class="game-details-dialog__badge">Duration: ${game.specs.duration}</span>
                <span class="game-details-dialog__badge">Price: ${game.specs.price}</span>
              </div>

              <p class="game-details-dialog__description">
                ${game.fullDescription}
              </p>

              <div class="game-details-dialog__actions">
                <button type="button" class="game-details-dialog__play-btn">Play Now</button>
                <button type="button" class="game-details-dialog__favorite-btn" aria-label="Add to Favorites">
                  <svg class="fav-heart-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span class="fav-btn-text">Add to Favorites</span>
                </button>
              </div>
            </section>

            <!-- Top Records Section -->
            <section class="game-details-dialog__records-section">
              <h3 class="game-details-dialog__section-title">Top Records</h3>
              <table class="game-details-dialog__records-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th style="text-align: right;">Score</th>
                  </tr>
                </thead>
                <tbody>
                  ${game.topRecords
                    .map(
                      (record: TopRecord): string => `
                    <tr>
                      <td class="record-rank">${record.position}</td>
                      <td class="record-player">${record.playerName}</td>
                      <td class="record-score">${record.score.toLocaleString()}</td>
                    </tr>
                  `
                    )
                    .join('')}
                </tbody>
              </table>
            </section>

            <!-- Comments Section -->
            <section class="game-details-dialog__comments-section">
              <h3 class="game-details-dialog__section-title">Comments</h3>

              <div class="game-details-dialog__comment-form">
                <textarea
                  class="game-details-dialog__textarea"
                  placeholder="Leave a comment..."
                  rows="1"
                  aria-label="Write a comment"
                ></textarea>
                <button type="button" class="game-details-dialog__submit-comment-btn">Submit</button>
              </div>

              <div class="game-details-dialog__comments-list">
                ${comments
                  .map(
                    (comment: CommentInfo): string => `
                  <article class="game-details-dialog__comment-item">
                    <div class="game-details-dialog__comment-header">
                      <span class="game-details-dialog__comment-author">${comment.authorName}</span>
                      <time class="game-details-dialog__comment-date">${new Date(
                        comment.createdAt
                      ).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}</time>
                    </div>
                    <p class="game-details-dialog__comment-text">${comment.text}</p>
                    <div class="game-details-dialog__comment-footer">
                      <button
                        type="button"
                        class="game-details-dialog__comment-like-btn"
                        data-comment-id="${comment.commentId}"
                        aria-label="Like comment by ${comment.authorName}"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span class="like-count">${comment.likesCount}</span>
                      </button>
                    </div>
                  </article>
                `
                  )
                  .join('')}
              </div>
            </section>
          </div>
        </div>
      </div>
    `;

    return backdrop;
  }

  private setupListeners(): void {
    // Backdrop click dismiss
    this.backdropElement.addEventListener('click', (event: MouseEvent): void => {
      if (event.target === this.backdropElement) {
        this.close();
      }
    });

    // Close button dismiss
    const closeBtn: HTMLButtonElement | null = this.backdropElement.querySelector(
      '.game-details-dialog__hero-close-btn'
    );
    if (closeBtn) {
      closeBtn.addEventListener('click', (): void => {
        this.close();
      });
    }

    // Esc key dismiss
    document.addEventListener('keydown', (event: KeyboardEvent): void => {
      if (
        event.key === 'Escape' &&
        this.backdropElement.classList.contains('game-details-backdrop--active')
      ) {
        this.close();
      }
    });

    // Add to Favorites button toggle
    this.favoriteBtnElement =
      this.backdropElement.querySelector<HTMLButtonElement>('.game-details-dialog__favorite-btn') ??
      undefined;
    if (this.favoriteBtnElement) {
      this.favoriteBtnElement.addEventListener('click', (): void => {
        this.isFavorite = !this.isFavorite;
        this.favoriteBtnElement?.classList.toggle(
          'game-details-dialog__favorite-btn--active',
          this.isFavorite
        );
        const textSpan = this.favoriteBtnElement?.querySelector('.fav-btn-text');
        if (textSpan) {
          textSpan.textContent = this.isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
        }
        this.favoriteBtnElement?.setAttribute(
          'aria-label',
          this.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'
        );
      });
    }

    // Textarea auto-grow up to 88px
    this.textareaElement =
      this.backdropElement.querySelector<HTMLTextAreaElement>('.game-details-dialog__textarea') ??
      undefined;

    if (this.textareaElement) {
      this.textareaElement.addEventListener('input', (): void => {
        if (!this.textareaElement) {
          return;
        }
        this.textareaElement.style.height = 'auto';
        const newHeight: number = Math.min(this.textareaElement.scrollHeight, 88);
        this.textareaElement.style.height = `${newHeight}px`;
      });
    }

    // Comment like buttons
    const likeButtons = this.backdropElement.querySelectorAll<HTMLButtonElement>(
      '.game-details-dialog__comment-like-btn'
    );
    for (const button of likeButtons) {
      const commentId = button.dataset.commentId;
      if (!commentId) {
        continue;
      }
      button.addEventListener('click', (): void => {
        const state = this.commentLikes.get(commentId);
        if (!state) {
          return;
        }
        state.active = !state.active;
        state.count = state.active ? state.count + 1 : state.count - 1;
        button.classList.toggle('game-details-dialog__comment-like-btn--active', state.active);
        const countSpan = button.querySelector('.like-count');
        if (countSpan) {
          countSpan.textContent = state.count.toString();
        }
      });
    }
  }
}
