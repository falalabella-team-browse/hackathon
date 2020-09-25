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

### Build Plugin
```
yarn workspace plugin build
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



### Load Review & Ratings Plugins

1. Insert Script in HTML
```html
<script src="<path-to-script>/rnr-script.js"></script>
```

2. Load ratings module
```html
<script>
    const element = document.getElementById("reviews");
    RNR.load(reviews);
</script>
```


### Review n Ratings APIS

1. Create new review
   
   ```
      (post) : 'api/v1/review'
      (reqBody) : { entityId, rating , title,  description, author}

   ```

2. Edit review
   
   ```
      (post) : 'api/v1/edit/review'
      (reqBody) : { id, rating , title,  description}
      
   ```

3. Mark review as Helpfull
   
   ```
      (post) : 'api/v1/flag/review'
      (reqBody) : { id, helpful_count}
      
   ```

4. Remove/Delete review
   
   ```
      (delete) : 'api/v1/review/{id}'
   ```

5. Get Review with Id
   
   ```
      (get) : 'api/v1/review/{id}'
      
   ```

