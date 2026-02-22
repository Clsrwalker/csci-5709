# Tutorial 3: Front-End Frameworks II

This submission implements a multi-view React application with client-side routing and asynchronous API integration. The app includes a login page, a profile listing page with search filtering, and a profile detail page.

- Date Created: 20 Feb 2026
- Last Modification Date: 21 Feb 2026
- Lab URL: https://csci5709t3xl.netlify.app/login
- Git URL (GitHub): https://github.com/Clsrwalker/csci-5709/tree/main/csci5709/tutorials/tutorial3
- Git URL (GitLab): https://git.cs.dal.ca/xiangl/csci-5709/-/tree/main/csci5709/tutorials/tutorial3?ref_type=heads

## Author

- Xiang Li (B00876018)

## Getting Started

### Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm 9+

### Installing and Running Locally

1. Open terminal in `csci5709/tutorials/tutorial3`.
2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open the local URL shown in the terminal (normally `http://localhost:5173`).

## API Features Implemented

- Login request:
  - `POST https://express-t4.onrender.com/api/login`
  - Sends frontend form values as JSON body:
    - `username` (from Email field)
    - `password`
- Profile listing:
  - `GET https://express-t4.onrender.com/api/users`
  - Displays users in card/grid layout with profile image.
- Profile detail:
  - `GET https://express-t4.onrender.com/api/users/:id`
  - Navigates from list item click and renders selected user details.
- Search filter:
  - Filters users by first name or last name from the listing page search box.

## Running Checks

- Production build check:

```bash
npm run build
```

## Deployment

Deployed using Netlify with these settings:

- Branch: `main`
- Base directory: `csci5709/tutorials/tutorial3`
- Build command: `npm run build`
- Publish directory: `dist`

## Built With

- React
- Vite
- React Router DOM

## Sources Used

- No third-party code snippets were directly copied into this project.
- External API endpoints were provided by course instructions.

## Artificial Intelligence Tools Used

- Tool: ChatGPT
- Use: Assisted with project scaffolding, component structuring, and README drafting.


## Acknowledgments

- Course instructor and TAs for assignment specifications and API endpoints.