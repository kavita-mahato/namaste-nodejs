# Dev-Tinder APIs

## Auth Routers
- POST /signup
- POST /login
- POST /logout

## Profile Routers
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## Connection Request Routers
Status: Ignore, Accepted, Rejected 
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- POST /request/review/:status/:requestId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## User Router
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you the progiles of other users on plaform 