CREATE TABLE owners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ownerId INT,
    FOREIGN KEY (ownerId) REFERENCES owners(id)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    categoryId INT NULL,
    ownerId INT,
    FOREIGN KEY (categoryId) REFERENCES categories(id),
    FOREIGN KEY (ownerId) REFERENCES owners(id)
);

ALTER TABLE
    products
ADD
    COLUMN version INT DEFAULT 0;

ALTER TABLE
    categories
ADD
    COLUMN version INT DEFAULT 0;