# Univault

Univault is an innovative platform designed specifically for university students to manage, organize, and access their academic notes with ease. It provides a comprehensive solution for students to store and retrieve their class materials, collaborate with peers, and enhance their learning experience.

## Technologies Used

- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications.
- **EJS (Embedded JavaScript)**: A templating engine that allows you to generate HTML markup with plain JavaScript.
- **MySQL**: A popular open-source relational database management system used to store and manage data.
- **EC2 Instance**: Amazon Web Services (AWS) Elastic Compute Cloud (EC2) provides scalable virtual servers for running applications.
- **S3 (Amazon Simple Storage Service)**: A scalable object storage service for storing and retrieving any amount of data.
- **Sequelize**: A promise-based Node.js ORM (Object-Relational Mapping) for MySQL and other SQL databases.

# Univault API Documentation


## Create .env

### Env Development
NODE_ENV='development'
HOST='1xx.x.x.x'
PORT='port_number'

### DB
DB_HOST='1xx.x.x.x'
DB_USER_NAME='db_user'
DB_PORT='db_port'
DB_PSWD='db_password'
DB_NAME='db_name'
DB_DIALECT='mysql'

### JWT Token
JWT_SECRET_KEY='jwt_secret'
JWT_TOKEN_EXP_TIME='expiry_duration'

### AWS S3 BUCKET CONFIG
AWS_REGION = "region-name"
AWS_ACCESS_KEY = "access_key"
AWS_SECRET_KEY  = "secret_key"
AWS_BUCKET_NAME = "your_bucket_name"

```


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width , initial-scale=1.0">
    <title><%= typeof title !='undefined' ? title : 'Login' %></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="../../public/css/auth/login.css">
</head>
<body>

  <nav class="navbar border-bottom">
    <div class="container">
      <a class="navbar-brand" href="#" style="font-size: 2.2rem;color: #3e38f5;">
        Uni<b>Vault</b>
      </a>
    </div>
  </nav>

  <div class="container mt-5">
    <div class="row">
      <div class="col-xl-5 col-sm-8 mx-auto mt-5">

        <p style="font-size: 2.5rem;">Login</p>
        <p>Hi, Welcome Back! 👋</p>
        
        <form>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          </div>

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1">
          </div>

          <button type="submit" class="btn btn-primary w-100" style="background-color: #3e38f5;;">Login</button>
        </form>
      </div>
    </div>
  </div>
    





  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
</body>
</html>