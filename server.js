require ('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT;
const server = app.listen(port, () => console.log(`*********We hear you on port: ${port}`));


app.use(cookieParser());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('./server/config/config.UserDatabase')
require('./server/config/config.ItemDatabase')
require('./server/routes/routes.app')(app)