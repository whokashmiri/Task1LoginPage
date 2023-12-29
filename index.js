const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/BharatIntern', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password
  });


  newUser.save()
  .then(() => {
    res.send('Registration Successful');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  });



  
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
