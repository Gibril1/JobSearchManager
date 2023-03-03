# JobSearchManager
This is a nodejs api that allows users to keep track of their job they apply for. 

## Overview of the API
In this application, anytime a user applies for a job on any platform. The user logs into the system and write the details of the job here. For any job posted, the user has the ability to post the details of the interview taken for a particular job

## Folder Structure
The main folder for this project is labelled **backend**
The **backend** folder has these folders and what they contain
1. ***models***: This folder contains all the database models that were used for this project
2. ***routes***: This folder contains the routes for the projects. The folder contains routes for particular entiities in the project
3. ***controllers***: For clarity, the controllers folder contains files which have the functions for each routes. The files here have functions that ar invoked for every api endpoint
4. ***config***: This folder contains a single file called ***db.js*** that contains the function for connecting to the mongoose database
5. ***utils***: This contains files for multer  \configuration which allows multipart/form-data to be parsed and eventually worked on. The cloudinary file allows for images and files to be stored there and in turn returns a url for the image which is stored in the database
