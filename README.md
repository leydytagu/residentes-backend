# Residentes Backend API

Residentes Backend API is a server-side application built with **Node.js** and **Express**. It provides the backend services for managing appointments, services, and clients in the Residentes app, using **JWT (JSON Web Tokens)** for authentication.

## Features

- **JWT Authentication:** Secure login and token-based user authentication.
- **Appointment Booking:** Endpoints for creating, updating, and canceling appointments.
- **Service Management:** Admins can manage services, including adding, updating, and removing them.
- **Client Management:** Endpoints for managing resident (client) data.

## Installation

To run the project locally, follow these steps:

### Prerequisites

- Node.js (v14.x or higher)
- MySQL (or your preferred database)
- Git

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/ledytagu/residentes-backend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd residentes-backend
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Configure the environment variables:
    Create a `.env` file in the root directory with the following:
    ```
    PORT=5000
    DATABASE_URL=your-database-url
    JWT_SECRET=your-secret-key
    ```

5. Run the application:
    ```bash
    npm start
    ```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get a JWT

### Appointments

- `GET /appointments` - Get all appointments
- `POST /appointments` - Create a new appointment
- `PUT /appointments/:id` - Update an existing appointment
- `DELETE /appointments/:id` - Cancel an appointment

### Services

- `GET /services` - Get all services
- `POST /services` - Add a new service
- `PUT /services/:id` - Update a service
- `DELETE /services/:id` - Delete a service

### Clients

- `GET /clients` - Get all clients
- `POST /clients` - Add a new client
- `PUT /clients/:id` - Update client details
- `DELETE /clients/:id` - Delete a client

## Technologies Used

- **Backend:** Express.js
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** MongoDB
- **ORM:** Sequelize (or any ORM of choice)

## Contributing

1. Fork the project
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push the changes:
    ```bash
    git push origin feature/your-feature
    ```
5. Open a pull request

## License

This project is licensed under the MIT License.
"""
