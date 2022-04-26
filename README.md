# Firebase Authendication Service


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
    +
  <a href="" target="blank"><img src="https://www.gstatic.com/devrel-devsite/prod/v0d244f667a3683225cca86d0ecf9b9b81b1e734e55a030bdcd3f3094b835c987/firebase/images/touchicon-180.png" width="180" alt="Firebase Logo" /></a>
</p>
   <p align="center">An Quick Authendication Service Set Up using <a href="https://nestjs.com/" target="_blank">Nestjs</a> and <a href="https://firebase.google.com/" target="_blank">Firebase</a></p>
 
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A Simple pre-configured auth service for your business application.Where you can create,update,validate and delete user from your firebase authendication app.

## Prerequisite:
- Firebase Project setup:
    - Create a firebase project from here :[Firebase Console](https://console.firebase.google.com/)
    - Enable Auth Providers from  - Authentication -> Sign-in-methods
    - Get Firebase Credentials from - Project Settings -> Service Accounts -> Generate New Private Key


#### Add .env file to root directory with below contains.
```
PORT=3000 /* Default */
FIREBASE_ID=/* Your Project Id */
PROJECT_KEY=/* Your Project Key */
PROJECT_CLIENT_EMAIL=/*Your Project Email*/
```

## Installation

```bash
$ git clone https://github.com/dhachanamoorthy/firebase-auth-service.git
$ cd firebase-auth-service
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

API End-points

```
http://localhost:3000/#
```

API documentation

```
http://localhost:3000/api/#/
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

- Feel free to contribute to this project
- Show your support by giving &#9733;
## License

Nest is [MIT licensed](LICENSE).
