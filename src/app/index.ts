import '../styles/globals.scss';
import { AuthDialog } from '../components/auth-dialog/auth-dialog';
import { GameDetailsDialog } from '../components/game-details-dialog/game-details-dialog';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { Carousel } from '../features/carousel/carousel';
import { GameDevSection } from '../features/game-dev/game-dev';
import { Hero } from '../features/hero/hero';
import { Leaderboard } from '../features/leaderboard/leaderboard';
import { LibraryPage } from '../features/library/library-page';
import { Router } from './router';

export function initApp(): void {
  const appElement: HTMLElement | null = document.querySelector('#app');
  if (!appElement) {
    return;
  }

  const router: Router = new Router(appElement);
  const authDialog: AuthDialog = new AuthDialog();
  const gameDetailsDialog: GameDetailsDialog = new GameDetailsDialog();

  const header: Header = new Header({
    activePage: 'home',
    onLoginClick: (): void => {
      authDialog.open('login');
    },
    onSignUpClick: (): void => {
      authDialog.open('register');
    },
    onNavigate: (page): void => {
      router.navigate(page === 'library' ? '/library' : '/');
    },
  });

  const footer: Footer = new Footer();

  // Attach footer Library / Home link clicks for in-app SPA switch
  const footerElement = footer.getElement();
  const footerLinks = footerElement.querySelectorAll<HTMLAnchorElement>('.site-footer__link');
  for (const link of footerLinks) {
    const text = link.textContent?.trim().toLowerCase();
    if (text === 'home') {
      link.addEventListener('click', (e: MouseEvent): void => {
        e.preventDefault();
        header.setActivePage('home');
        router.navigate('/');
      });
    } else if (text === 'library') {
      link.addEventListener('click', (e: MouseEvent): void => {
        e.preventDefault();
        header.setActivePage('library');
        router.navigate('/library');
      });
    }
  }

  // Home Route
  router.addRoute({
    path: '/',
    render: (): HTMLElement => {
      header.setActivePage('home');
      const container: HTMLDivElement = document.createElement('div');
      container.className = 'app-container app-container--home';

      container.append(header.getElement());

      const mainContent: HTMLElement = document.createElement('main');
      mainContent.className = 'main-content';

      const hero: Hero = new Hero();
      const carousel: Carousel = new Carousel({
        onGameClick: (): void => {
          gameDetailsDialog.open();
        },
      });
      const leaderboard: Leaderboard = new Leaderboard();
      const gameDev: GameDevSection = new GameDevSection();

      mainContent.append(
        hero.getElement(),
        carousel.getElement(),
        leaderboard.getElement(),
        gameDev.getElement()
      );

      container.append(mainContent, footer.getElement());

      return container;
    },
  });

  // Library Route
  router.addRoute({
    path: '/library',
    render: (): HTMLElement => {
      header.setActivePage('library');
      const container: HTMLDivElement = document.createElement('div');
      container.className = 'app-container app-container--library';

      container.append(header.getElement());

      const mainContent: HTMLElement = document.createElement('main');
      mainContent.className = 'main-content';

      const library: LibraryPage = new LibraryPage({
        onGameDetailsClick: (): void => {
          gameDetailsDialog.open();
        },
      });

      mainContent.append(library.getElement());
      container.append(mainContent, footer.getElement());

      return container;
    },
  });

  router.handleRoute();
}

document.addEventListener('DOMContentLoaded', (): void => {
  initApp();
});
