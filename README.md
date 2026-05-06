# Contact Manager

A premium full-stack contact management application built with Spring Boot, React, and Tailwind CSS.

## Features

- **Secure Authentication**: JWT login and registration.
- **Contact Management**: Full CRUD operations for personal and professional contacts.
- **Real-time Search**: Instant name-based filtering.
- **Favorites**: Star your most important contacts for quick access.
- **Smart Tags**: Organize contacts into multiple groups (Work, Family, Friends, etc.).
- **Dynamic Avatars**: Initials-based avatars with deterministic color generation.
- **Responsive UI**: Glassmorphism design that looks great on any device.

## Tech Stack

### Backend
- **Spring Boot 3.2**: REST API and business logic.
- **Spring Security**: JWT authentication and authorization.
- **Spring Data JPA**: Hibernate-based database operations.
- **MySQL**: Relational database storage.
- **Validation**: Jakarta Bean Validation for robust data integrity.

### Frontend
- **React 18**: Component-based UI development.
- **Tailwind CSS**: Modern utility-first styling.
- **Vite**: Ultra-fast build tool.
- **Axios**: HTTP client for API communication.
- **Lucide React**: Beautiful iconography.
- **React Router**: Client-side navigation.

## Setup Instructions

### Prerequisites
- Java 21+
- Node.js 18+
- MySQL 8+
- Maven (optional, use IDE)

### Database Setup
1. Create a MySQL database named `contact_manager`.
2. Update `backend/src/main/resources/application.properties` with your MySQL credentials.

### Backend Setup
1. Navigate to the `backend` folder.
2. Run `mvn spring-boot:run` or run `ContactManagerApplication.java` from your IDE.
3. The server will start on `http://localhost:8080`.

### Frontend Setup
1. Navigate to the `frontend` folder.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open your browser at `http://localhost:5173`.

## Folder Structure

```text
contact-manager/
├── backend/            # Spring Boot Project
│   ├── src/main/java/  # Java Source Code
│   └── pom.xml         # Maven Dependencies
└── frontend/           # React Project
    ├── src/            # React Source Code
    └── package.json    # Node Dependencies
```
