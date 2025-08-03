# Deployment Guide

This guide will help you deploy your React portfolio to Vercel or GitHub Pages.

## Issues Fixed

The following issues that commonly cause blank pages have been resolved:

1. **Content Security Policy (CSP)** - Made less restrictive to allow necessary resources
2. **Security Measures** - Made less aggressive in production to prevent interference
3. **Routing Configuration** - Added proper routing for single-page applications
4. **Build Configuration** - Optimized for production deployment

## Deploy to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   npm run deploy:vercel
   ```

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect it's a Vite project and deploy

## Deploy to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: "18"
         - run: npm ci
         - run: npm run build:prod
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. Push to main branch to trigger deployment

### Option 2: Manual Deployment

1. Build the project:

   ```bash
   npm run build:prod
   ```

2. Push the `dist` folder to a `gh-pages` branch

## Troubleshooting

### If you still see a blank page:

1. **Check Browser Console** - Look for JavaScript errors
2. **Check Network Tab** - Ensure all resources are loading
3. **Verify Build Output** - Make sure the build completed successfully
4. **Check Routing** - Ensure the routing configuration is correct

### Common Issues:

1. **CSP Errors** - The Content Security Policy has been relaxed, but check browser console for any remaining issues
2. **Missing Assets** - Ensure all assets are in the `public` folder
3. **Routing Issues** - The GitHub Pages routing script should handle this automatically

### For Vercel:

- Check the Vercel deployment logs
- Ensure `vercel.json` is in the root directory
- Verify the build command is correct

### For GitHub Pages:

- Check GitHub Actions logs
- Ensure the repository is public (for free accounts)
- Verify the GitHub Pages source is set to the correct branch

## Environment Variables

If you need to add environment variables:

### Vercel:

- Add them in the Vercel dashboard under Project Settings > Environment Variables

### GitHub Pages:

- Add them in GitHub repository Settings > Secrets and variables > Actions

## Performance Optimization

The build is already optimized with:

- Code splitting
- Minification
- Tree shaking
- Asset optimization

## Security

Security measures are now:

- Active in development mode
- Relaxed in production to prevent deployment issues
- Still provide basic protection without breaking functionality
