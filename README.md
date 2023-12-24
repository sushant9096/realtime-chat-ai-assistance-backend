### This is open source project for the Realtime Chat Application using Node.js, Express, Socket.io, MySQL, Sequelize ORM.

#### Setup Instructions
1. Install Node.js
2. Install Mysql (I recommend MariaDB with Xammp Server) database and create database names as rcwa
3. Clone repository
4. cd into backend folder
5. Download firebase service account json file and add it to backend folder
6. create .env file and add following variables (replace values with your own values)
7.  ```dotenv
    FIREBASE_CREDENTIALS_PATH=filename      # firebase credentials path
    APP_PORT=8000                   # app port
    DB_HOST=localhost               # database connection host
    DB_USER=root                    # database username
    DB_PASS=secret@123              # database password
    DB_NAME=express-sequelize-api   # database name
    DB_DIALECT=mysql                # database dialect
    DB_PORT=3306                    # database port
    ```
8. Install dependencies
9. Run backend with 
10. ```bash
    npm run dev
    ```

#### Author
| Name                                           | Email                                                                                                                               |
|------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| [Sushant Zope](https://github.com/sushant9096) | [<img src="https://github.com/FortAwesome/Font-Awesome/raw/6.x/svgs/solid/envelope.svg" height="20">](mailto:sushantzope9096@gmail) |