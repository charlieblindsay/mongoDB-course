const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv'); // ACCESS ENV VARIABLES

dotenv.config({ path: './config.env' });

DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    // Connecting to hosted database
    // .connect(process.env.DATABASE_LOCAL, { // Connecting to local database
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log('Database connection successful'));

// LISTEN TO SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
