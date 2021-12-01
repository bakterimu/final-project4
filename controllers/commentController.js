const { User, Comment, Photo } = require("./../models");

class commentController {
  static createComment = (req, res) => {
    let { comment, photo_id } = req.body;
    let input = {
      comment: comment,
      photo_id: photo_id,
      user_id: req.user.id,
    };

    Comment.create(input)
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

  static getComment = (req, res) => {
    Comment.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: Photo,
          attributes: ["id", "title", "caption", "poster_image_url"],
        },
        {
          model: User,
          attributes: ["id", "username", "profile_image_url", "phone_number"],
        },
      ],
    })
    .then(data => {
      let errCode = 200;
      if (!data) {
        errCode = 404;
        res.status(errCode).send('Comment not found!');
      }
      res.status(errCode).json(data);
    })
    .catch(err => {
      let errCode = 500;
        if (err.name.includes("DatabaseError")) {
          console.log(err);
          errCode = 400;
        }
        res.status(errCode).json(err);
    })
  };

  static editComment = (req, res) => {
    let { body } = req;
    Comment.update(
      {
        comment: body.comment
      },
      {
        where: {
          id: req.body.comment_id,
        },
        returning: true,
      }
    )
      .then(() => {
        return User.findByPk(id);
      })
      .then((data) => {
        if (data > 0) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ msg: "User tidak ditemukan" });
        }
      })
      .catch((err) => {
        res.status(500).json({ msg: "User tidak ditemukan"});
      });
  };

  static deleteComment = (req, res) => {
    let id = req.params.comment_id;
    Comment.delete({
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

module.exports = commentController;
