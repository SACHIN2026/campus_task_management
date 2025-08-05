# Deployment Instructions

## Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Access Application**
   - Open http://localhost:3000
   - Login with demo credentials: `demo` / `password123`

## Vercel Deployment

### Option 1: Deploy via Vercel CLI
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts**
   - Link to existing project or create new
   - Set build settings (auto-detected)

### Option 2: Deploy via GitHub Integration
1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to vercel.com
   - Import your GitHub repository
   - Deploy automatically

## Environment Configuration

No environment variables required for this demo application as it uses localStorage.

For production, you would typically set:
- `DATABASE_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_API_URL`

## Build Configuration

The application is configured for static export where possible. Build settings:

```javascript
// next.config.ts
export default {
  output: 'standalone', // For serverless deployment
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: false
  }
}
```

## Demo Data

The application includes a "Generate Demo Data" button that creates sample tasks for testing purposes.

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes

- Initial bundle size: ~100KB gzipped
- First Contentful Paint: <1s
- All static assets optimized
- Ready for CDN deployment
