CREATE DATABASE SREC2;

USE SREC2;

CREATE TABLE StatusBookings(
    statusbooking_id TINYINT(1) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    statusbooking VARCHAR(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO StatusBookings (statusbooking) VALUES ("pending"), ("confirm"), ("cancel"), ("completed");

CREATE TABLE StatusPays(
    statusPay_id TINYINT(1) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    statusPay VARCHAR(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO StatusPays (statusPay) VALUES ("pay"), ("refund");

CREATE TABLE Locations(
    location_id TINYINT(1) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Locations (location) VALUES ("Sede 1"), ("Sede 2"), ("Sede 3");

CREATE TABLE MembershipTypes(
    membershipType_id TINYINT(1) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    membershipType VARCHAR(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO MembershipTypes (membershipType) VALUES ("Basic"), ("Premium"), ("Enterprise");

CREATE TABLE userRoles(
    role_id TINYINT(1) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    roleUser VARCHAR(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO userRoles (roleUser) VALUES ("User"), ("Admin");

CREATE TABLE Users(
    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    membershipType_id TINYINT(1) UNSIGNED NOT NULL,
    role_id TINYINT(1) UNSIGNED NOT NULL,
    dateCreate DATETIME NOT NULL,
    name VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    mail VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    age TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (membershipType_id) REFERENCES MembershipTypes(membershipType_id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (role_id) REFERENCES userRoles(role_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Users ( membershipType_id, role_id, dateCreate, name, lastname, mail, password, age ) VALUES ( 3, 2, NOW(), 'Jorge Luis', 'Valerio Chalas', 'CoworkingAdmin@mail.com', "$2b$10$geGW4XMlho/WKKLvRkWI/.JdMwFz5v0N8R8i.psV7T1pJmpoNQDRa", 25);

CREATE TABLE SpacesTypes(
    spacesType_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    membershipType_id TINYINT(1) UNSIGNED NOT NULL,
    spacesType VARCHAR(20) NOT NULL,
    capacity TINYINT UNSIGNED NOT NULL,
    priceHour DECIMAL(10, 2) NOT NULL,
    priceDay DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (membershipType_id) REFERENCES MembershipTypes(membershipType_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO SpacesTypes (membershipType_id, spacesType, capacity, priceHour, priceDay)
VALUES
(1, 'Escritorio Compartido', 1, 250.00, 1500.00),
(1, 'Área de Descanso', 4, 0.00, 0.00),
(1, 'Zona Café', 6, 0.00, 0.00),
(1, 'Terraza Común', 10, 0.00, 0.00),
(1, 'Sala de Networking', 8, 300.00, 2000.00),
(1, 'Escritorio Fijo', 1, 200.00, 1500.00),
(1, 'Pequeña Sala de Reunión', 4, 350.00, 3000.00),
(1, 'Cabina Telefónica', 1, 100.00, 950.00),
(1, 'Zona Creativa', 6, 250.00, 2000.00),
(1, 'Espacio Lounge', 8, 200.00, 1500.00),
(2, 'Oficina Privada', 2, 500.00, 6000.00),
(2, 'Sala de Conferencias', 10, 1500.00, 5000.00),
(2, 'Estudio Multimedia', 3, 1200.00, 6000.00),
(2, 'Área Ejecutiva', 5, 800.00, 5500.00),
(2, 'Zona Premium Lounge', 6, 500.00, 3500.00),
(3, 'Sala de Directorio', 12, 2000.00, 12000.00),
(3, 'Oficina Ejecutiva', 3, 1800.00, 10000.00),
(3, 'Laboratorio de Innovación', 8, 1500.00, 9000.00),
(3, 'Zona VIP', 6, 1000.00, 6000.00),
(3, 'Centro de Presentaciones', 20, 2500.00, 15000.00);

CREATE TABLE Spaces(
    spaces_id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    spacesType_id INT UNSIGNED NOT NULL,
    location_id TINYINT(1) UNSIGNED NOT NULL,
    FOREIGN KEY (spacesType_id) REFERENCES SpacesTypes(spacesType_id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (location_id) REFERENCES Locations(location_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Spaces (spacesType_id, location_id) VALUES  (1, 1), (1, 1), (1, 2), (1, 3), (2, 1), (3, 1), (4, 1), (5, 1), (6, 2), (6, 3), (7, 1), (7, 2), (8, 1), (9, 2), (10, 3), (11, 1), (11, 2), (12, 1), (13, 1), (13, 2), (14, 1), (14, 2), (15, 1), (16, 1), (17, 2), (18, 3), (19, 1), (19, 2), (20, 1), (20, 3);

CREATE TABLE Bookings(
    booking_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    spaces_id TINYINT UNSIGNED NOT NULL,
    statusbooking_id TINYINT UNSIGNED NOT NULL,
    numberPersons TINYINT UNSIGNED NOT NULL,
    dateAct DATETIME NOT NULL,
    timeDate DATE NOT NULL,
    timeFrom TIME NOT NULL,
    until TIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (spaces_id) REFERENCES Spaces(spaces_id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (statusbooking_id) REFERENCES StatusBookings(statusbooking_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Pays(
    pay_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id INT UNSIGNED NOT NULL,
    statusPay_id TINYINT(1) UNSIGNED NOT NULL,
    totalPay DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (statusPay_id) REFERENCES StatusPays(statusPay_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Refunds(
    refund_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id INT UNSIGNED NOT NULL,
    refundPercent TINYINT UNSIGNED NOT NULL CHECK (refundPercent BETWEEN 0 AND 100),
    totalRefund DECIMAL(10, 2) NOT NULL,
    dateAct DATETIME NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;