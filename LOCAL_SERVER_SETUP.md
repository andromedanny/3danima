# Local Web Server Setup

## Why You Need This

When you open `index.html` directly in your browser (using `file:///`), browsers block loading local files like GLB models due to CORS (Cross-Origin Resource Sharing) security policies. This causes errors like:

- `Access to XMLHttpRequest at 'file:///...' has been blocked by CORS policy`
- `Failed to load resource: net::ERR_FAILED`
- `Error loading model: ProgressEvent`

**Solution:** Run a local web server to serve your website over HTTP instead of `file:///`.

---

## Quick Start (Easiest Method)

### Option 1: Using Node.js (Recommended)

1. **Install dependencies** (if you haven't already):
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm run serve
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:8080
   ```

4. **Test your website** - Type "hello" and the 3D model should load!

**To stop the server:** Press `Ctrl+C` in the terminal.

---

### Option 2: Using Python (If you have Python installed)

1. **Open PowerShell or Command Prompt** in your project folder:
   ```bash
   cd "C:\Users\Mj Marquez\Desktop\3danima"
   ```

2. **Start the server**:
   ```bash
   python -m http.server 8080
   ```
   (Or `python3 -m http.server 8080` on some systems)

3. **Open your browser** and go to:
   ```
   http://localhost:8080
   ```

**To stop the server:** Press `Ctrl+C` in the terminal.

---

### Option 3: Using VS Code Live Server Extension

1. **Install the extension**:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server"
   - Click Install

2. **Start the server**:
   - Right-click on `index.html` in VS Code
   - Select "Open with Live Server"
   - Your browser will open automatically!

---

## Troubleshooting

### Port 8080 is already in use

If you see an error like "Port 8080 is already in use", try a different port:

**Node.js:**
```bash
npx http-server -p 3000 -c-1
```
Then open `http://localhost:3000`

**Python:**
```bash
python -m http.server 3000
```
Then open `http://localhost:3000`

### "npm: command not found"

Install Node.js from: https://nodejs.org/

### "python: command not found"

Python might not be installed or not in your PATH. Use Option 1 (Node.js) instead.

---

## What This Fixes

✅ **CORS errors** - Files load properly over HTTP  
✅ **GLB model loading** - 3D models display correctly  
✅ **All assets work** - Images, CSS, JavaScript all load  
✅ **Development ready** - Perfect for testing your website  

---

## Important Notes

- **Keep the server running** while you're testing your website
- **The server must be running** for the 3D models to load
- **Close the server** when you're done (Ctrl+C)
- **For production**, you'll deploy to a real web server (not needed for development)

---

## Next Steps

Once the server is running:

1. Open `http://localhost:8080` in your browser
2. Type "hello" in the text input
3. Click "Translate"
4. You should see the 3D character performing the sign! 🎉

