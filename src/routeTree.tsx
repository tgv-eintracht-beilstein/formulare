import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { Dashboard } from './pages/Dashboard';
import { FormPage } from './pages/FormPage';
import { Layout } from './components/Layout';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

const formRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/form/$type',
  component: FormPage,
});

export const routeTree = rootRoute.addChildren([indexRoute, formRoute]);