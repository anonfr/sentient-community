# Maintenance Mode Guide

This guide explains how to enable and disable maintenance mode for the Sentient Community Platform.

## Quick Start

### Enable Maintenance Mode

1. **For Vercel Deployment:**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add/update environment variable: `VITE_MAINTENANCE_MODE=true`
   - Redeploy or wait for automatic deployment

2. **For Local Development:**
   ```bash
   # Create/update .env.local file
   echo "VITE_MAINTENANCE_MODE=true" >> .env.local
   
   # Restart your dev server
   npm run dev
   ```

### Disable Maintenance Mode

1. **For Vercel Deployment:**
   - Set environment variable: `VITE_MAINTENANCE_MODE=false`
   - Or remove the variable entirely
   - Redeploy

2. **For Local Development:**
   ```bash
   # Update .env.local file
   sed -i '' 's/VITE_MAINTENANCE_MODE=true/VITE_MAINTENANCE_MODE=false/' .env.local
   
   # Or remove the line entirely
   sed -i '' '/VITE_MAINTENANCE_MODE/d' .env.local
   
   # Restart your dev server
   npm run dev
   ```

## Environment Variables

Add these to your `.env.local` file or deployment environment:

```bash
# Maintenance Mode Configuration
VITE_MAINTENANCE_MODE=false                    # Set to 'true' to enable maintenance mode
VITE_MAINTENANCE_MESSAGE="Custom message"     # Optional: Custom maintenance message
VITE_MAINTENANCE_ETA="Back in 30 minutes"     # Optional: Estimated time
```

## Customization

### Custom Messages

You can customize the maintenance page by setting additional environment variables:

```bash
VITE_MAINTENANCE_MESSAGE="We're upgrading our servers to serve you better!"
VITE_MAINTENANCE_ETA="Expected completion: 2 hours"
```

### Advanced Customization

Edit `/src/components/MaintenanceMode.tsx` to:
- Change the design/layout
- Add more information
- Modify animations
- Update contact information

## Deployment Strategies

### 1. Environment Variable Method (Recommended)
- **Pros**: Quick toggle, no code changes needed
- **Cons**: Requires deployment restart
- **Best for**: Planned maintenance, quick toggles

### 2. Feature Flag Service
For more advanced use cases, consider integrating with services like:
- LaunchDarkly
- Split.io
- Unleash

### 3. Vercel Edge Config
For instant updates without redeployment:
```javascript
// Advanced: Use Vercel Edge Config for instant updates
const isMaintenanceMode = await get('maintenance_mode');
```

## Monitoring & Alerts

### Health Check Endpoint
Consider adding a health check endpoint that returns maintenance status:

```typescript
// /api/health
export default function handler(req, res) {
  const maintenanceMode = process.env.VITE_MAINTENANCE_MODE === 'true';
  
  res.status(maintenanceMode ? 503 : 200).json({
    status: maintenanceMode ? 'maintenance' : 'healthy',
    timestamp: new Date().toISOString()
  });
}
```

### Uptime Monitoring
Set up monitoring with services like:
- Pingdom
- UptimeRobot
- StatusPage.io

## Best Practices

1. **Plan Ahead**: Schedule maintenance during low-traffic periods
2. **Communicate**: Notify users in advance via social media
3. **Test First**: Always test maintenance mode in staging
4. **Monitor**: Keep an eye on error rates and user feedback
5. **Quick Recovery**: Have a rollback plan ready

## Troubleshooting

### Common Issues

1. **Maintenance mode not showing:**
   - Check environment variable spelling: `VITE_MAINTENANCE_MODE`
   - Ensure value is exactly `'true'` (string)
   - Restart development server or redeploy

2. **TypeScript errors:**
   - Ensure `src/vite-env.d.ts` includes the maintenance mode type
   - Run `npm run build` to check for build errors

3. **Styling issues:**
   - Verify Tailwind classes are available
   - Check if custom CSS is properly loaded

### Debug Commands

```bash
# Check current environment variables
npm run dev -- --mode development

# Build and preview to test production behavior
npm run build
npm run preview

# Check if maintenance mode is active
curl -I https://your-domain.com
# Should return 200 for normal mode, could add 503 for maintenance
```

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Enable Maintenance Mode
on:
  workflow_dispatch:
    inputs:
      enable:
        description: 'Enable maintenance mode'
        required: true
        default: 'true'
        type: choice
        options:
          - 'true'
          - 'false'

jobs:
  toggle-maintenance:
    runs-on: ubuntu-latest
    steps:
      - name: Update Vercel Environment Variable
        run: |
          curl -X PATCH \
            "https://api.vercel.com/v9/projects/${{ secrets.VERCEL_PROJECT_ID }}/env" \
            -H "Authorization: Bearer ${{ secrets.VERCEL_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{
              "key": "VITE_MAINTENANCE_MODE",
              "value": "${{ github.event.inputs.enable }}",
              "type": "plain",
              "target": ["production"]
            }'
```

## Contact & Support

- **Developer**: [@AnonXBT](https://x.com/AnonfrXBT)
- **Repository**: https://github.com/anonfr/sentient-community
- **Issues**: Create an issue on GitHub for bugs or feature requests
