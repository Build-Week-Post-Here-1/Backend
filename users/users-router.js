const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

// GET /api/users/  return all users
router.get('/', restricted, (req, res) => {
    Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

//GET users by users name  /api/users/:username
router.get("/:username", restricted, (req, res) => {
  Users.findByUserName( req.params.username)
    .then(user => {
        console.log(user)
      return res.json(user);
    })
    .catch(err => res.send(err));
});

// GET /api/users/:id   get user by id  --->NOT WORKING
router.get('/:id', restricted, (req, res) => {
    const user = req.body;
    const id = req.params.id;
    Users.findById(id, user)
    .then(findUser => {
        console.log("user ID:", id)
        if(findUser){
         res.status(200).json({...user, id: req.params.id})
        }else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => res.send(err));
});

//PUT /api/users/:id   edit user
router.put('/:id', restricted, (req, res) => {
  const item = req.body;
  const id = req.params.id;
  
  if(!item.username || !item.password){
      res.status(404).json({errorMessage: "Please provide username and password."})
  }else {
      Users.update(id, item)
          .then(editUser => {
              if(editUser){
                  res.status(200).json({...item, id: req.params.id})
              }else {
                  res.status(404).json({message: "The user with the specified ID does not exist."})
              }
          })
          .catch(error => {
              console.log("Error on PUT api/users/:id", error)
              res.status(500).json({error: "The user information could not be modified."})
          });
  };
});  

//DELETE  /api/users/:id  Delete user by id
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Users.remove(id)
      .then(() => {
      res.status(204).json({message: "User was removed successfully"})
      })
      .catch(error => {
        console.log("There was an error on DELETE /api/users/:id", error)
        res.status(500).json({
          message: "Error removing user"
        })
      });
  });
  
module.exports = router;