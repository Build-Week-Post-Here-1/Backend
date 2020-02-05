# Backend
-- Deployed here: https://bw-post-here-1.herokuapp.com/

# Endpoints: 
### users
- POST:
    ...api/register
    - Adds new user ('username' and 'password' required fields)

- POST 
    ...api/login
    - Login user, requires Auth header and auth with token.
        ('username' and 'password' required)

- GET 
    ...api/users/  
     - returns all users
     -Starting of restricted routes

- GET 
    ...api/users/:username
    -returns user by username

- PUT 
    ...api/users/:id
    - Edit user by user id

- DELETE
    ...api/users/:id
    - Delete users by user id

### subreddits

- POST
    ...api/users/:id/subreddits
    - add new subreddit by user id
    - requires 'name' field
    - optional 'subLink' field

- GET
    ...api/users/:id/subreddits
    - get subreddit by user id

- PUT 
    ...api/users/:id/subreddits
    - edit subreddit by subreddit id

- DELETE
    ...api/users/:id/subreddits
    - delete subreddit by subreddit id


