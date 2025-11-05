# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run deploy`          | Build and deploy to Cloudflare Pages             |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Deployment

This project is configured to deploy to **Cloudflare Pages/Workers**.

### How to know where it deploys?

1. **Check `astro.config.mjs`**: The `adapter: cloudflare()` indicates Cloudflare deployment
2. **Check `wrangler.jsonc`**: This is Cloudflare's configuration file

### Deployment Options:

**Option 1: Manual deployment with Wrangler CLI**
```bash
# First, install Wrangler globally (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build and deploy
npm run deploy
```

**Option 2: Automatic deployment via Cloudflare Dashboard**
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to Pages
3. Connect your Git repository
4. Cloudflare will automatically deploy on every push to your main branch

### 📍 How to locate/access your deployed project?

**1. Via Cloudflare Dashboard:**
- Go to: https://dash.cloudflare.com/
- Click on **"Workers & Pages"** in the left sidebar
- Click on **"Pages"**
- Find your project **"landing"**
- Click on it to see:
  - **Production URL**: Your main production site (usually `landing.pages.dev`)
  - **Preview deployments**: All your preview deployments with unique URLs
  - **Deployment history**: All past deployments

**2. Via Wrangler CLI:**
```bash
# List all your Pages projects
wrangler pages project list

# Get deployment URL after deploy
# The URL is shown at the end: "Deployment complete! Take a peek over at https://..."
```

**3. Your current URLs:**
- **Preview deployments**: `https://[hash].landing-2st.pages.dev` (each deploy gets a new hash)
- **Production URL**: Check in Cloudflare Dashboard (usually `landing.pages.dev` or custom domain)

**Option 3: Using Cloudflare Workers (if configured)**
```bash
wrangler deploy
```

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
