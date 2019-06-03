const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));
app.use('/api', require('./src/routes/employers'));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
