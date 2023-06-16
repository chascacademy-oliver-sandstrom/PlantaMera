require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const admin = require('firebase-admin');
const path = require('path');
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
const serviceAccount = require(serviceAccountPath);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://greenertech-a2336.appspot.com',
});

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MDB connected...'))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes.js');

// Use the userRoutes here
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 8000;

const sslServerOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ss1', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ss1', 'cert.pem')),
  passphrase: 'greentech',
};

const httpsServer = https.createServer(sslServerOptions, app);

httpsServer.listen(PORT, () => {
  console.log(`HTTPS Server running on https://localhost:${PORT}/`);
});
