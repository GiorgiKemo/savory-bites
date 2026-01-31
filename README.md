# Savory Bites 🍜

An elegant online restaurant ordering application built with Angular, featuring a modern UI for browsing dishes, filtering by categories, and managing shopping carts.

## Features

- 🍽️ **Browse Dishes** - View all available restaurant items with images and details
- 🔍 **Smart Filtering** - Filter by category, spiciness level, vegetarian, and nutty dishes
- 🛒 **Shopping Cart** - Add items, update quantities, and delete products
- 📍 **Scroll Position Memory** - Maintains your scroll position when navigating between pages
- 🔔 **Toast Notifications** - Real-time feedback for user actions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Angular 20.2.2 (Standalone Components)
- **Language**: TypeScript 5.9.2
- **Styling**: CSS3
- **State Management**: RxJS with BehaviorSubjects
- **HTTP Client**: Angular HttpClient
- **Backend API**: REST API at `https://restaurant.stepprojects.ge/api`

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GiorgiKemo/savory-bites.git
cd savory-bites
```

2. Install dependencies:
```bash
npm install
```

### Development Server

Run the development server:
```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

### Build for Production

Build the application for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── api.ts              # API service for backend communication
│   ├── app.ts              # Root component
│   ├── app.html            # Root template
│   ├── app.routes.ts       # Application routing
│   ├── models.ts           # TypeScript interfaces
│   ├── scroll.service.ts   # Scroll position management
│   ├── cart/               # Shopping cart module
│   ├── dishes/             # Dishes listing module
│   └── toast/              # Toast notification module
├── main.ts                 # Application bootstrap
└── styles.css              # Global styles
```

## Recent Improvements

- ✅ Fixed inverted nuts filter logic
- ✅ Improved cart deletion workflow (backend-first approach)
- ✅ Added scroll position persistence across navigation
- ✅ Implemented scroll-to-top functionality for home button

## API Integration

The application connects to a restaurant API that provides:
- Product listings with categories
- Filtering and search capabilities
- Basket/cart management
- Product and category data

## License

This project is open source and available under the MIT License.

## Author

Giorgi Kemo

