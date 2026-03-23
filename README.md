# NeuroSense Africa

NeuroSense Africa is a comprehensive web platform dedicated to supporting children with neurodevelopmental differences, including Autism, ADHD, speech difficulties, and learning challenges. The platform is thoughtfully designed specifically for African schools, educators, and caregivers to provide accessible, culturally relevant resources and interactive tools.

## Key Features

### 1. Educational Resource Library
A structured repository of educational resources covering various neurodevelopmental topics:
- **Autism**: Understanding Autism Spectrum Condition and supporting neurodivergent learners.
- **ADHD**: Strategies for supporting focus, energy regulation, and executive function.
- **Speech Differences**: Information on stammering, articulation, and language processing challenges.
- **Learning Difficulties**: Guidance on dyslexia, dyscalculia, and other specific learning differences.

### 2. Interactive Speech Practice Activity
An engaging and warmly encouraging interactive module designed specifically for children to build confidence:
- **Visual & Audio Aids**: Associates words with images and clear pronunciation.
- **Text-to-Speech Integration**: Utilizes Web Speech API for fallback voice synthesis.
- **Positive Reinforcement**: Built-in encouragement system to reward practice and participation.

### 3. Early Access Portal
A seamless onboarding form targeted at:
- **Schools & Teachers**: Equipping educators with classroom resources.
- **Caregivers**: Providing non-diagnostic information for at-home support.
- **Integrated Backend**: Securely captures user requests and roles via Supabase.

## Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Backend/Database**: Supabase
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Language**: TypeScript

## Getting Started

### Prerequisites

You need to have Node.js and npm installed on your machine.
- Node.js (v18 or higher recommended)

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd NeuroSense-Africa
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root directory and add your Supabase credentials (referenced in `src/supabaseClient.ts` if applicable):
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *(Note: refer to `.env.example` if it exists in the repository for the exact variable names required).*

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000` (or `http://0.0.0.0:3000`).

### Building for Production

To create a production build, run:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

##  Scripts inside `package.json`

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles TypeScript and builds the app for production.
- `npm run preview`: Previews the generated production build.
- `npm run clean`: Removes the `dist` directory.
- `npm run lint`: Runs TypeScript compiler check without emitting files.

##  Vision & Mission

Our mission is to empower every child's potential in Africa. By equipping the entire ecosystem around a child's development—schools, teachers, and caregivers—with the right tools, NeuroSense Africa aims to foster an inclusive environment where neurodivergent children can thrive.

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs, feature requests, or documentation improvements.
