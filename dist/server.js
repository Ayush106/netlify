'use strict';

var express = require('express');

var _require = require('express-graphql'),
    graphqlHTTP = _require.graphqlHTTP;

var _require2 = require('graphql'),
    buildSchema = _require2.buildSchema;

var schema = buildSchema('\n  type Department {\n    id: ID!\n    name: String!\n  }\n\n  type Query {\n    departments: [Department!]!\n  }\n');

var rootValue = {
  departments: function departments() {
    return [{ id: '1', name: 'IT' }, { id: '2', name: 'ACCOUNT' }];
  }
};

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true
}));

var PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log('Server running on port ' + PORT);
});