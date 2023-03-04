# JobSearchManager
This is a nodejs api that allows users to keep track of their job they apply for. 

## Overview of the API
In this application, anytime a user applies for a job on any platform. The user logs into the system and write the details of the job here. For any job posted, the user has the ability to post the details of the interview taken for a particular job

## Folder Structure
The main folder for this project is labelled **backend**
The **backend** folder has these folders and what they contain
1. ***models***: This folder contains all the database models that were used for this project
2. ***routes***: This folder contains the routes for the projects. The folder contains routes for particular entiities in the project
3. ***controllers***: For clarity, the controllers folder contains files which have the functions for each routes. The files here have functions that are invoked for every api endpoint
4. ***config***: This folder contains a single file called ***db.js*** that contains the function for connecting to the mongoose database
5. ***utils***: This contains files for multer configuration which allows multipart/form-data to be parsed and eventually worked on. The cloudinary file allows for images and files to be stored there and in turn returns a url for the image which is stored in the database
6. ***middleware***: The middleware folder contains files for checking errors and an authentication middleware for ensuring users are authenticated before accessing any routes

# Routes 
There are there entities in this application. There are Users, Jobs and Interviews

## Users
### UserModel
The database models that involve the users are found in the userModel.js file in the model folder. The fields in this table are:
1. firstName
2. lastName
3. otherName
4. dob
5. age
6. email
7. password: this is stored as a hashed password using bcryptjs
8. avatar: for storing image of the user. The image is stored in cloudinary. It's the url of the image that is stored here
9. cloudinaryId

### UserRoutes
These are the endpoints that are used in accessing User data. The functions that are to be performed using this routes are the **login** and **registration** purposes.

### POST /api/user
This is the endpoint for registering a user

### POST /api/user/login
This is the endpoint for logging in a user. It receives the email and password from the user. If the database checks are successful, it returns a json web token for successful authentication

##### NB: As stated earlier, the functions that make up this route are found in the controllers folder, specifically in the UserController.js file


## Jobs
### JobModel
The fields in this table include
1. name
2. location
3. jobPosition
4. avatar
5. cloudinaryId
6. user: a foreign key field to store the id of the field that posts this job
7. timestamps

### JobRoutes
End points for accessing Job Data

##### Users need to be authenticated in order to access this routes

### POST /api/job
For creating jobs
### GET /api/job
For getting a list of all jobs a user has applied to
### GET /api/job/:id
For getting the details of a particular jobb
### PUT /api/job/:id
For updating the details of a job based on its id
### DELETE /api/job/:id
For deleting a job


