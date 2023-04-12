const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Department {
    id: ID!
    name: String!
  }

  type Query {
    departments: [Department!]!
  }
`);

const rootValue = {
  departments: () => [
    { id: '1', name: 'IT' },
    { id: '2', name: 'ACCOUNT' },
  ],
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
