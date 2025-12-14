# Deploy "Hear Me in Signs" to Vercel

## Step-by-Step Guide

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Prepare Your Project**
   - Make sure all your files are ready
   - Ensure `index.html` is in the root directory
   - All assets (GLB files, CSS, JS) are in their respective folders

2. **Create a GitHub Repository** (if you haven't already)
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Hear Me in Signs"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in (you can use GitHub account)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it as a static site
   - Click "Deploy"

4. **Configure Settings** (if needed)
   - Framework Preset: **Other**
   - Root Directory: `.` (root)
   - Build Command: Leave empty (static site)
   - Output Directory: `.` (root)
   - Install Command: Leave empty

5. **Wait for Deployment**
   - Vercel will build and deploy your site
   - You'll get a URL like: `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose your project settings
   - Vercel will deploy your site

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Important Notes:

1. **File Size Limits**
   - Vercel has a 100MB limit per file
   - Your GLB files should be under this limit
   - If files are too large, consider:
     - Compressing GLB files
     - Using a CDN for large assets
     - Splitting large files

2. **Asset Paths**
   - Make sure all paths in your code are relative (e.g., `assets/models/asl/hello.glb`)
   - Don't use absolute paths starting with `/`

3. **Environment Variables** (if needed later)
   - Go to Project Settings → Environment Variables
   - Add any API keys or secrets

4. **Custom Domain** (optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Troubleshooting:

- **404 Errors**: Check that `vercel.json` is configured correctly
- **Large Files**: Consider using Vercel's Large Files feature or external CDN
- **CORS Issues**: Vercel handles CORS automatically for static files
- **Build Errors**: Check Vercel build logs in the dashboard

### After Deployment:

Your site will be live at: `https://your-project-name.vercel.app`

You can also set up:
- **Automatic Deployments**: Every push to main branch auto-deploys
- **Preview Deployments**: Every PR gets a preview URL
- **Analytics**: Enable in Vercel dashboard
- **Custom Domain**: Add your own domain name


