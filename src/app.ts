/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server-express';
import { redis } from './utils/storage/redis';
import { limiter } from './utils/security/rateLimiter';
import { customAuthChecker } from './utils/middlewares/autoChecker';
import { MyContext } from './myTypes/general.types';
import { plugins } from './utils/security/queryComplexityPlugin';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }),
);
app.get('/', (req, res) => {
  res.send({
    message: 'go to /graphql to access gql endpont',
  });
});

app.use(limiter(redis));

export const startServer = async (): Promise<express.Express> => {
  // build TypeGraphQL executable schema
  try {
    const schema = await buildSchema({
      resolvers: [`${__dirname}/modules/**/*.resolver.{ts,js}`],
      container: Container,
      authChecker: customAuthChecker,
    });
    const apolloServer = new ApolloServer({
      schema,
      plugins: plugins(schema),
      context: ({ req, res }): MyContext => ({
        redis,
        url: `${req.protocol}://${req.get('host')}`,
        res,
        req,
        pagintedData: {},
      }),
      playground: true,
    });

    apolloServer.applyMiddleware({ app });
  } catch (error) {
    console.log(error);
  }

  return app;
};
export default app;
