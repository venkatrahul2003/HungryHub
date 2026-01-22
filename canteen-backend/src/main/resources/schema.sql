CREATE TABLE IF NOT EXISTS menu_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DOUBLE,
    image_url VARCHAR(500),
    category VARCHAR(100),
    available BOOLEAN DEFAULT TRUE,
    rating DOUBLE DEFAULT 4.0,
    preparation_time INT DEFAULT 20
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255),
    total_amount DOUBLE,
    status VARCHAR(50),
    order_time DATETIME,
    payment_method VARCHAR(50),
    transaction_ref VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT,
    menu_item_id BIGINT,
    quantity INT,
    price DOUBLE
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(50)
);

