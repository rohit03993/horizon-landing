# Database Setup Guide

## Important: This is Next.js (Node.js), NOT PHP

This project uses **Next.js** (JavaScript/TypeScript), not PHP. So we use:
- **MySQL** database (same database, different connection method)
- **Node.js MySQL driver** (mysql2) instead of PHP
- **Next.js API Routes** instead of PHP files
- **No phpMyAdmin needed** - you can still use phpMyAdmin to manage the database, but the app connects via Node.js

## Database Setup Steps

### 1. Create MySQL Database

In phpMyAdmin or MySQL command line, create:

**Database Name:** `horizon_school_db`

**SQL Command:**
```sql
CREATE DATABASE horizon_school_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Create Database User

**Recommended User Name:** `horizon_school_user`

**SQL Commands:**
```sql
-- Create user
CREATE USER 'horizon_school_user'@'localhost' IDENTIFIED BY 'your_strong_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON horizon_school_db.* TO 'horizon_school_user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;
```

**For Remote/Production:**
```sql
-- If connecting from remote server
CREATE USER 'horizon_school_user'@'%' IDENTIFIED BY 'your_strong_password_here';
GRANT ALL PRIVILEGES ON horizon_school_db.* TO 'horizon_school_user'@'%';
FLUSH PRIVILEGES;
```

### 3. Database Tables

The tables will be created automatically when you run the setup script, or you can create them manually:

**Form Submissions Table:**
```sql
CREATE TABLE form_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT,
  source VARCHAR(50) DEFAULT 'website',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Admin Users Table:**
```sql
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Environment Variables

Create a `.env.local` file in the project root:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=horizon_school_db
DB_USER=horizon_school_user
DB_PASSWORD=your_strong_password_here

# JWT Secret for Admin Login (generate a random string)
JWT_SECRET=your_random_secret_key_here_min_32_chars

# Admin Default Credentials (change after first login)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change_this_password
```

### 5. Generate JWT Secret

Run this command to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as `JWT_SECRET` in `.env.local`

## Summary

- **Database Name:** `horizon_school_db`
- **Database User:** `horizon_school_user`
- **Connection:** Via Node.js (mysql2 package), not PHP
- **Management:** You can still use phpMyAdmin to view/manage data
- **API Routes:** Next.js API routes handle form submissions and logins

