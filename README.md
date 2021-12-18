# Getting Started with Urban Chowk Client

> App is hosted at https://urban-chowk-fe.herokuapp.com/
## Note 
 - Make sure server is up and running and it's open at [http://localhost:8080/]
 - Please clear Redis server when running locally to avoid any error/warning.
 - App will take few seconds to load for the first time if you open the production app at[https://urban-chowk-fe.herokuapp.com/] as the servers cold starts at [https://urban-chowk-server.herokuapp.com/]

## Running App Locally

1. Make sure you have `.env` file and *REACT_APP_NODE_ENV* is pointing to **developemt**.
2. Run command `npm install` in root directory of project.
3. Run command `npm start` to start the application and is available at [http://localhost:3000].

## Running App Locally in Docker

1. Make sure you have `.env` file and *REACT_APP_NODE_ENV* is pointing to developemt.
2. Make sure you have docker installed, up and running.
3. Build the docker using `npm run build-docker` command.
4. Finally Run command `npm run run-docker` command to start the application and open [http://localhost:3000] in browser. 

## Depolying app on heroku using docker

1. Make sure you have installed heroku cli at global level.
2. Make sure you are logged in heroku cli if not use this command `heroku container:login`.
3. Point *REACT_APP_NODE_ENV* to **production** in `.env` file.
4. Run command `heroku container:push web --app urban-chowk-fe ` to push the docker to heroku server, where `urban-chowk-fe` is the name of the app that we created using cmd `heroku create urban-chowk-fe`
5. Release the app using cmd `heroku container:release web --app urban-chowk-fe`.
6. Finally run the cmd `heroku open --app urban-chowk-fe` which will open the app in browser at [https://urban-chowk-fe.herokuapp.com/]

- Checking logs for client use this command `heroku logs --tail --app urban-chowk-fe`. Make sure you are logged in.


## Technolgoies used in front end application

- Redux for global state mangement and caching checkout and order details.
- Firebase for Email/Password authentication and Firebase Storage for storing user's profile picture.
- Docker for containerization.
- Heroku for deploying our application.
