# Dropbox Clone

A full-stack web application that allows users to upload, download, and view files. The application supports various file types including text, image, and pdf files.

## Technology Stack

- Frontend: React, Material-UI, Axios
- Backend: Node.js, Express, SQLite
- Database: SQLite
- File Storage: Local file system

## Local Setup

Follow these steps to set up the project locally:

1. **Clone the Repository:** Clone this repository to your local machine and navigate to the root directory.

    ```bash
    git clone https://github.com/deepakimandi/dropbox-clone.git
    cd dropbox-clone
    ```

2. **Set up the Backend:** Navigate to the backend folder, create a folder to store uploaded files, install dependencies, and start the backend server.
     ```bash
    cd backend
    mkdir src/uploads
    npm install
    npm start
    ```
    The backend should now be running at http://localhost:5000.

3. **Set up the Frontend:** Navigate to the frontend folder, install dependencies, and start the frontend server.
     ```bash
    cd frontend
    npm install
    npm start
    ```
    The frontend should now be running at http://localhost:3000.