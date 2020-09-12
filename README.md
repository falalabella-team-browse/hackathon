# Falabella Hackathon - Team Browse

## Development Setup

Requirements

- `Node v12`
- `yarn` (to install run `npm i -g yarn`)

### Install dependencies

```
# Install global dependencies
yarn install

# Install server dependencies
yarn workspace server install

# Install website dependencies
yarn workspace website install
```

### Run application

```
yarn workspace website watch
yarn workspace server watch
```

Website is accessible at `localhost:1234`

Server is accessible at `localhost:3000`

### Install packages

```
# Install global packages
yarn add <list-of-package> -W

# Install server packages
yarn workspace server add <list-of-package>

# Install website packages
yarn workspace website add <list-of-package>
```

---

## Project Structure

### Server

`src/plugin/config` - Config to read env variables

`src/routes` - Routes Declaration

`src/database/controllers` - Database controllers Declarations

`src/database/schema` - Database schema Declarations

`src/utils` - Utilities

### Website

`components` - UI components Declaration

`context` - React context Declaration

`http` - REST API Declarations

`pages` - Root pages
