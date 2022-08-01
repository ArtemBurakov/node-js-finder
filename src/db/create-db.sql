DROP DATABASE IF EXISTS node-js-finder;
CREATE DATABASE IF NOT EXISTS node-js-finder;
USE node-js-finder;

DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS user
  (
     id           INT PRIMARY KEY auto_increment,
     username     VARCHAR(25) UNIQUE NOT NULL,
     password     CHAR(60) NOT NULL,
     email        VARCHAR(100) UNIQUE NOT NULL,
     role         ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser',
     status       INT DEFAULT 10,
     created_at   INT NOT NULL,
     updated_at   INT NOT NULL,
     last_latitude   VARCHAR(255),
     last_longitude  VARCHAR(255)
  );

DROP TABLE IF EXISTS user_fcm_token;

CREATE TABLE IF NOT EXISTS user_fcm_token
  (
     id           INT PRIMARY KEY auto_increment,
     registration_token     VARCHAR(255) NOT NULL,
     user_id      INT NOT NULL,
     created_at   INT NOT NULL,
     updated_at   INT NOT NULL
  );

DROP TABLE IF EXISTS user_friends;

CREATE TABLE IF NOT EXISTS user_friends
  (
     id          INT PRIMARY KEY auto_increment,
     user_id     INT NOT NULL,
     friend_id   INT NOT NULL
  );