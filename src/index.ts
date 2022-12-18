import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { UserResolver } from "./resolvers/resolvers";

const port = process.env.PORT || 4000;

const startServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
  });

  const con = await new DataSource({
    type: "postgres",
    database: "",
    username: "",
    password: "",
    synchronize: true, // remember to turn off when deploying
    logging: true,
    migrations: [path.join(__dirname, "./migration/*")],
    entities: [User],
  });

  con.initialize().then(() => {
    console.log("Data Source has been initialized!");
  });

  // await con.runMigrations();

  const app = express();

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {})
  );

  app.listen(port, () => console.log("running"));
};

startServer();
