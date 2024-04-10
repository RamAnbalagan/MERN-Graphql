const express = require('express');
const colors = require('colors');
require('dotenv').config();
//db
const connectDB = require('./config/db');
// graphql
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const port = process.env.PORT || '5000';
const app = express();
//cors
const cors = require('cors');
//connect to db
connectDB();

//CORS
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`Server running on port ${port}`));