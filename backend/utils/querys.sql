CREATE TABLE owners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ownerId INT,
    version INT DEFAULT 0,
    FOREIGN KEY (ownerId) REFERENCES owners(id)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    categoryId INT NULL,
    ownerId INT,
    version INT DEFAULT 0,
    FOREIGN KEY (categoryId) REFERENCES categories(id),
    FOREIGN KEY (ownerId) REFERENCES owners(id)
);

CREATE TABLE IF NOT EXISTS flat_catalog (
    productId INT PRIMARY KEY,
    productName VARCHAR(255),
    productDescription TEXT,
    productPrice DECIMAL(10, 2),
    categoryId INT,
    categoryName VARCHAR(255),
    ownerId INT
);