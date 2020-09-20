const { User } = require('../models');

const userController = {
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },
  
    // get one user by id
getUserById({ params }, res) {
  User.findOne({ _id: params.id })
    .populate({
      path: 'reactions',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
    },
    // createUser
    createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },
 // update user by id
updateUser({ params, body }, res) {
  User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
},
  // delete user
    deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
    // createFriend
    createFriend({ body }, res) {
        Friend.create(body)
          .then(dbFriendData => res.json(dbFriendData))
          .catch(err => res.status(400).json(err));
      },
     // delete Friend
     deleteFriend({ params }, res) {
        Friend.findOneAndDelete({ _id: params.id })
          .then(dbFriendData => {
            if (!dbFriendData) {
              res.status(404).json({ message: 'No friendfound with this id!' });
              return;
            }
            res.json(dbFriendData);
          })
          .catch(err => res.status(400).json(err));
      }
  }


module.exports = userController;