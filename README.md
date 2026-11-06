# Claire White — Portfolio Website

A complete, responsive portfolio template using **plain HTML, CSS, and JavaScript**. No build tools, framework, subscription, or database required.

## Quick start

1. Unzip this folder.
2. Open `index.html` in a browser to preview the site. (For best local testing, use VS Code Live Server.)
3. Edit `projects.js` to add or change projects.
4. Add screenshots/images into `assets/`.
5. Publish with GitHub Pages, Netlify, or Vercel.

## Add a project

Open `projects.js`. Copy one entire project object inside `window.PORTFOLIO_PROJECTS` and update its fields:

- `slug`: unique lowercase identifier, e.g. `my-new-project`.
- `title`, `category`, `summary`: displayed on the card.
- `cover`: image path like `assets/my-new-project.jpg`. Leave `''` to use the styled placeholder.
- `role`, `timeline`, `tools`, `overview`, `problem`, `process`, `testing`, `outcome`, `reflection`: displayed in the case study.
- `images`: extra screenshots, e.g. `[{src:'assets/my-wireframe.png',alt:'Low-fidelity wireframe of the home page'}]`.
- `links`: e.g. `[{label:'Live demo',url:'https://example.com'}]`.

Supported categories in the filter buttons: `UX/UI`, `Development`, `Graphic Design`, `Education`. To add another category, also add a filter button in `index.html`.

**Tip:** If you do not have an actual result or screenshot yet, leave a clearly labeled placeholder rather than claiming a completed outcome.

## Update your personal information

- `index.html`: homepage introduction, About section, skills, contact email, and resume path.
- `script.js`: update `socialLinks` at the bottom with your LinkedIn and GitHub URLs. Empty links stay hidden.
- `styles.css`: change `:root` color variables to change the site's palette.
- `assets/Claire_White_Resume.pdf`: replace with your latest resume, keeping the filename.

The current project text is a starting draft based on known work; verify every claim before applying. The project covers are intentionally styled placeholders, not fabricated project screenshots.

## Hosting on Vercel (recommended)

1. Create a new public or private GitHub repository.
2. Upload **the contents of this folder** to the repository root (including `index.html`).
3. Sign into https://vercel.com with GitHub and select **Add New > Project**.
4. Import the repository. Choose **Other** for framework preset, leave build command blank, and deploy.
5. Vercel provides a free `*.vercel.app` URL. Push future changes to GitHub to redeploy.

This static site can also be deployed on GitHub Pages or Netlify. If you use GitHub Pages, enable Pages under repository Settings, then deploy from the main branch root.

## Notes

- Contact uses an email link; there is no backend to maintain.
- The Google Fonts stylesheet requires internet access; the website falls back to system fonts if offline.
- Project pages open in an accessible dialog and support deep links like `#project/taniti-tourism`.
- Don't publish student information, proprietary client work, or private materials without permission.
