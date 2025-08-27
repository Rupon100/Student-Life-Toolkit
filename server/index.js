const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());

app.use(cors());

require('dotenv').config();
const port = process.env.PORT || 4080;

app.get('/', (req, res) => {
    res.send({message: 'wow crud is working here'});
})

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})