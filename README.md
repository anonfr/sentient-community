# Sentient Community Platform

A community platform for the Sentient Foundation that allows users to share anonymous confessions and express themselves publicly.

## Features

- **Anonymous Confessions**: Share thoughts, feedback, and suggestions anonymously
- **Public Expressions**: Share your contributions and experiences with social media handles
- **Image Upload**: Attach images to your posts
- **Real-time Updates**: Live feed updates
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Works on all devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Storage, Real-time)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### Manual Deployment

```bash
npm run build
```

The built files will be in the `dist` folder.

## Database Setup

This project uses Supabase. The database schema includes:

- `confessions` table for anonymous posts
- `role_pitches` table for public expressions
- Storage bucket for images

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
