import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from './utils/test-utils'
import LoginForm from './components/LoginForm'
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import Browse from './Browse';
import App from './App';

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

describe('LoginForm Component', () => {
    test('renders login form', () => {
      renderWithProviders(<Login/>);
      
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
      console.log('✓ Test 1: renders login form');
    });
    test('display error state when invalid username and email are provided', () => {
        renderWithProviders(<Login />);
        const usernameInput = screen.getByLabelText(/username/i);
        const emailInput = screen.getByLabelText(/email/i);
        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.change(usernameInput, { target: { value: '' } }); 
        fireEvent.change(emailInput, { target: { value: 'invalidEmail' } }); 
        fireEvent.click(submitButton);
    
        // Assert for error messages or validation states
        expect(usernameInput.getAttribute("aria-invalid")).toBeTruthy();
        expect(emailInput.getAttribute("aria-invalid")).toBeTruthy();
        console.log('✓ Test 2: display error state when invalid username and email are provided');
      });
    test('should navigate to dashboard/browse screen on click of login button',()=>{
      renderWithProviders(<Login />, [
        {
          path:"/dashboard",
          element:<App/>,
          children:[
            {
              path:"browse",
              element:<Browse/>
            },
          ]
        },
      ]);
      const usernameInput = screen.getByLabelText(/username/i);
      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(usernameInput, { target: { value: 'Vinita' } }); 
      fireEvent.change(emailInput, { target: { value: 'vinitajain319@gmail.com' } });
      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);
      waitFor(() => {
        expect(screen.getByRole('button', { name: /i am looking for a dog that.../i })).toBeInTheDocument()
      });
      console.log('✓ Test 3: should navigate to dashboard/browse screen on click of login button');
    })
});