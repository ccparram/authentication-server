## Authetication Server API
This page represents the latest published version of Authetication Server API

#### Install project

```
$ nmp install
```

#### Execute project
```
$ node app.js
```

### How to use it?

- ##### Verify:

    API call

    ```javascript
  GET /api/signup/?email={user_email} HTTP/1.1
  Host: ix.cs.uoregon.edu:3555
    ```

    API response

    ```json
  Email exists in database:

  HTTP/1.1 200 OK
  Content-Type: application/json

  {
    "success": true,
    "id": "user_email",
    "message": "You can not use this email"
  }

  Email does not exist in the database:

  HTTP/1.1 200 OK
  Content-Type: application/json

  {
    "success": false,
    "id": "user_email",
    "message": "You can use this email"
  }
  
  It is not an email:

  HTTP/1.1 400 OK
  Content-Type: application/json

  {
    "success": false,
    "id": "user_email",
    "message": "This is not a email"
  }
    ```

- ##### Register User:

    API call
    ```json

  POST /api/signup/ HTTP/1.1
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
      }],
    "externalID" : "skjdjfb87u345k"
  }
    ```
    API response

    ```json
  HTTP/1.1 200 OK
  Content-Type: application/json

  User registered successfully:

    {
      "userId": "a@b.c",
      "success": true,
      "error" : null
    }

  HTTP/1.1 200 OK
  Content-Type: application/json

  The user could not be registered:

    {
      "UserId": "a@b.c",
      "success": false,
      "error" : "Error message"
    }
    ```

- ##### Validate User:

    API call
    ```javascript
  POST /api/validate HTTP/1.1
  Host: ix.cs.uoregon.edu:3555

  email={email_user}
  password={password_user}
    ```

    API response
    ```json
  HTTP/1.1 200 OK
  Content-Type: application/json

  The user was validated successfully:

    {
      "userId": "email user",
      "externalID": "id external user",
      "success": "true",
      "error" : null
    }

  The user was not validated successfully:

    {
      "userId": "email user",
      "externalID": "id external user",
      "success": "false",
      "error" : "Error message"
    }

  The user does not exists en database:

    {
      "userId": "email user",
      "externalID": null,
      "success": "false",
      "error" : null
    }
    ```
