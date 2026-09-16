import '../styles/globals.scss';
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

      const title: HTMLHeadingElement = document.createElement('h1');
      title.textContent = 'MiniGames Application';
      container.append(title);

      return container;
    },
  });

  router.handleRoute();
}

document.addEventListener('DOMContentLoaded', (): void => {
  initApp();
});
