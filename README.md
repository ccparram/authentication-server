## Authetication Server API
This page represents the latest published version of Authetication Server API

#### Install project

```
$ npm install
```

#### Execute project
```
$ node app.js
```

### How to use it?

- ##### Verify:

    API call

    ```javascript
  GET /api/verify/?email={user_email} HTTP/1.1
  Host: ix.cs.uoregon.edu:3555
    ```

    API response

    ```json
  Email does not exist in the database:

  HTTP/1.1 200 OK
  Content-Type: application/json

  {
    "success": true,
    "email": "user_email",
    "message": "You can use this email"
  }
  
  Email exists in database:

  HTTP/1.1 200 OK
  Content-Type: application/json

  {
    "success": false,
    "email": "user_email",
    "message": "You can not use this email"
  }
  
  It is not an email:

  HTTP/1.1 400 OK
  Content-Type: application/json

  {
    "success": false,
    "email": "user_email",
    "message": "This is not a email"
  }
    ```

- ##### Register:

    API call
    ```json

  POST /api/register HTTP/1.1
  Host: ix.cs.uoregon.edu:3555
  Content-Type: application/json

  {
    "name" : "Jeison Andres Hurtado",
    "email" : "yeison_andres94@hotmail.com",
    "password" : "123456789",
    "gender" : "Male",
    "picture" : [
      {
        "ID" : "12345",
        "base64" : "eRHR0cDovL3NhZHNhZnNhZnNmc2ZzYWY="
      },
      {
        "ID" : "32bbvs",
        "base64" : "aHR0cDovL3NhZHNhZnNhZnNmc2ZzYWY="
      }]
  }
    ```
    API response

    ```json
  HTTP/1.1 200 OK
  Content-Type: application/json

  User registered successfully:

  {
    "email": "user_email",
    "success": true,
    "message" : "User registered successfully"
  }

  HTTP/1.1 200 OK
  Content-Type: application/json

  The user could not be registered:

  {
    "email": "user_email",
    "success": false,
    "message" : "User was not registered"
  }
    ```

- ##### Authenticate:

    API call
    ```javascript
  POST /api/authenticate HTTP/1.1
  Host: ix.cs.uoregon.edu:3555
  Content-Type: application/json

  {
    "email": "user_email",,
    "password": "password",
    "picture" : "eRHR0cDovL3NhZHNhZnNhZnNmc2ZzYWY="
  }
    ```

    API response
    ```json
    
  The user was authenticated successfully:
  
  HTTP/1.1 200 OK
  Content-Type: application/json

  {
    "email": "user_email",
    "success": true,
    "message" : "User authenticated successfully"
  }

  The user was not authenticated successfully:
  
  HTTP/1.1 200 OK
  Content-Type: application/json

  {
    "email": "user_email",
    "success": false,
    "message" : "User was not authenticated successfully"
  }

  The email does not exists in database or incorrect password:
  
  HTTP/1.1 401 OK
  Content-Type: application/json

  {
    "email": "user_email",
    "success": false,
    "message" : "The email or password was incorrect"
  }
    ```
