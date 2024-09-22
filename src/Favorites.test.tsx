import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from './utils/test-utils'
import Filter from './components/Filter';
import Browse from './Browse';
import App from './App';
import Favorites from './Favorites';
import filterDogsMiddleware from './middleware/filterDogsMiddleware';
import { preloadedTestObject } from './utils/preloaded-tests-objects';
import { MAIN_URL } from './utils/utilities';

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();  
  });


describe('Favorites Component', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ match: 'gnGFTIcBOvEgQ5OCx8A2' }),
            })
        ) as jest.Mock;
      });
    test('renders the cards of favorites dogs', () => {
      const preloadedState = preloadedTestObject
      renderWithProviders({
        element: <Favorites/>,
        path: "/dashboard/favorites",
      },[],preloadedState);
      
      waitFor(() => {
        expect(screen.getByRole("article")).toBeInTheDocument();
      });
      console.log('✓ Test 1: renders the cards of favorites dogs');
    });
    test('click on generate match should open model with result card rendered', async() => {
        const preloadedState = preloadedTestObject
        renderWithProviders({
          element: <Favorites/>,
          path: "/dashboard/favorites",
        },[],preloadedState);
        const generateMatchButton = screen.getByRole('button',{name:'Generate a dog match from favorites'});
        fireEvent.click(generateMatchButton);
        await waitFor(()=>{
            expect(global.fetch).toHaveBeenCalledWith(`${MAIN_URL}/dogs/match`, {
                    credentials: "include",
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(['gnGFTIcBOvEgQ5OCx8A2','inGFTIcBOvEgQ5OCx8A2','nHGFTIcBOvEgQ5OCx8A2'])
              });
            });
            expect(await screen.findByRole('presentation')).toBeInTheDocument();
        });
        console.log('✓ Test 3: click on generate match should open model with result card rendered');
});