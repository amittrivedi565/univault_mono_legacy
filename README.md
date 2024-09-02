# Univault

Univault is an innovative platform designed specifically for university students to manage, organize, and access their academic notes with ease. It provides a comprehensive solution for students to store and retrieve their class materials, collaborate with peers, and enhance their learning experience.

## Technologies Used

- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications.
- **EJS (Embedded JavaScript)**: A templating engine that allows you to generate HTML markup with plain JavaScript.
- **MySQL**: A popular open-source relational database management system used to store and manage data.
- **EC2 Instance**: Amazon Web Services (AWS) Elastic Compute Cloud (EC2) provides scalable virtual servers for running applications.
- **S3 (Amazon Simple Storage Service)**: A scalable object storage service for storing and retrieving any amount of data.
- **Sequelize**: A promise-based Node.js ORM (Object-Relational Mapping) for MySQL and other SQL databases.

### Create .env
```
# Env Development
NODE_ENV='development'
HOST='1xx.x.x.x'
PORT='port_number'

# DB
DB_HOST='1xx.x.x.x'
DB_USER_NAME='db_user'
DB_PORT='db_port'
DB_PSWD='db_password'
DB_NAME='db_name'
DB_DIALECT='mysql'

# JWT Token
JWT_SECRET_KEY='jwt_secret'
JWT_TOKEN_EXP_TIME='expiry_duration'

# AWS S3 BUCKET CONFIG
AWS_REGION = "region-name"
AWS_ACCESS_KEY = "access_key"
AWS_SECRET_KEY  = "secret_key"
AWS_BUCKET_NAME = "your_bucket_name"

```