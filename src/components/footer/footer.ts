import './footer.scss';
import logoImg from '../../assets/images/logo.png';
import shareIcon from '../../assets/icons/share.svg';
import chatIcon from '../../assets/icons/chat.svg';
import rssIcon from '../../assets/icons/rss_feed.svg';
import rsLogoIcon from '../../assets/icons/rs-logo.svg';
import githubIcon from '../../assets/icons/github-icon.svg';

export class Footer {
  private element: HTMLElement;

  public constructor() {
    this.element = this.createFooterElement();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private createFooterElement(): HTMLElement {
    const footer: HTMLElement = document.createElement('footer');
    footer.className = 'site-footer';

    footer.innerHTML = `
      <div class="site-footer__container">
        <div class="site-footer__main">
          <div class="site-footer__brand">
            <a href="#" class="site-footer__logo-link">
              <img src="${logoImg}" alt="MiniGames Logo" class="site-footer__logo" />
              <span class="site-footer__brand-name">MiniGames</span>
            </a>
            <p class="site-footer__description">
              Take a short break and have fun. Hundreds of curated casual mini-games right in your web browser. No download required.
            </p>
          </div>

          <div class="site-footer__nav-group">
            <div class="site-footer__col">
              <h3 class="site-footer__col-title">Explore</h3>
              <ul class="site-footer__list">
                <li><a href="#" class="site-footer__link">Home</a></li>
                <li><a href="#library" class="site-footer__link">Library</a></li>

                <li><a href="#" class="site-footer__link">Categories</a></li>
                <li><a href="#" class="site-footer__link">Tournaments</a></li>
              </ul>
            </div>

            <div class="site-footer__col">
              <h3 class="site-footer__col-title">Company</h3>
              <ul class="site-footer__list">
                <li><a href="#" class="site-footer__link">About Us</a></li>
                <li><a href="#" class="site-footer__link">Contact</a></li>
                <li><a href="#" class="site-footer__link">Privacy Policy</a></li>
                <li><a href="#" class="site-footer__link">Terms of Service</a></li>
              </ul>
            </div>

            <div class="site-footer__col site-footer__col--community">
              <h3 class="site-footer__col-title">Community</h3>
              <div class="site-footer__socials">
                <a href="#" class="site-footer__social-btn" aria-label="Share">
                  <img src="${shareIcon}" alt="Share icon" />
                </a>
                <a href="#" class="site-footer__social-btn" aria-label="Chat">
                  <img src="${chatIcon}" alt="Chat icon" />
                </a>
                <a href="#" class="site-footer__social-btn" aria-label="RSS Feed">
                  <img src="${rssIcon}" alt="RSS icon" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="site-footer__bottom">
          <span class="site-footer__copyright">© 2026 MiniGames. All rights reserved.</span>
          
          <a href="https://rs.school/courses/short-track" target="_blank" rel="noopener noreferrer" class="site-footer__credit-link">
            <img src="${rsLogoIcon}" alt="RS School Logo" class="site-footer__rs-logo" />
            <span>RS School</span>
          </a>

          <a href="https://github.com/behruz-eshquvatov" target="_blank" rel="noopener noreferrer" class="site-footer__credit-link">
            <img src="${githubIcon}" alt="GitHub Logo" class="site-footer__github-logo" />
            <span>@behruz-eshquvatov</span>
          </a>

          <span class="site-footer__made-with">Designed with love</span>
        </div>
      </div>
    `;

    return footer;
  }
}
