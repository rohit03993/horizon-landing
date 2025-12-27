# Complete Setup Guide - Step by Step

## 📍 WHERE IS THE .ENV FILE?

The `.env.local` file is in your project root folder:
```
F:\Rohit Development\Landing page\.env.local
```

**Note:** This file is hidden by default in Windows. You can see it in VS Code's file explorer.

---

## 🗄️ STEP 1: CREATE DATABASE IN phpMyAdmin

### What to do:
1. Open **phpMyAdmin** in your browser (usually `http://localhost/phpmyadmin`)
2. Click on **"SQL"** tab at the top
3. Copy and paste this SQL command:

```sql
CREATE DATABASE horizon_school_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

4. Click **"Go"** button
5. You should see: "Database `horizon_school_db` has been created"

---

## 👤 STEP 2: CREATE DATABASE USER

### What to do:
1. Still in phpMyAdmin, click on **"SQL"** tab again
2. Copy and paste these SQL commands (replace `your_password_here` with a strong password):

```sql
CREATE USER 'horizon_school_user'@'localhost' IDENTIFIED BY 'your_password_here';
GRANT ALL PRIVILEGES ON horizon_school_db.* TO 'horizon_school_user'@'localhost';
FLUSH PRIVILEGES;
```

3. Click **"Go"** button
4. You should see success messages

**Important:** Remember the password you used here - you'll need it in Step 3!

---

## 📝 STEP 3: FILL THE .ENV.LOCAL FILE

### What to do:
1. Open `.env.local` file in VS Code (it's in your project root)
2. Replace the placeholder values with your actual details:

### Required Values:

#### Database Details (from Step 1 & 2):
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=horizon_school_db
DB_USER=horizon_school_user
DB_PASSWORD=the_password_you_created_in_step_2
```

#### JWT Secret (generate one):
1. Open terminal in VS Code
2. Run this command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
3. Copy the long string it shows (example: `a1b2c3d4e5f6...`)
4. Paste it as `JWT_SECRET=that_long_string`

#### Admin Login (you choose):
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=choose_a_secure_password_here
```

**Example of complete .env.local file:**
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=horizon_school_db
DB_USER=horizon_school_user
DB_PASSWORD=MySecurePass123!

# JWT Secret for Admin Login
JWT_SECRET=a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456

# Admin Default Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=AdminPass2024!
```

---

## 📦 STEP 4: INSTALL DEPENDENCIES

### What to do:
1. Open terminal in VS Code (Terminal → New Terminal)
2. Make sure you're in the project folder
3. Run:
```bash
npm install
```
4. Wait for it to finish (may take 1-2 minutes)

---

## 🚀 STEP 5: INITIALIZE DATABASE TABLES

### What to do:
1. Make sure your MySQL server is running
2. Start the development server:
```bash
npm run dev
```
3. Wait for it to say "Ready" (usually shows `http://localhost:3000`)
4. Open a new browser tab
5. Visit this URL:
```
http://localhost:3000/api/admin/setup
```
6. You should see a JSON response like:
```json
{
  "success": true,
  "message": "Database initialized successfully",
  "username": "admin",
  "password": "change_this_password"
}
```

**This creates the database tables automatically!**

---

## ✅ STEP 6: TEST EVERYTHING

### Test Form Submission:
1. Visit `http://localhost:3000`
2. Scroll to the "Admissions Open" section
3. Fill out the form and submit
4. You should see "Thank you! We'll get back to you soon."

### Test Admin Login:
1. Visit `http://localhost:3000/admin`
2. Login with:
   - Username: `admin` (or what you set in .env.local)
   - Password: The password you set in `.env.local` (ADMIN_PASSWORD)
3. You should see the admin dashboard with form submissions

---

## 📋 SUMMARY - WHAT YOU NEED:

| Item | Value | Where to Get It |
|------|-------|----------------|
| **Database Name** | `horizon_school_db` | Create in phpMyAdmin (Step 1) |
| **Database User** | `horizon_school_user` | Create in phpMyAdmin (Step 2) |
| **Database Password** | Your choice | Set in phpMyAdmin (Step 2) |
| **JWT Secret** | Random string | Generate with Node.js command |
| **Admin Username** | `admin` (or your choice) | Set in .env.local |
| **Admin Password** | Your choice | Set in .env.local |

---

## ❓ TROUBLESHOOTING

### If database connection fails:
- Check MySQL is running
- Verify DB_PASSWORD in .env.local matches what you set in phpMyAdmin
- Check DB_USER matches the user you created

### If tables don't create:
- Make sure you visited `/api/admin/setup` URL
- Check terminal for error messages
- Verify database exists in phpMyAdmin

### If admin login doesn't work:
- Check ADMIN_USERNAME and ADMIN_PASSWORD in .env.local
- Make sure you ran the setup API first
- Try restarting the dev server after changing .env.local

---

## 🎯 NEXT STEPS AFTER SETUP:

1. ✅ Database created
2. ✅ User created
3. ✅ .env.local configured
4. ✅ Tables initialized
5. ✅ Form submissions working
6. ✅ Admin dashboard accessible

**You're all set!** 🎉

