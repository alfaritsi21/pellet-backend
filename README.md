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

**1. AUTH**

- `/user/register`(Register New User)

  - `{ "user_email":"a1.arifrahman.1213@gmail.com", "user_password":"Pellet21!", "user_phone":"235467", "confirm_password: "Pellet21!"}`

- `/user/login`(Login User)

  - `{ "user_email" : "a1.arifrahman.1213@gmail.com", "user_password" : "Pellet21!"}`

- `/user/forgot/`(Forgot Password)

  - `{ "user_email" : "a1.arifrahman.1213@gmail.com"}`

- `/user/change/?keys=56756`(Change Password)
<<<<<<< HEAD
=======

>>>>>>> 188af12b6c210477a8dc11a2e79788cfa38fc223
  - params `{ "keys" : 56756}`

  - `{ "user_password" : 12341234, "confirm_password" : 12341234}`

- `/user/1`(Create New PIN)
<<<<<<< HEAD
=======

>>>>>>> 188af12b6c210477a8dc11a2e79788cfa38fc223
  - params `{ "user_id" : 1}`

  - `{ "pin" : 123456 }`

- `/user/newpass/1`(Edit Password)
<<<<<<< HEAD
=======

>>>>>>> 188af12b6c210477a8dc11a2e79788cfa38fc223
  - params `{ "user_id" : 1}`

  - `{ "current_password" : 12341234, "user_password" : 123123, "confirm_password" : 123123}`

- `/user/newpass/1`(Edit PIN)
<<<<<<< HEAD
=======

>>>>>>> 188af12b6c210477a8dc11a2e79788cfa38fc223
  - params `{ "user_id" : 1}`

  - `{ "user_pin" : 123457}`

- `/user/checkpin/1`(Check PIN)
<<<<<<< HEAD
=======

>>>>>>> 188af12b6c210477a8dc11a2e79788cfa38fc223
  - params `{ "user_id" : 1}`

  - `{ "user_pin" : 123457}`

**2. PROFILE**

- `/profile/?page=2&limit=3`(Get All User)

  - params `{ "page" : 2, "limit" : 3}`

- `/profile/7`(Get User By ID)

  - params `{ "user_id" : 7}`

- `/profile/image/2` (Patch Image User)

  - params `{ "user_id" : 2}`

- `/profile/patch/2` (Patch User Profile)

  - params `{ "user_id" : 2}`

  - `{ "user_name" : "skuyliving", "first_name" : "iqbal", "last_name" : "wanwan", "user_phone" : 0898989898}`

- `/profile/image/2` (Search User Profile)

  - params `{ "user_id" : 2}`

- `/profile/optphone/1` (Add Optional Phone)

  - params `{ "user_id" : 1}`

  - `{ "opt_phone" : 08982245678}`

**3. PAYMENT**

- `/payment/`(Topup Saldo Midtrans)

  - `{ "id_topup" : 18, "nominal" : 100000}`

- `/topup/`(Topup Dummy)

  - `{ "user_id" : 7, "user_phone" : 08982245678, "nominal" : 100000}`

**4. TRANSFER**

- `/transfer/`(Transfer)

  - `{ "id_topup" : 18, "nominal" : 100000}`

- `/profile/search`(Search Receiver )

  - `{ "search_name" : 0}`

- `/pdf/pdf`(PDF download)

**5. TRANSACTION**

- `/transaction`(Get Data Transaction)

  - `{ "user_id" : 1, "target_id" : 1, "date_from" : "2020/09/25", "date_to" : "2020/10/05" }`

- `/transaction/income`(Get Income Total Interval)

  - `{ "date" : "2020-10-01", "user" : 1 }`

- `/transaction/income/day`(Get Income Per Day Interval)

  - `{ "date" : "2020-10-01", "user" : 1 }`

  - `/transaction/expense`(Get Expense Total Interval)

  - `{ "date" : "2020-10-01", "user" : 1 }`

- `/transaction/expense/day`(Get Expense Per Day Interval)

  - `{ "date" : "2020-10-01", "user" : 1 }`

- `/transaction/history`(Get Transaction History)

  - `{ "user_id" : 8, "date_from" : "2020/09/25", "date_to" : "2020/10/05" }`

<<<<<<< HEAD

=======
>>>>>>> 188af12b6c210477a8dc11a2e79788cfa38fc223
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
