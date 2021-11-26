const bcrypt = require("bcrypt");
const { User } = require("./../models");
const jwt = require("jsonwebtoken");

class userController {
  static createUser = (req, res) => {
    let { id, email, full_name, username, profile_img_url, age, phone_number } =
      req.body;
    let hash = bcrypt.hashSync(req.body.password, 10);
    let input = {
      id: id,
      email: email,
      full_name: full_name,
      username: username,
      password: hash,
      profile_img_url: profile_img_url,
      age: age,
      phone_number: phone_number,
    };
  
    User.create(input)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        let errCode = 500;
        if (err.name.includes("DatabaseError")) {
          console.log(err);
          errCode = 400;
        }
        res.status(errCode).json(err);
      });
  };

  static loginUser = (req, res) => {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((data) => {
        if (data === (null || "")) {
          res.status(404).json({ msg: "User tidak ditemukan" });
        } else {
          if (bcrypt.compare(req.body.password, data.password)) {
            let token = jwt.sign(data, "rahasia");
            response.status(200).json({
              token: token,
            });
          } else {
            response.status(401).json({
              message: "email atau password tidak valid !",
            });
          }
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  static editUser = (req, res) => {
    let id = req.params.userId;
    let prevData = jwt.verify(req.headers.token, "rahasia");
    let { body } = req;
    User.update(
      {
        ...prevData,
        email: body.email ?? prevData.email,
        full_name: full_name ?? prevData.full_name,
        username: body.username ?? prevData.username,
        profile_img_url: body.profile_img_url ?? prevData.profile_img_url,
        age: body.age ?? prevData.age,
        phone_number: body.phone_number ?? prevData.phone_number,
      },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    )
      .then(() => {
        return User.findByPk(id);
      })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ msg: "User tidak ditemukan" });
      });
  };

  static deleteUser = (req, res) => {
    let id = req.params.userId;
    User.delete({
      where: {
        id: id,
      },
    })
      .then((data) => {
        if (data > 0) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ msg: "User tidak ditemukan" });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };
}




module.exports = userController;
