import { ApolloServer } from "@apollo/server";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { UserSchema } from "../scheme/user.js";
import { blogSchema } from "../scheme/blog.js";
import { commentSchema } from "../scheme/comments.js";
import { queryScheme } from "../queries/scheme.js";
import { blogResolvers } from "../resolvers/index.js";

export const createGraphQlServer = async () => {
  const server = new ApolloServer({
    typeDefs: `
          
        ${UserSchema}
        ${blogSchema}
        ${commentSchema}

        ${queryScheme}

        `,

    resolvers: {
      ...blogResolvers,
      
    },
    introspection:true,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

  await server.start();

  return server;
};
