import React, { isValidElement, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import setupStore from '../redux/store';
import type { RootStoreState, AppStore } from '../redux/store';


const queryClient = new QueryClient();


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootStoreState>;
  store?: AppStore;
  routes?: RouteObject[];
  initialRoute?: string;
}

export function renderWithProviders(ui, routes = [],preloadedState = {}) {
  const store = setupStore(preloadedState);

  const options = isValidElement(ui) ? { element: ui, path: "/" } : ui;
  // @ts-ignore
  const memoryRouter = createMemoryRouter([{ ...options }, ...routes], {
    // @ts-ignore
    initialEntries: [options?.path || "/"],
  });

  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={memoryRouter}></RouterProvider>
        </QueryClientProvider>
      </Provider>
    );
  };
  return {
    store,
    queryClient,
    ...render(ui, { wrapper: Wrapper }),
  };
}
