# Binar Car Management Dashboard

REST API used as the backend of Binar Car Management Dashboard.

## How to Run
- Execute command `npm i` to install required libraries
- Execute command `npm run dev` to run the server in development mode or `npm start` to build and run the server.

## Entity-Relationship Diagram
![ERD](./images/ERD.png)

## Endpoints

### Cars
| No | URI              | Method    | Description                              |
| -- | ---------------- | --------- | ---------------------------------------- |
| 1  | /cars            | GET       | Retrieve all cars                        |
| 2  | /cars/:id        | GET       | Retrieve car by id                       |
| 3  | /cars            | POST      | Add car                                  |
| 4  | /cars/:id        | PUT       | Update car                               |
| 5  | /cars/:id        | DELETE    | Delete car                               |


### Orders
| No | URI              | Method    | Description                              |
| -- | ---------------- | --------- | ---------------------------------------- |
| 1  | /orders          | GET       | Retrieve all orders                      |