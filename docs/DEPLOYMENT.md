# Publishing the SimVerse App Store

GitHub Pages is currently not enabled for this repository. The website code and
publish workflow are ready, but the public URL will not work until Pages is
turned on in the repository settings.

1. Open https://github.com/Minuan-org/minuan-app-store/settings/pages
2. Under Build and deployment, set Source to GitHub Actions.
3. Save the setting.
4. Open the repository's Actions page.
5. Choose Publish SimVerse App Store and click Run workflow.
6. When the run succeeds, open:

   https://minuan-org.github.io/minuan-app-store/

To test changes before publishing, run npm ci, npm run check, and npm run build.
The CI workflow runs these checks for pull requests and changes pushed to main.
