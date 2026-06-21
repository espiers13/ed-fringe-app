# Edinburgh Fringe Scheduling App

A React frontend for browsing and scheduling Edinburgh Festival Fringe events. Users can create an account, browse and search events, see what's nearby on a map, and build a personal schedule organised by day, with a timeline view for spotting overlapping shows.

## Backend

This app connects to the Ed Fringe BE API. The backend repo can be found at: https://github.com/espiers13/ed-fringe-be

## Features

- Browse Edinburgh Festival Fringe events, pulled live from the Edinburgh Festivals API
- Search events by title or artist
- Filter events by date and genre
- Interactive Google Map of venues with genre-coloured markers and an info window per event
- "Nearby" browsing using the browser's geolocation to show events close to the user, with distance shown on each card
- Create an account and log in, with JWT authentication persisted across page refreshes
- Forgot password / reset password flow, sending a reset link by email via Mailgun
- Add and remove events from a personal schedule
- Schedule organised into Today, Tomorrow, This Week, Upcoming, and Past
- Daily timeline view that lays events out side by side, automatically splitting overlapping shows into columns so you can see clashes at a glance
- Past events displayed separately with reduced opacity

## Getting Started

### Prerequisites

- Node.js v18+
- A running instance of the [Ed Fringe BE](https://github.com/espiers13/ed-fringe-be) API
- A Google Maps API key (for the venue map and nearby browsing)
- Edinburgh Festivals API credentials

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
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Run the development server:

```bash
npm run dev
```

## Project Structure
 
```
src/
├── api/             # Axios calls to the Ed Fringe BE and Festivals API
├── assets/          # Static icons (list/map view toggles)
├── components/       # Reusable UI: Header, Footer, Map, ScheduleCard,
│                     # DailySchedule (timeline), ForgotPassword, filters, etc.
├── context/          # UserContext for auth state (user, token, login/logout)
├── pages/             # Route-level pages: Homepage, Browse, NearbyBrowse,
│                     # Login, SignUp, Schedule
├── utils/             # Helpers (genre colour mapping, distance calculation)
├── App.jsx           # Route definitions and protected route wrapper
└── main.jsx          # App entry point
```


## Pages

| Page          | Route          | Description                                          |
| ------------- | -------------- | ----------------------------------------------------- |
| Home          | `/`            | Landing page                                          |
| Browse        | `/browse`      | Browse and search all events, with date/genre filters |
| Nearby Browse | `/nearbybrowse`| Map and list view of events near the user's location  |
| Login         | `/login`       | Log in to your account, with a forgot password option |
| Signup        | `/signup`      | Create a new account                                  |
| Schedule      | `/schedule`    | View and manage your personal schedule (protected)    |

## Tech Stack

- **React** — UI framework
- **Vite** — build tool
- **React Router** — client-side routing
- **Axios** — API requests
- **Tailwind CSS** — styling
- **@react-google-maps/api** — venue map and nearby browsing
- **Edinburgh Festivals API** — event data, with HMAC-SHA1 request signing
- **Ed Fringe BE** — custom Express/PostgreSQL backend for auth, scheduling, and password reset (Mailgun)
