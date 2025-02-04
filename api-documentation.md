# CBDC API Documentation

## Base URL

`/api/v1`

## Authentication

All protected routes require authentication middleware
Authentication header required for protected routes

## Routes

### Authentication `/user`

| Method | Endpoint    | Auth Required | Parameters                | Description    |
| ------ | ----------- | ------------- | ------------------------- | -------------- |
| POST   | `/register` | No            | `{name, email, password}` | Create account |
| POST   | `/login`    | No            | `{email, password}`       | Login          |
| GET    | `/logout`   | Yes           | -                         | Logout         |

### User Management `/user`

| Method | Endpoint              | Auth Required | Parameters                   | Description         |
| ------ | --------------------- | ------------- | ---------------------------- | ------------------- |
| GET    | `/`                   | Yes           | -                            | Get all users       |
| GET    | `/setPin`             | Yes           | `{userId, transactionPin}`   | Set transaction pin |
| GET    | `/showMe/:id`         | Yes           | id (URL param)               | Get current user    |
| PATCH  | `/updateUser`         | Yes           | `{email, name}`              | Update profile      |
| PATCH  | `/updateUserPassword` | Yes           | `{oldPassword, newPassword}` | Update password     |
| GET    | `/getBalance/:id`     | Yes           | id (URL param)               | Get user balance    |
| GET    | `/:id`                | Yes           | id (URL param)               | Get single user     |

### Transactions `/transactions`

| Method | Endpoint                    | Auth Required | Parameters                                                     | Description             |
| ------ | --------------------------- | ------------- | -------------------------------------------------------------- | ----------------------- |
| POST   | `/`                         | Yes           | `{senderId, receiverId, amount, transactionType, description}` | Create transaction      |
| GET    | `/:id`                      | Yes           | id (URL param)                                                 | List all transactions   |
| GET    | `/getSingleTransaction/:id` | Yes           | transactionId (URL param)                                      | Get transaction details |

### System `/homepage`

| Method | Endpoint | Auth Required | Parameters | Description           |
| ------ | -------- | ------------- | ---------- | --------------------- |
| GET    | `/`      | Yes           | -          | Get homepage data     |
| GET    | `/stats` | Yes           | -          | Get system statistics |

## Status Codes

- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Transaction Types

- transfer
- deposit
- withdrawal

## Models

```javascript
User {
  name: String,
  email: String,
  password: String,
  balance: Number,
  role: String
}

Transaction {
  sender: ObjectId,
  receiver: ObjectId,
  amount: Number,
  transactionType: String,
  description: String,
  status: String
}
```
