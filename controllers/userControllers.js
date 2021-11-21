const bcrypt = require('bcrypt');
const { User } = require('./../models/user.js');
const jwt = require('jsonwebtoken');

const createUser = (req, res) => {
  let {email, full_name, username, profile_img_url, age, phone_number} = req.body;
  let hash = bcrypt.hashSync(req.body.password, 10);
  let input = {
    email: email,
    full_name: full_name,
    username: username,
    password: hash,
    profile_img_url: profile_img_url,
    age: age,
    phone_number: phone_number
  };

  User.create(input)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(err => {
    let errCode = 500;
    if(err.name.includes('DatabaseError')) {
      errCode = 400;
    }
    res.status(errCode).json(err)
  });
};

const loginUser = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(data => {
    if(data === (null || '')) {
      res.status(404).json({msg: 'User tidak ditemukan'});
    } else {
      if (bcrypt.compare(req.body.password, data.password)) {
        let token = jwt.sign(data, "rahasia");
        response.status(200).json({
          token: token
        });
      } else {
        response.status(401).json({
          message: "email atau password tidak valid !"
        });
      }
    }
  })
  .catch(err => {
    res.status(500).json(err);
  });
};