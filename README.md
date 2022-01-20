# Node JS Server Implementation

1. JavaScript(Language)
2. Node Js(Platform)
3. MongoDB(Database)
4. Jade/Pug(View)

## Project Structure

    |-config
        config.js
        custom-environment-variable.json
        default.json
        development.json
        production.json
    |-database
        index.js
    |-middleware
        auth.js
        logger.js
    |-models
        Customer.js
        Genre.js
        Movie.js
        Rental.js
        User.js
    |-public
        readme.md
        readme.txt
    |-routes
        auth.js
        customer.js
        genre.js
        index.js
        movie.js
        rental.js
        user.js
    |-src
        index.js
    |-views
        auths.pug
        customers.pug
        genres.pug
        index.pug
        movies.pug
        rentals.pug
        users.pug
    .gitignore
    package.json
    package-lock.json
    README.md

## Dependencies

        "@babel/runtime": "^7.16.3",
        "bcrypt": "^5.0.1",
        "config": "^3.3.6",
        "cors": "^2.8.5",
        "debug": "^4.3.3",
        "dotenv": "^10.0.0",
        "express": "^4.17.1",
        "express-async-errors": "^3.1.1",
        "fawn": "^2.1.5",
        "helmet": "^4.6.0",
        "joi": "^17.5.0",
        "joi-objectid": "^4.0.2",
        "jsonwebtoken": "^8.5.1",
        "loadash": "^1.0.0",
        "mongoose": "^6.0.14",
        "morgan": "^1.10.0",
        "pug": "^3.0.2",
        "winston": "^3.3.3",
        "winston-mongodb": "^5.0.7"

Run the following in your terminal to install all the dependencies

```shell
npm install
```

But if you wish to install them yourself, make sure to add the version e.g

```shell
npm install lodash@4.17.19
```

# Starting the Server

Run the following to start,

```shell
npm start
```

Run this to start the server with all development features

```shell
npm run start:dev
```
# MUTU

## Primary Aims

1. Sales Management
2. POS
3. Purchase Management
4. Inventory Management
5. Invoicing
6. Email Management
7. Employee Management
8. Salary Management
9. Expenses (Repairs & Maintenance) Management

## SALES MANAGEMENT

##Schemas

1. Access Log
2. Attendance
3. Branch
4. Card
5. Category
6. Claim
7. Contact
8. Customer
9. Dispute
10. EOD(End Of Day)
11. ExpenseRecord
12. Expense
13. Inventory
14. Invoice
15. Mail
16. Note
17. Order
18. Payment
19. Payment Method
20. Plan
21. Product
22. Project
23. Purchase
24. Quote
25. Receipt
26. Record Upload
27. Report
28. Shop Order
29. Shop Setting
30. Stock Item
31. Subaccount
32. Subscriber
33. Terminal
34. User
