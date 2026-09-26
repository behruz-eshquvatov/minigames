import './game-details-dialog.scss';
import tukoniHero from '../../assets/images/games/tukoni-forest-keepers-hero.jpg';
import starIcon from '../../assets/icons/star.svg';
import favoriteIcon from '../../assets/icons/favorite.svg';
import gameDataRaw from '../../tasks/mock-data/game-tukoni-forest-keepers.json';
import commentsDataRaw from '../../tasks/mock-data/comments-tukoni-forest-keepers.json';

const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const DAYS_PER_WEEK = 7;
const MS_PER_HOUR = MS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR;

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
  private inputElement: HTMLInputElement | undefined;
  private favoriteBtnElement: HTMLButtonElement | undefined;
  private commentsCount = 0;

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

    // 2. Reset input value
    if (this.inputElement) {
      this.inputElement.value = '';
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

  private formatRelativeTime(dateString: string): string {
    const map: Record<string, string> = {
      '2026-08-28T14:30:00Z': '2 days ago',
      '2026-08-25T09:12:00Z': '5 days ago',
      '2026-08-23T18:45:00Z': '1 week ago',
      '2026-08-30T07:00:00Z': '3 hours ago',
      '2026-08-29T15:30:00Z': '1 day ago',
      '2026-08-27T20:10:00Z': '3 days ago',
    };
    if (map[dateString]) {
      return map[dateString];
    }
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffHours = Math.floor(diffMs / MS_PER_HOUR);
    if (diffHours < 1) {
      return 'Just now';
    }
    if (diffHours < HOURS_PER_DAY) {
      return `${diffHours} hours ago`;
    }
    const diffDays = Math.floor(diffHours / HOURS_PER_DAY);
    if (diffDays === 1) {
      return '1 day ago';
    }
    if (diffDays < DAYS_PER_WEEK) {
      return `${diffDays} days ago`;
    }
    const diffWeeks = Math.floor(diffDays / DAYS_PER_WEEK);
    return diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`;
  }

  private getCommentAvatarBg(authorName: string): string {
    if (authorName.startsWith('Forest')) {
      return '#bce3ff'; // Light blue
    }
    if (authorName.startsWith('Herbal')) {
      return '#ffd02b'; // Yellow
    }
    if (authorName.startsWith('Cottage')) {
      return '#e0eef6'; // Soft grayish blue
    }
    return '#ffd02b'; // Default yellow
  }

  private createBackdrop(): HTMLElement {
    const backdrop: HTMLDivElement = document.createElement('div');
    backdrop.className = 'game-details-backdrop';

    const game: GameDetailInfo = gameDataRaw.data;
    const comments: CommentInfo[] = commentsDataRaw.data;
    this.commentsCount = comments.length;

    backdrop.innerHTML = `
      <div class="game-details-dialog" role="dialog" aria-modal="true" aria-labelledby="game-details-title">
        <div class="game-details-dialog__content">
          <!-- Hero Section -->
          <div class="game-details-dialog__hero">
            <img src="${tukoniHero}" alt="${game.name}" class="game-details-dialog__hero-image" />
            <div class="game-details-dialog__hero-overlay"></div>
            <button type="button" class="game-details-dialog__hero-close-btn" aria-label="Close dialog">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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

              <!-- Full Description before specs per Figma! -->
              <p class="game-details-dialog__description">
                ${game.fullDescription}
              </p>

              <!-- 4-Card Spec Boxes Grid per Figma! -->
              <div class="game-details-dialog__specs-grid">
                <div class="game-details-dialog__spec-card">
                  <span class="spec-label">Genre</span>
                  <span class="spec-value">${game.specs.genre}</span>
                </div>
                <div class="game-details-dialog__spec-card">
                  <span class="spec-label">Players</span>
                  <span class="spec-value">${game.specs.players}</span>
                </div>
                <div class="game-details-dialog__spec-card">
                  <span class="spec-label">Duration</span>
                  <span class="spec-value">${game.specs.duration}</span>
                </div>
                <div class="game-details-dialog__spec-card">
                  <span class="spec-label">Price</span>
                  <span class="spec-value">${game.specs.price}</span>
                </div>
              </div>

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

            <!-- Top Records Section (With Medals & Relative Dates) -->
            <section class="game-details-dialog__records-section">
              <h3 class="game-details-dialog__section-title">
                <span class="title-trophy">🏆</span> Top Records
              </h3>
              <div class="game-details-dialog__records-list">
                ${game.topRecords
                  .map((record: TopRecord): string => {
                    let medal = '🥉';
                    if (record.position === 1) {
                      medal = '🥇';
                    } else if (record.position === 2) {
                      medal = '🥈';
                    }
                    const relativeDate = this.formatRelativeTime(record.achievedAt);
                    return `
                    <div class="game-details-dialog__record-item">
                      <div class="game-details-dialog__record-left">
                        <span class="game-details-dialog__record-medal">${medal}</span>
                        <span class="game-details-dialog__record-player">${record.playerName}</span>
                      </div>
                      <div class="game-details-dialog__record-right">
                        <span class="game-details-dialog__record-score">${record.score.toLocaleString()} pts</span>
                        <span class="game-details-dialog__record-date">${relativeDate}</span>
                      </div>
                    </div>
                  `;
                  })
                  .join('')}
              </div>
            </section>

            <!-- Comments Section (With User Avatar, Input, and Cards) -->
            <section class="game-details-dialog__comments-section">
              <h3 class="game-details-dialog__section-title game-details-dialog__comments-title">Comments (${this.commentsCount})</h3>

              <div class="game-details-dialog__comment-form">
                <div class="game-details-dialog__user-avatar">U</div>
                <input
                  type="text"
                  class="game-details-dialog__comment-input"
                  placeholder="Write a comment..."
                  aria-label="Write a comment"
                />
                <button
                  type="button"
                  class="game-details-dialog__submit-comment-btn"
                  aria-label="Send comment"
                  disabled
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>

              <div class="game-details-dialog__comments-list">
                ${comments
                  .map((comment: CommentInfo): string => {
                    const avatarBg = this.getCommentAvatarBg(comment.authorName);
                    const avatarLetter = comment.authorName.charAt(0).toUpperCase();
                    const relativeDate = this.formatRelativeTime(comment.createdAt);
                    return `
                  <article class="game-details-dialog__comment-card">
                    <div class="game-details-dialog__comment-header">
                      <div class="game-details-dialog__comment-author-group">
                        <div class="game-details-dialog__comment-avatar" style="background-color: ${avatarBg};">${avatarLetter}</div>
                        <span class="game-details-dialog__comment-author">${comment.authorName}</span>
                      </div>
                      <span class="game-details-dialog__comment-date">${relativeDate}</span>
                    </div>
                    <p class="game-details-dialog__comment-text">${comment.text}</p>
                    <div class="game-details-dialog__comment-footer">
                      <button
                        type="button"
                        class="game-details-dialog__comment-like-btn"
                        data-comment-id="${comment.commentId}"
                        aria-label="Like comment by ${comment.authorName}"
                      >
                        <svg class="comment-heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span class="like-count">${comment.likesCount}</span>
                      </button>
                    </div>
                  </article>
                `;
                  })
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

    // Comment input & Send button handling
    this.inputElement =
      this.backdropElement.querySelector<HTMLInputElement>('.game-details-dialog__comment-input') ??
      undefined;
    const submitBtn = this.backdropElement.querySelector<HTMLButtonElement>(
      '.game-details-dialog__submit-comment-btn'
    );

    const sendComment = (): void => {
      if (!this.inputElement || this.inputElement.value.trim().length === 0) {
        return;
      }
      const commentText = this.inputElement.value.trim();
      const commentsList = this.backdropElement.querySelector(
        '.game-details-dialog__comments-list'
      );
      if (commentsList) {
        const newCommentArticle = document.createElement('article');
        newCommentArticle.className = 'game-details-dialog__comment-card';
        const newCommentId = `comment-${Date.now()}`;
        this.commentLikes.set(newCommentId, { count: 0, active: false });
        newCommentArticle.innerHTML = `
          <div class="game-details-dialog__comment-header">
            <div class="game-details-dialog__comment-author-group">
              <div class="game-details-dialog__comment-avatar" style="background-color: #ffd02b;">Y</div>
              <span class="game-details-dialog__comment-author">You</span>
            </div>
            <span class="game-details-dialog__comment-date">Just now</span>
          </div>
          <p class="game-details-dialog__comment-text">${commentText}</p>
          <div class="game-details-dialog__comment-footer">
            <button
              type="button"
              class="game-details-dialog__comment-like-btn"
              data-comment-id="${newCommentId}"
              aria-label="Like comment by You"
            >
              <svg class="comment-heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span class="like-count">0</span>
            </button>
          </div>
        `;
        const likeBtn = newCommentArticle.querySelector<HTMLButtonElement>(
          '.game-details-dialog__comment-like-btn'
        );
        if (likeBtn) {
          this.attachLikeListener(likeBtn, newCommentId);
        }
        commentsList.prepend(newCommentArticle);
        this.commentsCount++;
        const titleEl = this.backdropElement.querySelector('.game-details-dialog__comments-title');
        if (titleEl) {
          titleEl.textContent = `Comments (${this.commentsCount})`;
        }
      }
      this.inputElement.value = '';
      if (submitBtn) {
        submitBtn.disabled = true;
      }
    };

    if (this.inputElement) {
      this.inputElement.addEventListener('input', (): void => {
        if (!this.inputElement || !submitBtn) {
          return;
        }
        submitBtn.disabled = this.inputElement.value.trim().length === 0;
      });

      this.inputElement.addEventListener('keydown', (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendComment();
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', (): void => {
        sendComment();
      });
    }

    // Comment like buttons
    const likeButtons = this.backdropElement.querySelectorAll<HTMLButtonElement>(
      '.game-details-dialog__comment-like-btn'
    );
    for (const button of likeButtons) {
      const commentId = button.dataset.commentId;
      if (commentId) {
        this.attachLikeListener(button, commentId);
      }
    }
  }

  private attachLikeListener(button: HTMLButtonElement, commentId: string): void {
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
