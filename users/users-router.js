const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

// GET /api/users/  return all users
router.get('/', restricted, (req, res) => {
    Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
});
});

//GET users by users name  /api/users/:username
router.get("/:username", restricted, (req, res) => {
  Users.findByUserName( req.params.username)
    .then(user => {
        
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err, "Error getting user by username"));
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
router.delete('/:id', restricted, (req, res) => {
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

// GET api/users/:id/subreddits  get all subreddits by user id
  router.get('/:id/subreddits', restricted, (req, res) => {
    const { id } = req.params;
  
    Users.findSubs(id)
    .then(subs => {
      if (subs.length) {
        res.json(subs);
      } else {
        res.status(404).json({ message: 'Could not find subreddit for given user' })
      }
    })
    .catch(err => {
      console.log("Error GET api/users/:id/subreddits", err)
      res.status(500).json({ message: 'Failed to get subreddits' });
    });
  });

  //POST api/users/:id/subreddits
  router.post('/:id/subreddits', restricted, (req, res) => {
    const subData = req.body;
    const { id } = req.params;
    subData.user_id = id; 
  
    Users.findById(id)
    .then(user => {
      if (user) {
        Users.addSub(subData)
        .then(sub => {
          res.status(201).json(sub);
        })
      } else {
        res.status(404).json({ message: 'Could not find user with given id.' })
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to save new subreddit' });
    });
  });
  
module.exports = router;