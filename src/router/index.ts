import type { Route } from './routes';

export class Router {
  private routes: Route[] = [];
  private current: Route | null = null;

  add(route: Route) {
    this.routes.push(route);
  }

  start() {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  }

  private resolve() {
    const hash = window.location.hash.replace('#', '') || '/';
    const route = this.routes.find(r => r.hash === hash) || this.routes[0];
    if (route && route !== this.current) {
      this.current = route;
      route.render();
    }
  }
}
