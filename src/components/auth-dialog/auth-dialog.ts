import './auth-dialog.scss';

export type AuthMode = 'login' | 'register';

export interface AuthDialogOptions {
  onClose?: () => void;
}

export class AuthDialog {
  private element: HTMLElement;
  private backdrop: HTMLElement;
  private dialogCard: HTMLElement;
  private currentMode: AuthMode = 'login';
  private isOpen = false;

  public constructor() {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'auth-backdrop';

    this.dialogCard = document.createElement('div');
    this.dialogCard.className = 'auth-dialog';

    this.backdrop.append(this.dialogCard);
    this.element = this.backdrop;

    this.renderContent();
    this.attachEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public open(mode: AuthMode = 'login'): void {
    this.currentMode = mode;
    this.renderContent();
    document.body.append(this.element);
    this.isOpen = true;

    // Trigger open animation
    requestAnimationFrame((): void => {
      this.backdrop.classList.add('auth-backdrop--active');
      this.dialogCard.classList.add('auth-dialog--active');
    });

    document.addEventListener('keydown', this.handleKeyDown);
  }

  public close(): void {
    if (!this.isOpen) {
      return;
    }

    this.backdrop.classList.remove('auth-backdrop--active');
    this.dialogCard.classList.remove('auth-dialog--active');

    setTimeout((): void => {
      if (this.element.parentNode) {
        this.element.remove();
      }
      this.isOpen = false;
    }, 250);

    document.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.close();
    }
  };

  private attachEvents(): void {
    // Backdrop click dismiss
    this.backdrop.addEventListener('click', (e: MouseEvent): void => {
      if (e.target === this.backdrop) {
        this.close();
      }
    });
  }

  private switchMode(mode: AuthMode): void {
    if (this.currentMode === mode) {
      return;
    }
    this.currentMode = mode;

    // Smooth tab transition animation
    const formContainer = this.dialogCard.querySelector('.auth-dialog__form-container');
    if (formContainer) {
      formContainer.classList.add('auth-dialog__form-container--transitioning');
      setTimeout((): void => {
        this.renderContent();
        const newFormContainer = this.dialogCard.querySelector('.auth-dialog__form-container');
        if (newFormContainer) {
          newFormContainer.classList.remove('auth-dialog__form-container--transitioning');
        }
      }, 150);
    } else {
      this.renderContent();
    }
  }

