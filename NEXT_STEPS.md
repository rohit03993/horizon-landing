# Next Steps - After Creating Database

## ✅ STEP 1: CREATE DATABASE USER (Do this in phpMyAdmin)

You've created the database `horizon_school_db`. Now create a user for it.

### In phpMyAdmin:

1. Click on the **"SQL"** tab at the top
2. Copy and paste these commands (replace `your_password_here` with a strong password you choose):

```sql
CREATE USER 'horizon_school_user'@'localhost' IDENTIFIED BY 'your_password_here';
GRANT ALL PRIVILEGES ON horizon_school_db.* TO 'horizon_school_user'@'localhost';
FLUSH PRIVILEGES;
```

3. Click **"Go"** button
4. You should see success messages

**⚠️ IMPORTANT:** Remember the password you used - you'll need it for the .env file!

---

## ✅ STEP 2: UPDATE env.local FILE

1. Open `env.local` in VS Code
2. Update these lines:

```
DB_PASSWORD=the_password_you_just_created
```

Example:
```
DB_PASSWORD=MySecurePass123!
```

---

## ✅ STEP 3: GENERATE JWT SECRET

In VS Code terminal, run:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the long string it shows (example: `a1b2c3d4e5f6789...`)

Then in `env.local`, replace:
```
JWT_SECRET=the_long_string_you_copied
```

---

## ✅ STEP 4: SET ADMIN PASSWORD

In `env.local`, choose a password for admin login:

```
ADMIN_PASSWORD=your_admin_password_here
```

Example:
```
ADMIN_PASSWORD=Admin2024!
```

---

## ✅ STEP 5: COPY TO .env.local

After updating `env.local`, run this in terminal:

```bash
Copy-Item env.local .env.local -Force
```

---

## ✅ STEP 6: INSTALL DEPENDENCIES (if not done)

```bash
npm install
```

---

## ✅ STEP 7: INITIALIZE DATABASE TABLES

1. Make sure your dev server is running:
```bash
npm run dev
```

2. Wait for it to say "Ready" (shows `http://localhost:3000`)

3. Open a new browser tab and visit:
```
http://localhost:3000/api/admin/setup
```

4. You should see a JSON response like:
```json
{
  "success": true,
  "message": "Database initialized successfully"
}
```

**This creates the tables automatically!**

---

## ✅ STEP 8: TEST EVERYTHING

1. Visit `http://localhost:3000`
2. Fill out the contact form
3. Visit `http://localhost:3000/admin` to see submissions

---

## 📋 SUMMARY - What You Need to Fill:

| In env.local | What to Put |
|--------------|-------------|
| `DB_NAME=horizon_school_db` | ✅ Already correct |
| `DB_USER=horizon_school_user` | ✅ Already correct |
| `DB_PASSWORD=` | ⚠️ Put the password you create in Step 1 |
| `JWT_SECRET=` | ⚠️ Generate with node command (Step 3) |
| `ADMIN_PASSWORD=` | ⚠️ Choose your admin password (Step 4) |

---

## 🎯 Current Status:

- ✅ Database created: `horizon_school_db`
- ⏳ Next: Create database user
- ⏳ Next: Update env.local
- ⏳ Next: Initialize tables

