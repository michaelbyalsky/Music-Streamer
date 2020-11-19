# Welcome to my music streamer application!



#### Client side:
* React App
* React Router
* Material-UI
* js-cookie
* React youtube
* network wrapper based in java-script Fetch API

#### Server side
* Node.js Express server
* MySql database controlled by sequelize ORM. 
* Authentication based on JWT, JOI, BCRYPT libraries.


## Requirements for this app: 


### create an "env" file and insert the following variables: 
    HOST = your's db host
    USER = "root"
    PASSWORD = DB password
    DATABASE = depends on your database name
    PORT = 8080
    TOKEN_SECRET = generate a string with > 32 length
    TESTDB = depends on you
    LOGIN = your details- required for the tests
    USERPASSWORD = your details- required for the tests
    SEARCH_ID = elastic search id
    SEARCH_USER = elastic search user name
    SEARCH_PASS = elastic search password 

1. cd client -> npm install- install all client dependencies.
2. cd server -> npm install- install all server dependencies.
3. copy the DB create schema from sql_database file and build a local DB.
4. run npx sequelize db:migrate
5. run the server- npm run dev- this command will run the server with your's environment variables.




