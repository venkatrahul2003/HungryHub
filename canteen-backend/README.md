# Canteen Backend

This is a simple Spring Boot application that demonstrates basic CRUD (Create, Read, Update, Delete) operations using Spring Data JPA and MySQL.

## Prerequisites

- Java 20 (or higher)
- MySQL Server
- Gradle (included via gradlew)

## Project Structure

- `model/Product.java`: The Entity class.
- `repository/ProductRepository.java`: JPA Repository interface.
- `service/ProductService.java`: Business logic layer.
- `controller/ProductController.java`: REST API endpoints.

## Configuration

The database configuration is in `src/main/resources/application.properties`.
Make sure your MySQL server is running on `localhost:3306` with the username `root` and password `password`. You can adjust these settings as needed.

## Endpoints

- **POST** `/api/products`: Add a new product.
- **GET** `/api/products`: Get all products.
- **GET** `/api/products/{id}`: Get a product by ID.
- **PUT** `/api/products`: Update an existing product.
- **DELETE** `/api/products/{id}`: Delete a product by ID.

## How to Run

1. Open a terminal in the project directory.
2. Run the command: `./gradlew bootRun`

## Sample JSON for POST/PUT

```json
{
    "name": "Laptop",
    "description": "High-end gaming laptop",
    "price": 1200.0,
    "quantity": 10
}
```
