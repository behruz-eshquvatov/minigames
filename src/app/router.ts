export interface Route {
  path: string;
  render: () => HTMLElement;
}

export class Router {
  private routes: Route[] = [];
  private rootElement: HTMLElement;

  public constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    window.addEventListener('popstate', (): void => {
      this.handleRoute();
    });
  }

  public addRoute(route: Route): void {
    this.routes.push(route);
  }

  public navigate(path: string): void {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  public handleRoute(): void {
    const currentPath: string = window.location.pathname;
    const matchedRoute: Route | undefined = this.routes.find(
      (route: Route): boolean => route.path === currentPath
    );

    this.rootElement.innerHTML = '';
    if (matchedRoute) {
      this.rootElement.append(matchedRoute.render());
    } else {
      const fallbackRoute: Route | undefined = this.routes.find(
        (route: Route): boolean => route.path === '*' || route.path === '/'
      );
      if (fallbackRoute) {
        this.rootElement.append(fallbackRoute.render());
      }
    }
  }
}
