# Contact Manager

A premium full-stack contact management application built with Spring Boot, React, and Tailwind CSS. This application provides a secure, user-friendly platform for managing personal and professional contacts with advanced features like tagging, favorites, and real-time search.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Setup Instructions](#setup-instructions)
- [Usage Guide](#usage-guide)
- [Authentication & Security](#authentication--security)
- [Contributing](#contributing)

---

## 🎯 Project Overview

**Contact Manager** is a full-stack web application designed to help users efficiently manage their contacts. Whether you're organizing business contacts or keeping track of family and friends, this application provides all the necessary tools with a modern, responsive interface.

### Key Highlights:
- **User-Centric Design**: Each user has their own secure workspace with their contacts
- **JWT-Based Security**: Secure authentication using JSON Web Tokens (JWT)
- **Modern Architecture**: RESTful API backend with a reactive React frontend
- **Responsive UI**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Operations**: Instant search and filtering of contacts
- **Organized Management**: Tag-based organization for better contact grouping

---

## ✨ Features

### 1. **Secure Authentication**
   - JWT login and registration system
   - Secure token-based authentication
   - Automatic session management
   - Logout functionality with token invalidation

### 2. **Contact Management**
   - **Create Contacts**: Add new contacts with name, email, phone, and address
   - **Read Contacts**: View all your contacts in an organized list
   - **Update Contacts**: Edit contact information anytime
   - **Delete Contacts**: Remove contacts you no longer need
   - **Full CRUD Operations**: Complete Create, Read, Update, Delete functionality

### 3. **Real-time Search**
   - Instant name-based filtering
   - Search as you type functionality
   - Quick access to frequently used contacts

### 4. **Favorites System**
   - Mark important contacts as favorites
   - Easy access to favorite contacts with dedicated favorites page
   - Toggle favorite status with a single click

### 5. **Smart Tags Organization**
   - Create custom tags (Work, Family, Friends, VIP, etc.)
   - Assign multiple tags to a single contact
   - Filter contacts by tag
   - Better organization and categorization of contacts

### 6. **Dynamic Avatar System**
   - Automatically generated avatars based on contact initials
   - Deterministic color generation for consistent avatars
   - No need to upload profile pictures

### 7. **Responsive UI Design**
   - Modern glassmorphism design
   - Beautiful and intuitive user interface
   - Mobile-first responsive layout
   - Works perfectly on all screen sizes

### 8. **User Isolation**
   - Each user has access only to their own contacts
   - Secure separation of user data
   - Privacy by design

---

## 💻 Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 21 | Programming language |
| **Spring Boot** | 3.2.5 | REST API framework |
| **Spring Security** | Latest | Authentication & Authorization |
| **Spring Data JPA** | Latest | Database abstraction layer |
| **Hibernate** | Latest | ORM framework |
| **MySQL** | 8+ | Relational database |
| **JJWT** | 0.11.5 | JWT token generation & validation |
| **Jakarta Bean Validation** | Latest | Input validation |
| **Lombok** | Latest | Boilerplate code reduction |
| **Maven** | Latest | Build automation tool |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.5 | UI library |
| **React Router** | 7.15.0 | Client-side routing |
| **Vite** | 8.0.10 | Frontend build tool |
| **Tailwind CSS** | 3.4.19 | Utility-first CSS framework |
| **Axios** | 1.16.0 | HTTP client |
| **Lucide React** | 1.14.0 | Icon library |
| **PostCSS** | 8.5.14 | CSS transformation |

---

## 📁 Project Structure

```text
contact-manager/
│
├── backend/                           # Spring Boot Backend
│   ├── src/main/
│   │   ├── java/com/contactmanager/
│   │   │   ├── config/               # Configuration classes
│   │   │   │   └── CorsConfig.java   # CORS configuration
│   │   │   │
│   │   │   ├── controller/           # REST API Controllers
│   │   │   │   ├── AuthController.java    # Authentication endpoints
│   │   │   │   ├── ContactController.java # Contact endpoints
│   │   │   │   └── TagController.java     # Tag endpoints
│   │   │   │
│   │   │   ├── service/              # Business logic services
│   │   │   │   ├── AuthService.java  # Authentication logic
│   │   │   │   ├── ContactService.java # Contact management logic
│   │   │   │   └── TagService.java   # Tag management logic
│   │   │   │
│   │   │   ├── model/                # JPA Entity models
│   │   │   │   ├── User.java         # User entity
│   │   │   │   ├── Contact.java      # Contact entity
│   │   │   │   └── Tag.java          # Tag entity
│   │   │   │
│   │   │   ├── repository/           # Data access layer
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── ContactRepository.java
│   │   │   │   └── TagRepository.java
│   │   │   │
│   │   │   ├── dto/                  # Data Transfer Objects
│   │   │   │   ├── AuthResponse.java
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── RegisterRequest.java
│   │   │   │   ├── ContactRequest.java
│   │   │   │   ├── ContactResponse.java
│   │   │   │   ├── TagRequest.java
│   │   │   │   └── TagResponse.java
│   │   │   │
│   │   │   ├── security/             # Security & JWT
│   │   │   │   ├── JwtUtil.java      # JWT token utilities
│   │   │   │   ├── JwtAuthFilter.java # JWT authentication filter
│   │   │   │   ├── SecurityConfig.java # Spring Security configuration
│   │   │   │   └── UserDetailsServiceImpl.java # Custom user details service
│   │   │   │
│   │   │   ├── exception/            # Exception handling
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   └── ResourceNotFoundException.java
│   │   │   │
│   │   │   └── ContactManagerApplication.java # Main application class
│   │   │
│   │   └── resources/
│   │       └── application.properties # Application configuration
│   │
│   ├── target/                       # Compiled classes (generated)
│   └── pom.xml                       # Maven dependencies
│
└── frontend/                         # React Frontend
    ├── src/
    │   ├── pages/                    # Page components
    │   │   ├── LoginPage.jsx         # Login page
    │   │   ├── RegisterPage.jsx      # User registration
    │   │   ├── ContactListPage.jsx   # Main contacts list
    │   │   ├── AddEditContactPage.jsx # Add/Edit contact page
    │   │   ├── FavoritesPage.jsx     # Favorites page
    │   │   └── TagsPage.jsx          # Tags management page
    │   │
    │   ├── components/               # Reusable components
    │   │   ├── Navbar.jsx            # Navigation bar
    │   │   ├── ContactCard.jsx       # Contact card component
    │   │   ├── SearchBar.jsx         # Search functionality
    │   │   ├── Avatar.jsx            # Avatar component
    │   │   └── TagBadge.jsx          # Tag display component
    │   │
    │   ├── services/                 # API service layer
    │   │   ├── api.js                # Axios instance with interceptors
    │   │   ├── authService.js        # Authentication API calls
    │   │   ├── contactService.js     # Contact API calls
    │   │   └── tagService.js         # Tag API calls
    │   │
    │   ├── context/                  # React Context for state
    │   │   └── AuthContext.jsx       # Authentication context
    │   │
    │   ├── utils/                    # Utility functions
    │   │   └── avatarUtils.js        # Avatar generation utilities
    │   │
    │   ├── hooks/                    # Custom React hooks (if any)
    │   ├── assets/                   # Static images and assets
    │   ├── App.jsx                   # Main app component
    │   ├── main.jsx                  # React entry point
    │   └── index.css                 # Global styles
    │
    ├── public/                       # Static files
    ├── package.json                  # NPM dependencies
    └── vite.config.js                # Vite configuration
```

---

## 🗄️ Database Schema

### Tables Overview

#### **users**
Stores user account information for authentication and authorization.

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **contacts**
Stores contact information for each user.

```sql
CREATE TABLE contacts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  address VARCHAR(255),
  is_favorite BOOLEAN DEFAULT FALSE,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### **tags**
Stores custom tags created by users.

```sql
CREATE TABLE tags (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_tag (user_id, name)
);
```

#### **contact_tags** (Junction Table)
Maps contacts to tags (many-to-many relationship).

```sql
CREATE TABLE contact_tags (
  contact_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  PRIMARY KEY (contact_id, tag_id),
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
```

### Entity Relationships

```
User (1) ── ─────── (Many) Contact
  │                      │
  │                      └─ (Many) Tag (via contact_tags)
  │
  └─────────────── (Many) Tag
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:8080/api`

### Authentication Endpoints

#### **Register User**
- **POST** `/auth/register`
- **Request Body**:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "john_doe",
    "email": "john@example.com"
  }
  ```

#### **Login User**
- **POST** `/auth/login`
- **Request Body**:
  ```json
  {
    "username": "john_doe",
    "password": "SecurePassword123!"
  }
  ```
- **Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "john_doe",
    "email": "john@example.com"
  }
  ```

### Contact Endpoints

#### **Get All Contacts**
- **GET** `/contacts`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "address": "123 Main St, City",
      "isFavorite": true,
      "tags": ["Work", "VIP"]
    }
  ]
  ```

#### **Get Contact by ID**
- **GET** `/contacts/{id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Single contact object

#### **Create Contact**
- **POST** `/contacts`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City",
    "tags": ["Work", "VIP"]
  }
  ```
- **Response**: Created contact object with ID

#### **Update Contact**
- **PUT** `/contacts/{id}`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**: Same as Create Contact
- **Response**: Updated contact object

#### **Delete Contact**
- **DELETE** `/contacts/{id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: 200 OK

#### **Search Contacts**
- **GET** `/contacts/search?name={searchTerm}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Array of matching contacts

#### **Get Favorites**
- **GET** `/contacts/favorites`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Array of favorite contacts

#### **Toggle Favorite Status**
- **PATCH** `/contacts/{id}/favorite`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Updated contact with favorite status toggled

#### **Get Contacts by Tag**
- **GET** `/contacts/tags/{tagId}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Array of contacts with specified tag

### Tag Endpoints

#### **Get All Tags**
- **GET** `/tags`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Array of user's tags

#### **Create Tag**
- **POST** `/tags`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "name": "Work"
  }
  ```
- **Response**: Created tag object

#### **Update Tag**
- **PUT** `/tags/{id}`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**: Same as Create Tag
- **Response**: Updated tag object

#### **Delete Tag**
- **DELETE** `/tags/{id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: 200 OK

---

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Java 21+**: [Download Java](https://www.oracle.com/java/technologies/downloads/#java21)
- **Node.js 18+**: [Download Node.js](https://nodejs.org/)
- **MySQL 8+**: [Download MySQL](https://www.mysql.com/downloads/)
- **Git**: [Download Git](https://git-scm.com/)
- **Maven** (optional): Usually bundled with IDE

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/contact-manager.git
cd contact-manager
```

### Step 2: Database Setup

1. **Open MySQL Command Line** or MySQL Workbench
2. **Create the database**:
   ```sql
   CREATE DATABASE contact_manager;
   ```
3. **Configure database credentials** in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/contact_manager?createDatabaseIfNotExist=true
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```

### Step 3: Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Build the project** (using Maven or your IDE):
   ```bash
   mvn clean install
   ```

3. **Run the application**:
   - **Using Maven**:
     ```bash
     mvn spring-boot:run
     ```
   - **Using IDE**: Right-click on `ContactManagerApplication.java` and select "Run"

4. **Verify the server is running**:
   - The server will start on `http://localhost:8080`
   - Check console for "Started ContactManagerApplication"

### Step 4: Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Open your browser and go to `http://localhost:5173`
   - You should see the Contact Manager login page

### Step 5: Verify Everything Works

1. **Create a new account** on the registration page
2. **Login** with your credentials
3. **Add a contact** to test the functionality
4. **Check the browser console and backend logs** for any errors

---

## 📖 Usage Guide

### 1. **Creating an Account**

1. Navigate to the Register page
2. Enter a unique username and valid email
3. Create a strong password (recommended: mix of uppercase, lowercase, numbers, symbols)
4. Click "Register"
5. You'll be automatically logged in and redirected to the contacts page

### 2. **Logging In**

1. Go to the Login page
2. Enter your username and password
3. Click "Login"
4. You'll be taken to your contacts dashboard

### 3. **Adding a Contact**

1. Click the "Add Contact" button (usually a "+" or "Add" button)
2. Fill in the contact details:
   - **First Name** (required)
   - **Last Name** (optional)
   - **Email** (required)
   - **Phone** (optional)
   - **Address** (optional)
   - **Tags** (optional - assign existing or create new tags)
3. Click "Save" to create the contact

### 4. **Editing a Contact**

1. Click on a contact in the list
2. Click the "Edit" button
3. Modify the desired fields
4. Click "Update" to save changes

### 5. **Deleting a Contact**

1. Click on a contact
2. Click the "Delete" button
3. Confirm the deletion

### 6. **Managing Favorites**

1. Click the star icon on any contact to mark it as favorite
2. View all favorites on the "Favorites" page
3. Unstar to remove from favorites

### 7. **Using Tags**

1. Go to the Tags page
2. **Create a new tag**: Click "Add Tag" and enter a name
3. **Assign tags to contacts**: When adding/editing a contact, select tags
4. **View contacts by tag**: Click on a tag to see all contacts with that tag
5. **Delete a tag**: Click the delete icon next to a tag (won't delete contacts)

### 8. **Searching Contacts**

1. Use the search bar at the top of the contacts list
2. Type the name of the contact you're looking for
3. Results will filter in real-time
4. Clear the search to see all contacts again

---

## 🔐 Authentication & Security

### JWT (JSON Web Tokens)

The application uses JWT for stateless, secure authentication:

1. **Token Generation**: Upon successful login/registration, a JWT token is generated
2. **Token Storage**: The token is stored in browser's `localStorage`
3. **Token Transmission**: Included in all authenticated requests via `Authorization: Bearer {token}` header
4. **Token Expiration**: Tokens expire after 24 hours (configurable in `application.properties`)
5. **Token Validation**: JWT is validated on each request through `JwtAuthFilter`

### Security Features

- **Password Encryption**: Passwords are hashed using BCrypt algorithm
- **CORS Protection**: Cross-Origin Resource Sharing is configured securely
- **User Data Isolation**: Each user can only access their own contacts
- **HTTPS Ready**: Recommended to use HTTPS in production
- **Input Validation**: All inputs are validated using Jakarta Bean Validation
- **SQL Injection Prevention**: Uses parameterized queries via JPA

### JWT Token Structure

```
Header.Payload.Signature

Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "sub": "username",
  "exp": 1624569600,
  "iat": 1624483200
}
```

### Configuration

Update JWT settings in `application.properties`:
```properties
jwt.secret=YOUR_SECRET_KEY_HERE
jwt.expiration=86400000  # 24 hours in milliseconds
```

---

## 🤝 Contributing

We welcome contributions to improve Contact Manager! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Guidelines

- Follow the existing code style
- Write clear commit messages
- Include comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

### Areas for Contribution

- Bug fixes and improvements
- New features (contact photos, notes, etc.)
- UI/UX enhancements
- Performance optimizations
- Documentation improvements
- Test coverage

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🆘 Troubleshooting

### Backend Issues

**Port 8080 already in use**
```bash
# On Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :8080
kill -9 <PID>
```

**Database connection error**
- Verify MySQL is running
- Check credentials in `application.properties`
- Ensure database exists: `CREATE DATABASE contact_manager;`

**Maven build fails**
- Clear Maven cache: `mvn clean`
- Update Maven: `mvn -v` and update if necessary

### Frontend Issues

**Npm install fails**
```bash
npm cache clean --force
npm install
```

**Port 5173 already in use**
```bash
# The app will prompt for another port, or use:
npm run dev -- --port 5174
```

**CORS errors**
- Ensure backend is running on `http://localhost:8080`
- Check `CorsConfig.java` for proper configuration

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the troubleshooting section

---

## 🎉 Features Roadmap

Planned enhancements:
- Contact profile pictures
- Contact notes/additional fields
- Bulk operations
- Contact groups/categories
- Email integration
- Contact sharing between users
- Mobile app version
- Dark mode support

---

Last Updated: May 2026

