<h1 align="center">ExpressJS - PELLET RESTfull API</h1>

Pellet is payment transaction web-based are present in Indonesia, in this modern era and can help to assist you on digital payments for various types of transactions. This application is supported by an e-payment feature that widely used by Indonesian's today. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name pellet, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3001/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost // Database Host
DB_ROOT=root // Database Root
DB_PASSWORD= // Password set for database is empty
DB_DATABASE=pellet // Database
DB_PORT=3001 // PORT
DB_IP=127.0.0.1 // IP
```

## End Point

**1. USER**

- `/user/register`(Register New User)

  - `{ "user_name":"roger", "user_email":"roger@gmail.com", "user_password":"Chatchy21!", "user_phone":"235467"}`

- `/user/login`(Login Account)

  - `{ "user_email":"ijiq@gmail.com", "user_password":"Chatchy21!"}`

- `/user/activation/:id`(Activate Account)

- `/user/:id`(Get User by ID)

- `/user/search/username`(Search user by username)

  - `{ "user_name" : "nezuko" }`

- `/user/search/usernickname`(Search user by nickname)

  - `{ "user_nickname" : "Ade Londok" }`

- `/user/search/userphone`(Search user by phone number)

  - `{ "user_phone" : 0854356 }`

- `/user/:id`(Edit Profile)

  - `{ "user_nickname" : "Djanbi Dumadi", "user_name" : "djanbi12", "user_email" : "djanbi@gmail.com" "user_password" : "Chatchy21!", "user_phone" : 08123713, "user_image" : {upload}, "user_bio" : "Halo Semua"}`

- `/user/password/reset/`(Reset Password)

  - `{ "user_email": "salsa@gmail.com", "user_password" : "Chatchy21!", "re_password": "Chatchy21!" }`

**2. MESSAGE**

- `/message/chat/`(Send a Message)

  - `{ "message_sender": 1, "message_receiver": 2, "message_chat": "Kamu sekarang tinggal dimana ?" }`

- `/message/delete/:id`(Delete a Message)

- `/message/search/`(Send a Message)

  - `{ "message_chat" : "hai", "sender" : 1, "receiver" : 2 }`

- `/message/` (Get data Message)

  - `{ "sender" : 11, "receiver" : 23 }`

**3. CONTACT**

- `/contact/:id`(Get Contact By Owner)

- `/contact/delete`(Delete Contact)

  - `{ "owner" : 15, "saved" : 19 }`

- `/contact/addcontact`(Add Contact)

  - `{ "owner" : 15, "saved" : 19 }`

**Documentation API**

https://documenter.getpostman.com/view/12322442/TVRg9AnD

## License

© [M Faishal Ramadhan](https://github.com/Faishalrmdhn)
© [Arqi Alfaritsi](https://github.com/alfaritsi21/)
© [Arif Rahman](https://github.com/Glitchfer)
© [Iqbal Setiawan](https://github.com/iqbalstwan)
© [Hasbi Alwi Kusmana](https://github.com/hasbiak)

## Team

> All Members of Default Team

| <a href="https://blog.udacity.com/2014/12/front-end-vs-back-end-vs-full-stack-web-developers.html" target="_blank">**Front End Developer & Team Leader**</a> | <a href="https://blog.udacity.com/2014/12/front-end-vs-back-end-vs-full-stack-web-developers.html" target="_blank">**Full-stack Developer**</a> | <a href="https://blog.udacity.com/2014/12/front-end-vs-back-end-vs-full-stack-web-developers.html" target="_blank">**Full-stack Developer**</a> | <a href="https://blog.udacity.com/2014/12/front-end-vs-back-end-vs-full-stack-web-developers.html" target="_blank">**Front-End Developer**</a> | <a href="https://blog.udacity.com/2014/12/front-end-vs-back-end-vs-full-stack-web-developers.html" target="_blank">**Back-End Developer**</a> | 
| :---: |:---:| :---:|:---:| :---:|
| [![Leader Image](https://avatars1.githubusercontent.com/u/66148701?s=400&u=0b927e246e60ba50b8ba8ec72c6f947acaaa35cd&v=4)](https://github.com/Faishalrmdhn) | [![Full-Stack Developer Image](https://avatars3.githubusercontent.com/u/63988114?s=460&u=1dfc4cc474ab100d82e36f1144a5f005efbc0853&v=4)](https://github.com/alfaritsi21) | [![Full-Stack Developer Image](https://avatars3.githubusercontent.com/u/68628662?s=460&u=584ec7adb3b1c8e52e22bc7ea59932071f1c6d25&v=4)](https://github.com/Glitchfer) | [![Front-End Developer Image](https://avatars1.githubusercontent.com/u/67422750?s=460&u=21d465c9ea07dcf6421ffc6076ca02f863843dc4&v=4)](https://github.com/hasbiak) | [![Back-End Developer Image](https://avatars0.githubusercontent.com/u/67113526?s=460&u=7582638e678ffa864425cc05f0ea246dc9ce10d8&v=4)](https://github.com/iqbalstwan) |
| <a href="https://github.com/Faishalrmdhn" target="_blank">`https://github.com/Faishalrmdhn`</a> | <a href="https://https://github.com/alfaritsi21" target="_blank">`https://github.com/alfaritsi21`</a> | <a href="https://github.com/Glitchfer" target="_blank">`https://github.com/Glitchfer`</a> | <a href="https://github.com/hasbiak" target="_blank">`https://github.com/hasbiak`</a> | <a href="https://github.com/iqbalstwan" target="_blank">`https://github.com/iqbalstwan`</a> |

---