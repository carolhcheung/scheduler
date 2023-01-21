# Interview Scheduler

Simple interview management application to setup, edit, delete interview appointments.
!["home"](https://github.com/carolhcheung/scheduler/blob/master/docs/home.PNG?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Project Stack
*Front-End: React, Axios, JSX, HTML, SASS, JavaScript
*Back-End: Express, Node.js, PostgreSQL
*Testing: Storybook, Webpack Dev Server, Jest, Testing Library and Cypress

### Error handling with book a new interview
!["error handling"](https://github.com/carolhcheung/scheduler/blob/master/docs/error_handling.PNG?raw=true)

### Delete an interview
!["delete"](https://github.com/carolhcheung/scheduler/blob/master/docs/delete.PNG?raw=true)


## To run the app locally
1.Fork this repository, and clone your fork.
2.Go to the scheduler-api repository that contains the database and also fork and clone from repository.
3.Install dependencies in both folders (scheduler & scheduler-api) using the npm install command.
4.Open separate terminals, one for scheduler and one for scheduler-api.
5.Run the both servers using the npm start command.
6.Go to http://localhost:8000/ in your browser.
