# SimVerse App Store

The SimVerse App Store is the catalogue for Minuan and SimVerse projects.

## What's listed

- **Minuan Browser v1.0.1** — a verified Windows ZIP download from GitHub Releases.
- **Sunay Rendering Library v1.0.1** — a developer library used by Minuan. It has source code and documentation, but no standalone installer.
- **SimVerse Gateway** — included in Minuan; it is not a separate download.
- **HTML6 Workshop** — an early Minuan feature, not a full HTML6/CSS Next/JS-squared platform yet.

The catalogue only shows a download when a real release file exists.

## Technology

The catalogue uses browser-native HTML, CSS and JavaScript. It has no third-party
npm dependencies, framework, database or tracking script. Search and category
filters run in the browser.

## Local development

Requirements: Node.js 22 or newer and npm.

    npm ci
    npm run check
    npm run build

The built website is written to `dist/`. To preview it, serve that folder with
a local static-file server.

## Publish on GitHub Pages

1. Open the repository's Settings → Pages.
2. Set Build and deployment → Source to GitHub Actions.
3. Open Actions → Publish SimVerse App Store and choose Run workflow.

The published site uses the repository path `/minuan-app-store/`.

Until GitHub Pages is enabled and the publish workflow has succeeded, the
repository and its source code are available, but the public website is not live.
