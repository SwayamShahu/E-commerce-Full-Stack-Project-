# ShopEase E-Commerce Project

Full-stack e-commerce application with a Spring Boot backend and React frontend.

## Project Structure

- backend/demo: Java Spring Boot API
- frontend/shopease-frontend: React web app

## Features

- JWT-based authentication and authorization
- Product browsing and details page
- Cart management
- Order placement and order history
- Admin product and order management pages

## Tech Stack

Backend
- Java 21
- Spring Boot 3.2.2
- Spring Security
- Spring Data JPA
- MySQL
- Maven Wrapper

Frontend
- React (Create React App)
- React Router
- Axios
- Tailwind CSS

## Prerequisites

- JDK 21
- Node.js 18+ and npm
- Internet access to reach configured MySQL instance or your own MySQL database

## Backend Setup

Location: backend/demo

1. Open backend configuration file:
	- backend/demo/src/main/resources/application.properties

2. Configure database values. Example:

```properties
spring.datasource.url=jdbc:mysql://<HOST>:<PORT>/<DB_NAME>?useSSL=true&requireSSL=true&verifyServerCertificate=false
spring.datasource.username=<USERNAME>
spring.datasource.password=<PASSWORD>

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

3. Start backend:

```powershell
cd backend/demo
.\mvnw.cmd spring-boot:run
```

4. Backend default URL:

- http://localhost:8080

## Frontend Setup

Location: frontend/shopease-frontend

1. Install dependencies:

```powershell
cd frontend/shopease-frontend
npm install
```

2. Start frontend:

```powershell
npm start
```

3. Frontend default URL:

- http://localhost:3000

## Run Backend and Frontend Together

Use two terminals from project root.

Terminal 1:

```powershell
cd backend/demo
.\mvnw.cmd spring-boot:run
```

Terminal 2:

```powershell
cd frontend/shopease-frontend
npm start
```

## Main API Endpoints

Authentication
- POST /api/auth/register
- POST /api/auth/login

Cart
- GET /api/cart
- POST /api/cart/add/{productId}
- DELETE /api/cart/remove/{productId}

Orders
- POST /api/orders
- POST /api/orders/checkout
- GET /api/orders

Note: Cart and order routes require Bearer token authentication.

## Security Note

Do not commit real database credentials to source control. Use environment variables for production and team sharing.

## Useful Commands

Backend tests:

```powershell
cd backend/demo
.\mvnw.cmd test
```

Frontend tests:

```powershell
cd frontend/shopease-frontend
npm test
```

Frontend production build:

```powershell
cd frontend/shopease-frontend
npm run build
```
