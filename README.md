# APOLLO GRAPHQL TYPEORM TEMPLATE

## Init App
- Install Packages
``` 
Yarn Install 
```

## TypeOrm Specifications

- Enter database information 
``` type: "postgres",
    database: "",
    username: "",
    password: "",
```
- When deploying to production 
```
type: "postgres",
    url: process.env.DATABASE_URL,
```

## GraphQl

- For graphql testing on http://localhost:4000/graphql

1. 
``` mutation {
  user(username:"testuser"){
    id
    username
  }
}
```
2. 
``` 
query{
  me {
    id
    username
  }
}
```

## Typescript Build

- Don't Forget to use [yarn watch] to create dist files before deploying
