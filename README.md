# Ed Fringe App

A React frontend for browsing and scheduling Edinburgh Festival Fringe events. Users can create an account, browse events, and build a personal schedule organised by date.

## Live App

https://ed-fringe-app.vercel.app

## Backend

This app connects to the Ed Fringe BE API. The backend repo can be found at: https://github.com/espiers13/ed-fringe-be

## Features

- Browse Edinburgh Festival Fringe events
- Search events by title or artist
- Filter events by date and genre
- Create an account and log in
- Add and remove events from a personal schedule
- Schedule organised into Today, Tomorrow, This Week, Upcoming, and Past
- Past events displayed separately with reduced opacity
- JWT authentication persisted across page refreshes

## Planned Features

- Daily timeline view showing events side by side so users can see what overlaps and plan their day
- Interactive map of venues

## Getting Started

### Prerequisites

- Node.js v18+

### Installation

1. Clone the repo:

```bash
git clone https://github.com/espiers13/ed-fringe-app.git
cd ed-fringe-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```
VITE_FESTIVAL_API_KEY=your_festival_api_key
VITE_FESTIVAL_SECRET=your_festival_secret
```

4. Run the development server:

```bash
npm run dev
```

## Pages

| Page     | Route       | Description                            |
| -------- | ----------- | -------------------------------------- |
| Home     | `/`         | Landing page                           |
| Browse   | `/browse`   | Browse and search all events           |
| Login    | `/login`    | Log in to your account                 |
| Signup   | `/signup`   | Create a new account                   |
| Schedule | `/schedule` | View and manage your personal schedule |

## Tech Stack

- **React** — UI framework
- **Vite** — build tool
- **React Router** — client-side routing
- **Axios** — API requests
- **Tailwind CSS** — styling
- **Edinburgh Festivals API** — event data
