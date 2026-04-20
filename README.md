# Vaidehi Goruputi Portfolio

This is a React + TypeScript portfolio built with Vite.

## Run locally

```bash
npm install
npm run dev
```

Open the local preview URL shown by Vite (usually `http://localhost:5173`).

## Deploy on Vercel (recommended)

1. Create a GitHub repository for this project.
2. Initialize git locally:

```bash
git init
git add .
git commit -m "Initial portfolio"
```

3. Push to GitHub:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
 git branch -M main
git push -u origin main
```

4. Go to [https://vercel.com](https://vercel.com) and import the repository.
5. Configure the project:
   - Framework: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
6. Deploy and copy the production URL.

## Deploy on GitHub Pages

1. Install `gh-pages`:

```bash
npm install --save-dev gh-pages
```

2. Add these fields to `package.json`:

```json
"homepage": "https://<your-username>.github.io/<repo-name>",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:

```bash
npm run deploy
```

## Links for LinkedIn

- Add your deployed URL to your profile's **website** section.
- Add the project URL to **Featured** or **About**.

## Notes

- Your app is already configured for production builds with Vite.
- If you want, I can also help create a GitHub Actions workflow for automatic deploys.
