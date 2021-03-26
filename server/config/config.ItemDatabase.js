const mongoose = require('mongoose'),
    uri = `mongodb://localhost/${process.env.DB_ITEMS}`;

mongoose.connect(uri,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('*********You are connected to the Items Database********'))
    .catch(error => console.log("*******Something went wrong, you ain't connected to the Items Database, AHHHH!!!!!!!*******", error));