  private renderContent(): void {
    const isLogin = this.currentMode === 'login';

    this.dialogCard.innerHTML = `
      <div class="auth-dialog__switcher">
        <button type="button" class="auth-dialog__switcher-btn ${isLogin ? 'auth-dialog__switcher-btn--active' : ''}" data-mode="login">
          Login
        </button>
        <button type="button" class="auth-dialog__switcher-btn ${isLogin ? '' : 'auth-dialog__switcher-btn--active'}" data-mode="register">
          Register
        </button>
      </div>

      <div class="auth-dialog__form-container">
        ${isLogin ? this.renderLoginForm() : this.renderRegisterForm()}
      </div>
    `;

    // Attach switcher events
    const switchBtns = this.dialogCard.querySelectorAll('.auth-dialog__switcher-btn');
    for (const btn of switchBtns) {
      btn.addEventListener('click', (): void => {
        const mode = (btn as HTMLElement).dataset.mode as AuthMode;
        this.switchMode(mode);
      });
    }

    // Attach link switcher events
    const switchLinks = this.dialogCard.querySelectorAll('.auth-switch-link');
    for (const link of switchLinks) {
      link.addEventListener('click', (e: Event): void => {
        e.preventDefault();
        const mode = (link as HTMLElement).dataset.mode as AuthMode;
        this.switchMode(mode);
      });
    }

    // Password visibility toggle event
    const pwdToggles = this.dialogCard.querySelectorAll('.auth-field__toggle-pwd');
    for (const toggle of pwdToggles) {
      toggle.addEventListener('click', (): void => {
        const input = (toggle as HTMLElement).parentElement?.querySelector('input');
        if (input) {
          const isPwd = input.type === 'password';
          input.type = isPwd ? 'text' : 'password';
          toggle.innerHTML = isPwd ? this.getEyeOffIconSvg() : this.getEyeIconSvg();
        }
      });
    }

    // Form submit prevention (since auth state validation is in later task)
    const form = this.dialogCard.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e: Event): void => {
        e.preventDefault();
      });
    }
  }

  private renderLoginForm(): string {
    return `
      <h2 class="auth-dialog__title">Welcome Back!</h2>
      <p class="auth-dialog__subtitle">Sign in to resume your games and progress.</p>

      <form class="auth-form" novalidate>
        <div class="auth-field">
          <label class="auth-field__label" for="login-email">Email Address</label>
          <div class="auth-field__input-box">
            ${this.getMailIconSvg()}
            <input type="email" id="login-email" class="auth-field__input" placeholder="e.g. alex@minigames.com" required />
          </div>
        </div>

        <div class="auth-field">
          <label class="auth-field__label" for="login-password">Password</label>
          <div class="auth-field__input-box">
            ${this.getLockIconSvg()}
            <input type="password" id="login-password" class="auth-field__input" placeholder="••••••••" required />
            <button type="button" class="auth-field__toggle-pwd" aria-label="Toggle password visibility">
              ${this.getEyeIconSvg()}
            </button>
          </div>
          <a href="#" class="auth-form__forgot-link">Forgot Password?</a>
        </div>

        <button type="submit" class="auth-form__submit-btn">Login</button>
      </form>

      <div class="auth-divider">
        <span class="auth-divider__line"></span>
        <span class="auth-divider__text">OR</span>
        <span class="auth-divider__line"></span>
      </div>

      <button type="button" class="auth-google-btn">
        ${this.getGoogleIconSvg()}
        Continue with Google
      </button>

      <p class="auth-dialog__footer-text">
        Don't have an account? <a href="#" class="auth-switch-link" data-mode="register">Register</a>
      </p>
    `;
  }

  private renderRegisterForm(): string {
    return `
      <h2 class="auth-dialog__title">Create Account</h2>
      <p class="auth-dialog__subtitle">Join MiniGames to track your score & streak.</p>

      <form class="auth-form" novalidate>
        <div class="auth-field">
          <label class="auth-field__label" for="register-username">Username</label>
          <div class="auth-field__input-box">
            ${this.getUserIconSvg()}
            <input type="text" id="register-username" class="auth-field__input" placeholder="e.g. CozyGamer_99" required />
          </div>
        </div>

        <div class="auth-field">
          <label class="auth-field__label" for="register-email">Email Address</label>
          <div class="auth-field__input-box">
            ${this.getMailIconSvg()}
            <input type="email" id="register-email" class="auth-field__input" placeholder="your.email@domain.com" required />
          </div>
        </div>

        <div class="auth-field">
          <label class="auth-field__label" for="register-password">Password</label>
          <div class="auth-field__input-box">
            ${this.getLockIconSvg()}
            <input type="password" id="register-password" class="auth-field__input" placeholder="Min. 8 characters" required />
          </div>
        </div>

        <div class="auth-field">
          <label class="auth-field__label" for="register-confirm-password">Confirm Password</label>
          <div class="auth-field__input-box">
            ${this.getLockIconSvg()}
            <input type="password" id="register-confirm-password" class="auth-field__input" placeholder="Repeat your password" required />
          </div>
        </div>

        <button type="submit" class="auth-form__submit-btn">Create Account</button>
      </form>

      <div class="auth-divider">
        <span class="auth-divider__line"></span>
        <span class="auth-divider__text">OR</span>
        <span class="auth-divider__line"></span>
      </div>

      <button type="button" class="auth-google-btn">
        ${this.getGoogleIconSvg()}
        Sign up with Google
      </button>

      <p class="auth-dialog__footer-text">
        Already have an account? <a href="#" class="auth-switch-link" data-mode="login">Login</a>
      </p>
    `;
  }

  private getMailIconSvg(): string {
    return `<svg class="auth-field__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
  }

  private getLockIconSvg(): string {
    return `<svg class="auth-field__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
  }

  private getUserIconSvg(): string {
    return `<svg class="auth-field__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
  }

  private getEyeIconSvg(): string {
    return `<svg class="auth-field__eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  }

  private getEyeOffIconSvg(): string {
    return `<svg class="auth-field__eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
  }

  private getGoogleIconSvg(): string {
    return `<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>`;
  }
}
