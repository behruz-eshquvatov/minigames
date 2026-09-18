import '../styles/globals.scss';
import { AuthDialog } from '../components/auth-dialog/auth-dialog';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { Carousel } from '../features/carousel/carousel';
import { GameDevSection } from '../features/game-dev/game-dev';
import { Hero } from '../features/hero/hero';
import { Leaderboard } from '../features/leaderboard/leaderboard';
import { Router } from './router';

export function initApp(): void {
  const appElement: HTMLElement | null = document.querySelector('#app');
  if (!appElement) {
    return;
  }

  const router: Router = new Router(appElement);

  router.addRoute({
    path: '/',
    render: (): HTMLElement => {
      const container: HTMLDivElement = document.createElement('div');
      container.className = 'app-container';

      const authDialog: AuthDialog = new AuthDialog();

      const header: Header = new Header({
        onLoginClick: (): void => {
          authDialog.open('login');
        },
        onSignUpClick: (): void => {
          authDialog.open('register');
        },
      });

      container.append(header.getElement());

      const mainContent: HTMLElement = document.createElement('main');
      mainContent.className = 'main-content';

      const hero: Hero = new Hero();
      const carousel: Carousel = new Carousel();
      const leaderboard: Leaderboard = new Leaderboard();
      const gameDev: GameDevSection = new GameDevSection();

      mainContent.append(
        hero.getElement(),
        carousel.getElement(),
        leaderboard.getElement(),
        gameDev.getElement()
      );

      const footer: Footer = new Footer();

      container.append(mainContent, footer.getElement());

      return container;
    },
  });

  router.handleRoute();
}

document.addEventListener('DOMContentLoaded', (): void => {
  initApp();
});
