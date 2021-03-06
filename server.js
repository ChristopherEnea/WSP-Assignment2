const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRoutes = require('./routes/user.routes');
const Product = require('./models/product');

dotenv.config();

const app = Express();

app.use(BodyParser.json());

app.use('/', UserRoutes);

(async () => {
  await Mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(process.env.PORT);
})();
