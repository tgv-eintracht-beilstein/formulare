import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="webworker.auth0.com"
      clientId="icjnj8zs9oCA6W6T3sTC22uuRfQA3xMU"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </StrictMode>
);