# node-js-finder

NodeJs Finder is a REST API created as backend logic for [react-native-finder application](https://github.com/ArtemBurakov/react-native-finder).

## Features

- :memo: Uses its own MySQL database.
- :closed_lock_with_key: Secure user authorization using the jwt token.
- :no_entry: Good input data validation methods.
- :warning: Error handling methods.

## Requirements

1. Installed Linux, Apache, MySQL, PHP (LAMP) stack on your local machine or remote server.
2. You will need Node.

### LAMP stack installiation

If you already have a LAMP stack installed, you can skip this step. Otherwise, complete the LAMP stack installation on your target machine or follow this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-20-04).

### Node installation

Follow the [installation instructions for your Linux distribution](https://nodejs.org/en/download/package-manager/) to install Node 14 or newer.

## Getting started

### Installation

* Clone the project

```bash
  git clone https://github.com/ArtemBurakov/node-js-finder.git
```

* Go to the project directory

```bash
  cd node-js-finder
```

* Install dependencies

```bash
  npm install
```

* To start the server you need navigate to `node-js-finder/src` folder and run this command (before starting follow the configuration steps):

```bash
  node server.js
```

## Configuration

### Create Database

* Go to the db folder located in src folder

```bash
  cd src/db
```

* Execute `create-db.sql` file

Replace `YOUR_DB_USER_NAME` with your MySQL user name. After running this command, you will be prompted for the MySQL user password.

```bash
  mysql -u YOUR_DB_USER_NAME -p < create-db.sql
```

Now a new database for this project has been created. You can check it by using [PhpMyAdmin](https://www.phpmyadmin.net/).

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file.

* Create a new `.env` file in `node-js-finder` folder

```bash
  touch .env
```

#### Configuration Values

* `DB_HOST` - your database host, such as localhost
* `DB_USER` - MySQL user name
* `DB_PASS` - MySQL user password
* `DB_DATABASE` - database name. If you followed the steps above, it will `node-js-finder`
* `PORT` - port where you want to run this server
* `SECRET_JWT` - secret JWT string. Just pick a random string

#### `.env` file example:

```
DB_HOST=localhost
DB_USER=YOUR_DB_USER_NAME
DB_PASS=YOUR_DB_USER_PASSWORD
DB_DATABASE=node_js_finder
PORT=3000
SECRET_JWT=fkjfg567B%34&Hy_~!bmMXG$3yf8ho
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
