import './game-dev.scss';
import devIllustration from '../../assets/images/random-image.png';
import uploadIcon from '../../assets/icons/upload.svg';

export class GameDevSection {
  private element: HTMLElement;

  public constructor() {
    this.element = this.createGameDevElement();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private createGameDevElement(): HTMLElement {
    const section: HTMLElement = document.createElement('section');
    section.className = 'game-dev-section';

    section.innerHTML = `
      <div class="game-dev-section__container">
        <div class="game-dev-section__image-wrapper">
          <img src="${devIllustration}" alt="Game Developer Desk Setup" class="game-dev-section__image" />
        </div>

        <div class="game-dev-card">
          <h2 class="game-dev-card__title">Are You a Game Developer?</h2>
          <p class="game-dev-card__description">
            Want to see your game on MiniGames? We're always looking for fun, engaging mini games to add to our platform. Submit your game and reach thousands of players!
          </p>
          <div class="game-dev-card__actions">
            <button class="game-dev-card__btn" aria-label="Submit Form">
              <img src="${uploadIcon}" alt="Upload icon" class="game-dev-card__upload-icon" width="16" height="16" />
              Submit Form
            </button>
            <span class="game-dev-card__contact">or contact us at developers@minigames.com</span>
          </div>
        </div>
      </div>
    `;

    return section;
  }
}
