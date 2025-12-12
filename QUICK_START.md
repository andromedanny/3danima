# 🚀 Quick Start - How to Start Your Website

## Step 1: Open Terminal/PowerShell

**Windows:**
- Right-click in your project folder
- Select "Open in Terminal" or "Open PowerShell here"
- Or press `Shift + Right-click` → "Open PowerShell window here"

**Mac/Linux:**
- Right-click in folder → "Open in Terminal"
- Or open Terminal and `cd` to your project folder

---

## Step 2: Start the Server

### Option A: Using npm (Recommended)
```bash
npm run serve
```

### Option B: Using Python (If npm doesn't work)
```bash
python -m http.server 8080
```

### Option C: Using the Batch File (Windows)
Double-click: **RUN_SERVER.bat**

### Option D: Using PowerShell Script (Windows)
Right-click **RUN_SERVER.ps1** → "Run with PowerShell"

---

## Step 3: Open Your Browser

Go to: **http://localhost:8080**

---

## Step 4: Test It!

1. Type **"hello"** in the text box
2. Click **"Translate"** button
3. You should see the 3D character perform the sign!

---

## ✅ That's It!

Your website is now running! 🎉

---

## 🐛 Troubleshooting

### "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/
**Or use:** `python -m http.server 8080`

### "Port 8080 already in use"
**Solution:** 
```bash
npx http-server -p 3000 -c-1
```
Then go to: **http://localhost:3000**

### "Cannot find module"
**Solution:**
```bash
npm install
```
Then try `npm run serve` again

### Website shows but no 3D character
**Check:**
- Make sure `assets/models/asl/hello.glb` exists
- Open browser console (F12) to see errors
- Make sure you're using `http://localhost:8080` (not `file://`)

---

## 📝 Quick Commands Reference

| What You Want | Command |
|---------------|---------|
| Start server | `npm run serve` |
| Install dependencies | `npm install` |
| Stop server | Press `Ctrl + C` in terminal |
| Check if server is running | Go to http://localhost:8080 |

---

## 🎯 Next Steps

Once your website is running:
1. ✅ Test with "hello"
2. ✅ Add more GLB files to `assets/models/asl/`
3. ✅ Update `script.js` with new signs
4. ✅ Test more signs!

---

**Need help?** Check `START_HERE.md` for more details!


