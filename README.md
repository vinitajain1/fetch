# Fetch App
https://fetch-project-vinita-jain.netlify.app/

## Steps application to run locally
### OPTION 1: Using Docker
1. Clone the repo
2. Run the following:<br>
    `docker compose up --build`
3. Open http://localhost:3000 to view it in the browser.
### OPTION 2: Have Node version 20 and above installed.
1. Node version : 20.12.2 and above must be installed
2. Clone the repo
3. Run the following commands in terminal in order:<br>
    `npm i`<br>
    `npm run start`
4. Open http://localhost:3000 to view it in the browser.

## Steps to run the tests
1. run the following to run the integration test:<br>
    `npm run test`

![alt text](/readme-image/testcases.png)

![alt text](/readme-image/test-case-setup.png)


## Tech Stack
1. React
2. Redux
3. React Router DOM
4. React Query
5. Typescript
6. Material UI
7. Tailwind CSS
8. HTML
9. Jest
10. React testing library

## APIs Used
1. POST /auth/login
2. POST /auth/logout
3. GET /dogs/breeds
4. GET /dogs/search
5. POST /dogs
6. POST /dogs/match
7. POST /locations


## Functional Features
1. Auth/Login
2. Filter Dogs By:
    * Breeds
    * Age
    * Zipcode
3. Sort By:
    * Breeds ASC/DESC
    * Name ASC/DESC
    * Age ASC/DESC
4. Paginated cards of dogs
5. Each card contains following dog information
    * Name
    * Age
    * Breed
    * city - used the /location endpoint to fetch this
    * State - used the /location endpoint to fetch this
    * County - used the /location endpoint to fetch this
    * Zipcode
6. Add Dogs to Favorites
7. Remove Dogs from Favorites
8. Generate Match for dogs. Match shown using Modal
9. Responsive Design
10. Error handling using Snackbar component
11. Functionality has been added to display the appropriate message when no search criteria are found.
12. Filters are maintained when you switch between pages. Filters will cleared if you log out.
13. Dog can be removed from favorite from favorites page and from browse page. This is handled consistantly.
14. Favorites list remains between searches.
15. Validation added for login form.
16. Dockerized application

## Non-Functional Requirements
1. The UI is intuitive and user friendly, allowing users to find dogs with minimal clicks
2. Component decomposition for minimal re-rendering.
3. Using useSelector hook to avoid unnecessary re-renders of components, leading to better performance
3. Centralized state management
4. Loading indicators
5. Added Accessibility for screen readers
6. React Query for caching responses.Following are the places where caching is used.
    * useBreeds Hook: The `useBreeds` hook is a custom React hook built using React Query to fetch a list of dog breeds from the API endpoint.<br>
        * **Fetching Dog Breeds**: The hook fetches dog breeds from the API endpoint.
        * **Efficient Caching**: Data is cached to minimize unnecessary network requests.
        * **Error Handling**: Handles network errors and invalid response formats.
        * **Control Refetching**: Customize when and how the hook refetches the data to optimize performance.
7. Wrote integration test cases using React testing library and Jest.

## Component Architecture

![alt text](./readme-image/Fetch.png)

## React - Redux Communication

![alt text](<./readme-image/redux.png>)

## Future Scope
1. Debounced auto-complete for breeds.
2. Search by city and state.
3. Add more Integration and Unit test cases

