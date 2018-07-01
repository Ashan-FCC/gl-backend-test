# Rest API for user signup and login

### create a RESTFUL API application using Node.js and Restify to register and login member

### Write unit test for each function above

create a file .localenv on the project root similar to .env_template
create a file .testenv on project root to run tests on local. Becareful though,
the tests will clean up the DB, everytime it runs.

## To run the tests on Docker.

`docker-compose run --rm app ./docker-wait.sh npm run ftest`

The login is based on JWT.