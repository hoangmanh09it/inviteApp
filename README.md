## Invite app install guiline

### Step 1 : Install dependencies.
```
npm install
```
### Step 2 : Login in to Mysql server and create a database named "invite_app".

### Step 3 : Update configuration connect to database at
```
config/config.json
```

### Step 4 : Migrate database schema
```
npm run migrate
```

### Step 5 : Insert seed data
```
npm run seed
```
### Step 6 : Run unit test
```
npm run test
```


### Step 7 : Start server
```
npm start
```

_As default server will start at port 3000 open browser and go to http://localhost:3000/api-doc to view Swager API document_


## Optional command

#### Roll-backed migrate database.

```
npm run rollback-migrate
```
#### Static check and fix coding convention.

```
npm run lint
```
