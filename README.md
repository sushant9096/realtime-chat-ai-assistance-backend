### This is open source project for the Realtime Chat Application using Node.js, Express, Socket.io, MySQL, Sequelize ORM.

#### Setup Instructions
1. Install Docker and Docker Compose
2. Clone the repository
3. cd into the project directory
4. ```env
   # Create .env file in the root directory
   # Add the following environment variables with your own respective values
   FIREBASE_CREDENTIALS_PATH=google-service-account.json # firebase credentials path
   APP_PORT=3001 # app port
   DB_HOST=localhost # database connection host
   DB_USER=rcwai_user # database username
   DB_PASS=secret@123 # database password
   DB_NAME=rcwai # database name
   DB_DIALECT=mysql # database dialect
   DB_PORT=3306 # database port
   MYSQL_ROOT_PASS=root@123 # mysql root password
   OPENAI_API_KEY=openai_api_key # openai api key
   ```
5. Run the following commands
    ```bash
    docker compose build
    docker compose up database -d
    docker compose up app -d
    ```

#### Author
| Name                                           | Email                                                                                                                               |
|------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| [Sushant Zope](https://github.com/sushant9096) | [<img src="https://github.com/FortAwesome/Font-Awesome/raw/6.x/svgs/solid/envelope.svg" height="20">](mailto:sushantzope9096@gmail) |