# SimVerse App Store

The SimVerse App Store is the catalogue for Minuan and SimVerse projects.

## What's listed

- Minuan Browser v1.0.1 — the verified Windows ZIP download currently available from GitHub Releases.
- Sunay Rendering Library v1.0.1 — a developer library used by Minuan. It has source code and documentation, but no standalone installer.
- SimVerse Gateway — included in Minuan; it is not a separate download.
- HTML6 Workshop — an early Minuan feature, not a full HTML6/CSS Next/JS-squared platform yet.

The catalogue deliberately links only to releases and source pages that exist. It does not invent download buttons for projects without a package.

## Local development

Requirements: Node.js 22 or newer and npm.

    npm ci
    npm run check
    npm run build
    npm run dev

## Publish on GitHub Pages

1. Open the repository's Settings → Pages.
2. Set Build and deployment → Source to GitHub Actions.
3. Open Actions → Publish SimVerse App Store and choose Run workflow.

The published site uses the repository path /minuan-app-store/.

Until GitHub Pages has been enabled and the publish workflow has succeeded, the repository and its source code are available here, but the public catalogue website is not yet live.
