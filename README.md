Live: https://snakes-and-ladders-frontend.vercel.app/
(NOTE: Play online feature will not work as vercel does not support socket.io)



# Snakes & Ladders Game Web App

This is a snakes & ladders game web app made using MERN(Mongo, Express, React, Node) stack.

## Features

1. Signup and login
2. Play with bots
3. Pause & save a game and resume the game after whenever you want.
4. Reset the game anytime you want.
5. Play multiplayer online with other players.
6. Save score on winning and loosing the game.
7. See leaderboard of top 10 players.

### Technologies & tools

-   React JS
-   NodeJS
-   ExpressJS
-   MongoDB
-   Socket.io
-   Tailwind CSS
-   Vercel


## Installation

1. Clone the repository
2. Make sure you use node version 18 or above
3. Go to `server` and `client` folder and install the dependencies using `yarn install`
4. Create a `.env` file in the root directory of `server` and `client` folder
5. Add `PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME` in `.env` file of `server` folder
6. Add `REACT_APP_API_URL` in `.env` file of `client` folder
7. Start the frontend using `yarn start` in the `client` directory
8. Start the backend using `yarn start:dev` in the `server` directory
9. Open `http://localhost:3000` to view the application in the browser.



## Folder Structure: `root`
- `README.md`: This file
- `.gitignore`: Specifies the files and folders that should be ignored by Git
- `client`: Contains the frontend code of the application
- `server`: Contains the backend code of the application

## Folder Structure: `client`

- `public`: Contains the public assets of the application
- `node_modules`: Contains the dependencies of the application
- `src`: Contains the source code of the application
  - `index.js`: Entry point of the application
  - `App.js`: Main component of the application
  - `components`: Contains the components used in the application
  - `contexts`: Contains the contexts API
  - `images`: Contains the images used in the application
  - `pages`: Contains the pages used in the application
  - `utils`: Contains the utility functions used in the application
  - `api`: Contains the API calls used in the application
- `.env`: Environment variables file
- `package-lock.json`, `yarn.lock` and `package.json`: Manages the dependencies of the application
- `tailwind.con`: Manages the tailwind config.

## Folder Structure: `server`

- `node_modules`: Contains the dependencies of the application
- `src`: Contains the source code of the application
  - `controller`: Contains the controllers of the application
  - `db`: Contains the database connection
  - `middleware`: Contains the middlewares of the application
  - `model`: Contains the models of the application
  - `routes`: Contains the routes of the application
- `.env`: Environment variables file
- `yarn.lock` and `package.json`: Manages the dependencies of the application
- `vercel.json`: Manages the vercel deployment config.


## Credits

This application was developed by [Mohammed Khushab Alam](https://github.com/khushab).


