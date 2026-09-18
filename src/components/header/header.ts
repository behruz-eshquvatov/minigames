import logoPng from '../../assets/images/logo.png';
import './header.scss';

export interface HeaderCallbacks {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

export class Header {
  private element: HTMLElement;
  private isMenuOpen = false;
  private burgerButton!: HTMLButtonElement;
  private mobileMenuOverlay!: HTMLDivElement;
  private callbacks: HeaderCallbacks;

  public constructor(callbacks: HeaderCallbacks = {}) {
    this.callbacks = callbacks;
    this.element = this.createHeaderElement();
    this.setupEventListeners();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private createHeaderElement(): HTMLElement {
    const header: HTMLElement = document.createElement('header');
    header.className = 'site-header';

    const container: HTMLDivElement = document.createElement('div');
    container.className = 'site-header__container';

    // Logo
    const logo: HTMLAnchorElement = document.createElement('a');
    logo.href = '/';
    logo.className = 'site-header__logo';
    logo.innerHTML = `
      <div class="site-header__logo-icon">
        <img src="${logoPng}" alt="MiniGames Logo" class="site-header__logo-img" />
      </div>
      <span class="site-header__logo-text">MiniGames</span>
    `;

    // Desktop Nav
    const nav: HTMLElement = document.createElement('nav');
    nav.className = 'site-header__nav';
    nav.innerHTML = `
      <ul class="site-header__nav-list">
        <li class="site-header__nav-item">
          <a href="/" class="site-header__nav-link site-header__nav-link--active">Home</a>
        </li>
        <li class="site-header__nav-item">
          <a href="/" class="site-header__nav-link">Library</a>
        </li>
        <li class="site-header__nav-item">
          <a href="/" class="site-header__nav-link">Tournaments</a>
        </li>
        <li class="site-header__nav-item">
          <a href="/" class="site-header__nav-link">Community</a>
        </li>
      </ul>
    `;

    // Actions
    const loginBtn: HTMLButtonElement = document.createElement('button');
    loginBtn.className = 'btn btn--outline site-header__login-btn';
    loginBtn.textContent = 'Log In';
    loginBtn.addEventListener('click', (): void => {
      this.closeMobileMenu();
      this.callbacks.onLoginClick?.();
    });

    const signUpBtn: HTMLButtonElement = document.createElement('button');
    signUpBtn.className = 'btn btn--primary site-header__signup-btn';
    signUpBtn.textContent = 'Sign Up';
    signUpBtn.addEventListener('click', (): void => {
      this.closeMobileMenu();
      this.callbacks.onSignUpClick?.();
    });

    // Nav & Login Wrapper Container (Hidden on tablet <= 768px)
    const navWrapper: HTMLDivElement = document.createElement('div');
    navWrapper.className = 'site-header__nav-wrapper';
    navWrapper.append(nav, loginBtn);

    // Burger Button (Visible on tablet <= 768px)
    this.burgerButton = document.createElement('button');
    this.burgerButton.className = 'site-header__burger-btn';
    this.burgerButton.setAttribute('aria-label', 'Toggle menu');
    this.burgerButton.innerHTML = `
      <span class="site-header__burger-icon">
        <span class="site-header__burger-line"></span>
        <span class="site-header__burger-line"></span>
        <span class="site-header__burger-line"></span>
      </span>
    `;

    // Right Controls Group Container
    const rightControls: HTMLDivElement = document.createElement('div');
    rightControls.className = 'site-header__right-controls';
    rightControls.append(navWrapper, signUpBtn, this.burgerButton);

    container.append(logo, rightControls);
    header.append(container);

    // Mobile Menu Overlay (Matching Figma Open Menu Specification)
    this.mobileMenuOverlay = document.createElement('div');
    this.mobileMenuOverlay.className = 'mobile-menu';
    this.mobileMenuOverlay.innerHTML = `
      <div class="mobile-menu__header">
        <a href="/" class="mobile-menu__logo">
          <div class="mobile-menu__logo-icon">
            <img src="${logoPng}" alt="MiniGames Logo" class="mobile-menu__logo-img" />
          </div>
          <span class="mobile-menu__logo-text">MiniGames</span>
        </a>
        <button class="mobile-menu__close-btn" aria-label="Close menu">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="mobile-menu__content">
        <ul class="mobile-menu__nav-list">
          <li><a href="/" class="mobile-menu__nav-link mobile-menu__nav-link--active">Home</a></li>
          <li><a href="/" class="mobile-menu__nav-link">Library</a></li>
          <li><a href="/" class="mobile-menu__nav-link">Tournaments</a></li>
          <li><a href="/" class="mobile-menu__nav-link">Community</a></li>
        </ul>
        <div class="mobile-menu__actions">
          <button class="btn btn--outline-dark mobile-menu__login-btn">Log In</button>
          <button class="btn btn--primary mobile-menu__signup-btn">Sign Up</button>
        </div>
      </div>
    `;

    // Mobile menu close button listener
    const mobileCloseBtn: HTMLButtonElement | null =
      this.mobileMenuOverlay.querySelector('.mobile-menu__close-btn');
    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', (): void => {
        this.closeMobileMenu();
      });
    }

    // Mobile menu action listeners
    const mobileLoginBtn: HTMLButtonElement | null =
      this.mobileMenuOverlay.querySelector('.mobile-menu__login-btn');
    if (mobileLoginBtn) {
      mobileLoginBtn.addEventListener('click', (): void => {
        this.closeMobileMenu();
        this.callbacks.onLoginClick?.();
      });
    }

    const mobileSignUpBtn: HTMLButtonElement | null = this.mobileMenuOverlay.querySelector(
      '.mobile-menu__signup-btn'
    );
    if (mobileSignUpBtn) {
      mobileSignUpBtn.addEventListener('click', (): void => {
        this.closeMobileMenu();
        this.callbacks.onSignUpClick?.();
      });
    }

    header.append(this.mobileMenuOverlay);

    return header;
  }

  private setupEventListeners(): void {
    this.burgerButton.addEventListener('click', (): void => {
      this.toggleMobileMenu();
    });

    document.addEventListener('keydown', (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  public toggleMobileMenu(): void {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  public openMobileMenu(): void {
    this.isMenuOpen = true;
    this.burgerButton.classList.add('site-header__burger-btn--open');
    this.mobileMenuOverlay.classList.add('mobile-menu--open');
    document.body.style.overflow = 'hidden';
  }

  public closeMobileMenu(): void {
    this.isMenuOpen = false;
    this.burgerButton.classList.remove('site-header__burger-btn--open');
    this.mobileMenuOverlay.classList.remove('mobile-menu--open');
    document.body.style.overflow = '';
  }
}
