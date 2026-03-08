# Smart Parking Frontend

A futuristic, dynamic, and state-of-the-art React frontend for the Smart Parking Space Monitoring System. This application provides real-time monitoring, deep learning model training interfaces, and comprehensive analytics for parking space management.

## Features

- **Futuristic UI**: Glassmorphism, animated gradients, and bubbly design elements inspired by modern aesthetics.
- **Dashboard**: Real-time live feed overview with dynamic status indicators and key metrics.
- **Training Portal**: Interface for training deep learning models, configuring hyperparameters, and selecting dataset sources.
- **Analytics**: Beautiful recharts-based visualizations for parking occupancy trends.
- **Interactive Layout**: Smooth animations, top-level pill-based navigation, and interactive terminal logs.

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: CSS animations & Framer Motion (if applicable)
- **Charts**: [Recharts](https://recharts.org/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- `npm` or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nikunjagarwal05/deep-learning-capstone-frontend.git
   cd deep-learning-capstone-frontend/smart-parking-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```text
smart-parking-frontend/
├── src/
│   ├── components/    # Reusable UI components (Sidebar, TopNav, Form elements)
│   ├── pages/         # Page views (Dashboard, TrainingPortal, Analytics, etc.)
│   ├── index.css      # Global styles and tailwind config
│   ├── main.tsx       # Entry point
│   └── App.tsx        # Main application routing and layout
├── public/            # Static assets
└── ...
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests. Ensure all code follows the project's design language and passes linting checks.
