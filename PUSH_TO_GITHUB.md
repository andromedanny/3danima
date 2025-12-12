# 🚀 How to Push Your Project to GitHub

Follow these steps to upload your project to GitHub so you can access it from any device!

---

## Step 1: Create a GitHub Account (If You Don't Have One)

1. Go to: **https://github.com**
2. Click **"Sign up"**
3. Create your account (it's free!)

---

## Step 2: Create a New Repository on GitHub

1. Log into GitHub
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name:** `3danima` (or any name you like)
   - **Description:** "3D Sign Language Animation Website"
   - **Visibility:** Choose **Public** (free) or **Private**
   - **DO NOT** check "Initialize with README" (we already have files)
4. Click **"Create repository"**

---

## Step 3: Initialize Git in Your Project

Open PowerShell in your project folder and run these commands **one by one**:

```powershell
# Navigate to your project folder (if not already there)
cd "C:\Users\Mj Marquez\Desktop\3danima"

# Initialize git repository
git init

# Add all files (except those in .gitignore)
git add .

# Create your first commit
git commit -m "Initial commit: 3D Sign Language Animation Website"
```

---

## Step 4: Connect to GitHub and Push

After creating the repository on GitHub, you'll see a page with instructions. Use these commands:

```powershell
# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/3danima.git

# Rename main branch (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** GitHub will ask for your username and password. Use a **Personal Access Token** instead of your password:
- Go to: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token with `repo` permissions
- Use that token as your password

---

## Step 5: Verify It Worked

1. Go to your GitHub repository page
2. You should see all your files there! ✅

---

## 🎯 Quick Commands Reference

| What You Want | Command |
|---------------|---------|
| Check status | `git status` |
| Add all files | `git add .` |
| Commit changes | `git commit -m "Your message"` |
| Push to GitHub | `git push` |
| Pull from GitHub | `git pull` |
| See what changed | `git diff` |

---

## 📱 Accessing on Another Device

### On Your New Device:

1. **Install Git** (if not already):
   - Windows: https://git-scm.com/download/win
   - Mac: `brew install git` or download from git-scm.com
   - Linux: `sudo apt install git`

2. **Clone your repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/3danima.git
   cd 3danima
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm run serve
   ```

5. **Open browser:** http://localhost:8080

---

## 🔄 Making Changes and Syncing

### On Device 1 (Make Changes):
```powershell
git add .
git commit -m "Description of changes"
git push
```

### On Device 2 (Get Latest Changes):
```powershell
git pull
```

---

## ⚠️ Important Notes

### Large Files (GLB files)
- Your GLB files are large (30-35MB each)
- GitHub allows files up to 100MB
- If you get errors, consider:
  - Using **Git LFS** (Large File Storage)
  - Or storing files in cloud storage (Google Drive, Dropbox)

### Sensitive Information
- ✅ `config.php` is safe (has placeholder values)
- ❌ Never commit real passwords or API keys
- ✅ `.gitignore` already excludes sensitive files

---

## 🐛 Troubleshooting

### "Repository not found"
- Check your GitHub username is correct
- Make sure repository exists on GitHub
- Verify you have access (if private repo)

### "Authentication failed"
- Use Personal Access Token instead of password
- Or set up SSH keys (more advanced)

### "File too large"
- GLB files might be too big
- Use Git LFS: `git lfs install` then `git lfs track "*.glb"`

### "Nothing to commit"
- Your files are already committed
- Make a change first, then commit

---

## ✅ Success Checklist

- [ ] GitHub account created
- [ ] Repository created on GitHub
- [ ] Git initialized in project folder
- [ ] Files committed locally
- [ ] Connected to GitHub remote
- [ ] Files pushed to GitHub
- [ ] Can see files on GitHub website
- [ ] Can clone on another device

---

## 🎉 You're Done!

Your project is now on GitHub! You can access it from anywhere! 🚀

**Need help?** Check GitHub's official guide: https://docs.github.com/en/get-started

