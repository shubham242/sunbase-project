# Customer Management System

This is a simple web application for managing customer data. It consists of both a backend built with Spring Boot and a frontend built with React.

## Backend

### Description

The backend of this project is built using Spring Boot, providing RESTful APIs for CRUD operations on customer data. It also includes functionality to sync customer data from an external API.

### Technologies Used

- Java
- Spring Boot
- Spring Data JPA
- RESTful API

### How to Run

1. Clone this repository to your local machine.
2. Navigate to the `backend` directory.
3. Open the project in your preferred IDE (e.g., IntelliJ IDEA, Eclipse).
4. Run the `CustomerManagementApplication` class to start the Spring Boot application.
5. The backend server will start running on `http://localhost:8080`.

## Frontend

### Description

The frontend of this project is built using React, providing a user interface for managing customer data. It includes features such as viewing, adding, updating, and deleting customers.

### Technologies Used

- React
- React Router
- Axios
- Tailwind CSS

### How to Run

1. Ensure that the backend server is running on `http://localhost:8080`.
2. Navigate to the `frontend` directory.
3. Install dependencies by running `npm install` or `yarn install`.
4. Start the development server by running `npm start` or `yarn start`.
5. The frontend application will be accessible in your web browser at `http://localhost:3000`.

### Usage

1. Once both the backend and frontend are running, you can access the application in your web browser.
2. Use the provided UI to perform CRUD operations on customer data.
3. Use the "Sync" button to fetch and synchronize customer data from the external API.

