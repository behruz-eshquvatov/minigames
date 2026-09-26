import './hero.scss';

export class Hero {
  private element: HTMLElement;

  public constructor() {
    this.element = this.createHeroElement();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private createHeroElement(): HTMLElement {
    const section: HTMLElement = document.createElement('section');
    section.className = 'hero-section';

    section.innerHTML = `
      <div class="hero-section__background-overlay"></div>
      <div class="hero-section__container">
        <div class="hero-section__card">
          <h1 class="hero-section__title">Take a Short Break &amp; Have Fun</h1>
          <p class="hero-section__description">
            Discover hundreds of curated casual mini-games. Play instantly in your browser &mdash; puzzle, match 3, farm, and board classics.
          </p>
          <button class="btn btn--primary hero-section__btn">Browse Library</button>
        </div>
      </div>
    `;

    return section;
  }
}
