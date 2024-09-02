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

## Admin Side

This section describes the API endpoint used for retrieving and rendering branch data related to a specific university.

### 1. Get Branches (GET)

**Endpoint:** `/createBranchGet/:id`  
**Method:** GET

**Description:** Retrieves all branches associated with a specific university and renders them on a view page.

**Path Parameters:**
- `id` (string, required): The ID of the university for which branch data is to be retrieved.

**Response:**
- **Status 200**: Renders the `branch.ejs` view template with branch data for the specified university.

**Error Handling:**
- **Status 500**: If there is an error during data retrieval, it logs the error but does not send a response message. The rendering of the view may be affected.

**Request Example:**

```exports.createBranchGet = {
  controller: async (req, res) => {
    try {
      // query to find branch where university id matches
      const branchData = await db.branches.findAll({where : {
        uniId : req.params.id
      },order : ['name']});
      res.render("../views/admin/branch.ejs", { branchData});
    } catch (error) {
      console.log(error);
    }
  },
};

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