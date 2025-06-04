# Genetic Personality Creator

A web application that generates unique DNA sequences and RPG-style character profiles based on user names, enhanced with ethical AI insights.


![Resim5](https://github.com/user-attachments/assets/4c463eee-9c24-4c67-86fd-feb0c6dfdc30)


## Features

- **DNA Generation**: Creates unique genetic sequences using SHA-256 algorithms
- **Character Profiles**: Generates personality types, stats, strengths, and abilities
- **AI Enhancement**: Provides ethical career suggestions and growth opportunities
- **Persistent Storage**: PostgreSQL database for profile management
- **Modern UI**: Responsive design with DNA-themed animations

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: Python-based ethical character analysis
- **Deployment**: Replit

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up PostgreSQL database
4. Run the application: `npm run dev`

## How It Works

1. Enter your name in the form
2. Optional: Enable AI enhancement for detailed insights
3. Generate your unique DNA sequence and character profile
4. Explore your personality traits, strengths, and career suggestions

## AI Ethics

The AI system follows ethical guidelines to ensure:
- Positive character representation
- Diverse personality types
- Growth-oriented feedback
- Respectful language for all profiles

## API Endpoints

- `POST /api/generate-profile` - Basic character generation
- `POST /api/generate-enhanced-profile` - AI-enhanced generation

## License

MIT License
