/*-- Citizen Table
CREATE TABLE citizen (
    citizen_id INT PRIMARY KEY AUTO_INCREMENT,
    citizen_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    contact_number VARCHAR(15) NOT NULL
);
INSERT INTO citizen (citizen_name, email, password, contact_number)
VALUES ('citizen1', 'citizen1@example.com', 'password1', '123-456-7890'),
       ('citizen2', 'citizen2@example.com', 'password2', '987-654-3210');
-- Location table
CREATE TABLE location (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL
);

-- Report table
CREATE TABLE report (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    incident_type VARCHAR(255) NOT NULL,
    rep_description TEXT,
    date DATE,
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES location(location_id),
    citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id)
);
-- Trip table
CREATE TABLE trip (
    trip_description TEXT,
    trip_id INT PRIMARY KEY AUTO_INCREMENT,
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES location(location_id),
    citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id),
	date DATE
	
);
-- Alert table
CREATE TABLE alerts (
    Alert_id INT PRIMARY KEY AUTO_INCREMENT,
    description TEXT,
    date DATE,
    citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id),
    location_id INT,
 FOREIGN KEY (location_id) REFERENCES location(location_id)
);

-- Safety tips table
CREATE TABLE safety_tips (
    tip_id INT PRIMARY KEY AUTO_INCREMENT,
    tip_description TEXT,
    citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id),
    location_id INT,
 FOREIGN KEY (location_id) REFERENCES location(location_id)
);

-- Route recommendation table
CREATE TABLE recommendation (
    recommendation_id INT PRIMARY KEY AUTO_INCREMENT,
    rec_description TEXT,
    start_location VARCHAR(255),
    end_location VARCHAR(255),
      citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id),
    location_id INT,
 FOREIGN KEY (location_id) REFERENCES location(location_id)
);
-- Admin Table
CREATE TABLE admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);*/
-- Citizen Table
CREATE TABLE citizen (
    citizen_id INT PRIMARY KEY AUTO_INCREMENT,
    citizen_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    contact_number VARCHAR(15) NOT NULL
);
INSERT INTO citizen (citizen_name, email, password, contact_number)
VALUES ('citizen1', 'citizen1@example.com', 'password1', '123-456-7890'),
       ('citizen2', 'citizen2@example.com', 'password2', '987-654-3210');
-- Location table
CREATE TABLE location (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL
);

-- Report table
CREATE TABLE report (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    incident_type VARCHAR(255) NOT NULL,
    rep_description TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES location(location_id),
    citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id)
);
-- Trip table
CREATE TABLE trip (
    trip_description TEXT,
    trip_id INT PRIMARY KEY AUTO_INCREMENT,
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES location(location_id),
    citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id),
    date DATE
   
);
-- Alert table
CREATE TABLE alerts (
    Alert_id INT PRIMARY KEY AUTO_INCREMENT,
    description TEXT,
    date DATE,
    citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id),
    location_id INT,
 FOREIGN KEY (location_id) REFERENCES location(location_id)
);

-- Safety tips table
CREATE TABLE safety_tips (
    tip_id INT PRIMARY KEY AUTO_INCREMENT,
    tip_description TEXT,
    citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id),
    date DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- Route recommendation table
CREATE TABLE recommendation (
    recommendation_id INT PRIMARY KEY AUTO_INCREMENT,
    rec_description TEXT,
    start_location VARCHAR(255),
    end_location VARCHAR(255),
      citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id),
    location_id INT,
 FOREIGN KEY (location_id) REFERENCES location(location_id)
);
-- Admin Table
CREATE TABLE admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
