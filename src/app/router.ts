export interface Route {
  path: string;
  render: () => HTMLElement;
}

export class Router {
  private routes: Route[] = [];
  private rootElement: HTMLElement;
  private currentPath = '';

  public constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    window.addEventListener('popstate', (): void => {
      this.handleRoute();
    });
    window.addEventListener('hashchange', (): void => {
      this.handleRoute();
    });
  }

  public addRoute(route: Route): void {
    this.routes.push(route);
  }

  public navigate(path: string): void {
    window.location.hash = path.startsWith('#') ? path : `#${path}`;
  }

  public getCurrentRoute(): string {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash === 'library') {
      return 'library';
    }
    const path = window.location.pathname.replaceAll(/^\/|\/$/g, '');
    if (path.endsWith('library')) {
      return 'library';
    }
    return 'home';
  }

  public handleRoute(): void {
    const routeName = this.getCurrentRoute();
    const targetPath = routeName === 'library' ? '/library' : '/';

    if (this.currentPath === targetPath && this.rootElement.children.length > 0) {
      return;
    }
    this.currentPath = targetPath;

    const matchedRoute: Route | undefined = this.routes.find(
      (route: Route): boolean => route.path === targetPath
    );

    this.rootElement.innerHTML = '';
    if (matchedRoute) {
      this.rootElement.append(matchedRoute.render());
    } else {
      const fallbackRoute: Route | undefined = this.routes.find(
        (route: Route): boolean => route.path === '/'
      );
      if (fallbackRoute) {
        this.rootElement.append(fallbackRoute.render());
      }
    }
  }
}
