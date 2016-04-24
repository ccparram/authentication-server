## Authetication Server

### Install project

```
$ nmp install
```

### Execute project
```
$ node app.js
```


- Verify Email : Basic Request
  ```javascript
  GET api/signup/?email=user_email HTTP/1.1
  ```

  ```javascript
  HTTP/1.1 200 OK
  Content-Type: application/json
  {
  "success": true,
  "id": "user email",
  "message": "msg"
  }
  ```

- Register User : Basic Request
    ```javascript
    POST api/signup/ HTTP/1.1
    ```

    ```javascript
    HTTP/1.1 200 OK
    Content-Type: application/json
    OK
    {
    "userId": "a@b.c",
    "success": true,
    "error" : null
    }

    HTTP/1.1 200 OK
    Content-Type: application/json
    ERROR
    {
    "UserId": "a@b.c",
    "success": false,
    "error" : "Error message"
    }
    ```

- Validate User : Basic Request
    ```javascript
    POST api/validate/ HTTP/1.1
    OK
    {
    "userId": "email user",
    "externalID": "id external user",
    "success": "true",
    "error" : null
    }

    ERROR
    {
    "userId": "email user",
    "externalID": "id external user",
    "success": "false",
    "error" : "Error message"
    }

    NOT FOUND
    {
    "userId": "email user",
    "externalID": null,
    "success": "false",
    "error" : null
    }
    ```
