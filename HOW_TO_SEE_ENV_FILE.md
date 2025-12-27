# How to See .env.local File in VS Code

## The file exists but is HIDDEN!

Files starting with a dot (`.`) are hidden by default. Here's how to see it:

## Method 1: Enable Hidden Files in VS Code

1. In VS Code, look at the **File Explorer** (left sidebar)
2. Find the **three dots** (⋯) menu at the top of the file explorer
3. Click it and look for **"Show Hidden Files"** or **"Files: Exclude"** settings
4. Or press `Ctrl + ,` to open Settings
5. Search for: `files.exclude`
6. Make sure `.env.local` is NOT in the exclude list

## Method 2: Open Directly

1. Press `Ctrl + P` (Quick Open)
2. Type: `.env.local`
3. Press Enter
4. The file will open!

## Method 3: Use Terminal to View

In the terminal, run:
```bash
notepad .env.local
```

Or:
```bash
code .env.local
```

## Method 4: Check File Explorer Settings

1. In VS Code Settings (`Ctrl + ,`)
2. Search: `files.exclude`
3. Remove any pattern that hides `.env*` files

---

## ✅ The File is Already Created!

The `.env.local` file exists at:
```
F:\Rohit Development\Landing page\.env.local
```

Just open it using `Ctrl + P` and type `.env.local`!

