# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Functionality

1. Revamped the HackerNews landing page design.
2. Integrated routing using react-router for seamless navigation across sections like New, Top, Comments, etc.
3. Implemented a grid layout to display posts, with each represented as a Material UI card; hover effects highlight selected posts.
4. Enhanced post display by featuring the top 4 posts prominently with larger visuals.
5. Added a "Show More" pagination feature that loads 12 new records per click.
6. Created placeholders for sections like Comments, Ask, Show, Jobs, and Login.
7. Used Axios for fetching API responses.

### Assumptions

1. The current site doesnt have top or best stories displayed anywhere, so I am showing then the same way are showing new posts, with the data fetched from topstories api instead.
2. There is hide, past, discuss section associated with each post, but there is no corresponding apis so I have ignored it for now.
3. Submit and Login section both navigate to login page, hence I ignored the Submit page for now.
4. Footer section, also have lot of data but no apis to fetch data from in the documentation hence ignored it for now.


