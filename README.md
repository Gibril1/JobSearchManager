# JobSearchManager
This is a nodejs api that allows users to keep track of their job they apply for. 

## Overview of the API
In this application, Users can log in to the system and save job details for any job they apply to. They can also log details of interviews taken for particular jobs.

## Folder Structure
The main folder for this project is labelled **backend**. It contains the following folders.
1. ***models***: This folder contains all the database models used for this project
2. ***routes***: This folder contains the routes for the project. It has separate routes for each entity in the project.
3. ***controllers***: The controllers folder contains files with functions for each route. These functions are invoked for every API endpoint.
4. ***config***: This folder contains a single file called ***db.js*** that contains the function for connecting to the mongoose database
5. ***utils***: This folder contains files for Multer configuration, which allows multipart/form-data to be parsed and processed. The Cloudinary file allows images and files to be stored in Cloudinary and returns a URL for the stored image, which is then stored in the database.
6. ***middleware***: The middleware folder contains files for checking errors and an authentication middleware for ensuring users are authenticated before accessing any routes

# Entities and Routes 
The API has three entities: Users, Jobs, and Interviews.

## Users

The user-related database models are found in the **userModel.js** file in the models folder. The fields in this table are:
1. **firstName**
2. **lastName**
3. **otherName**
4. **dob**
5. **age**
6. **email**
7. **password**: this is stored as a hashed password using bcryptjs
8. **avatar**: for storing image of the user. The image is stored in cloudinary. It's the url of the image that is stored here
9. **cloudinaryId**

***The endpoints for accessing user data are found in the UserRoutes.js file in the routes folder. The functions performed using these routes are for registration and login purposes.***

### POST /api/user
This is the endpoint for registering a user

### POST /api/user/login
This is the endpoint for logging in a user. It receives the email and password from the user. If the database checks are successful, it returns a JSON Web Token for successful authentication

##### NB: As stated earlier, the functions that make up this route are found in the controllers folder, specifically in the UserController.js file


## Jobs

The job-related fields in the database are:

1. **name**
2. **location**
3. **jobPosition**
4. **avatar**
5. **cloudinaryId**
6. **user**: A foreign key field to store the ID of the user who posted the job.
7. **timestamps**

The endpoints for accessing job data are found in the JobRoutes.js file in the routes folder. Users need to be authenticated to access these routes.



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


## Interviews

The interview-related fields in the database are:
1. **success**: a boolean value for determining the success of the interview based on  the user's discretion
2. **description**
3. **jobId**: a foreign key field for the job
4. **user**: a foreign key field to store the id of the field that posts this job
5. **timestamps**

### InterviewRoutes
End points for accessing interview Data

##### Users need to be authenticated in order to access this routes

### POST /api/interview/:id
For creating interviews based on a particular id
### GET /api/interview/:id
For getting a list of all the interviews that a user has gone for a particular job
### GET /api/interview/:id
For getting the details of a particular interview
### PUT /api/interview/:id
For updating the details of an interview based on its id
### DELETE /api/interview/:id
For deleting an interview



