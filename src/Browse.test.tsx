import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from './utils/test-utils'
import Filter from './components/Filter';
import Browse from './Browse';
import App from './App';
import Favorites from './Favorites';
import filterDogsMiddleware from './middleware/filterDogsMiddleware';
import { preloadedTestObject } from './utils/preloaded-tests-objects';

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  beforeEach(() => {
    jest.clearAllMocks();  
  });


describe('Browse Component', () => {
    test('renders all filters', () => {
      renderWithProviders({
        element: <Browse/>,
        path: "/dashboard/browse",
      });
      
      expect(screen.getByText(/Breed/i)).toBeInTheDocument();
      expect(screen.getByText(/Dog Age/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Filter By Zipcode/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Sort by/i)).toBeInTheDocument();
      expect(screen.getByText("Filter")).toBeInTheDocument();
      console.log('✓ Test 1: renders all filters');
    });
    test('expands accordion on click', () => {
      renderWithProviders({
        element: <Browse />,
        path: "/dashboard/browse",
      });
  
      const accordionHeader = screen.getByRole('button', { name: /i am looking for a dog that.../i });
      expect(screen.getByText(/Breed/i)).not.toBeVisible();
      fireEvent.click(accordionHeader);
      expect(screen.getByText(/Breed/i)).toBeVisible();
      console.log('✓ Test 2: expands accordion on click');
    });
    test('renders the list of dog cards list form state', () => {
      const preloadedState = preloadedTestObject
      renderWithProviders({
        element: <Browse/>,
        path: "/dashboard/browse",
      },[],preloadedState);
      
      waitFor(() => {
        expect(screen.getByRole("article")).toBeInTheDocument();
      });
      console.log('✓ Test 3: renders the list of dog cards list form state');
    });
});