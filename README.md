# My Terminal Portfolio

A modern, interactive terminal-style portfolio built with React, TypeScript, and Tailwind CSS. Experience a unique portfolio that feels like you're using a real terminal with authentic typing animations, command history, and interactive features.

![Terminal Portfolio Demo](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple)

## Features

### Core Features

- **Interactive Terminal Interface** - Real terminal experience with command-line interactions
- **Command History Navigation** - Use arrow keys to cycle through previous commands
- **Tab Completion** - Intelligent autocomplete for commands
- **Theme Switching** - Toggle between light and dark themes
- **Responsive Design** - Works perfectly on desktop and mobile devices

### Visual & UX

- **Typing Animations** - Watch commands type themselves in demo mode
- **Loading States** - Visual feedback during command processing
- **Matrix Effect** - Cool easter egg with animated matrix rain
- **Sound Effects** - Authentic terminal key sounds
- **Smooth Transitions** - Professional animations throughout

### Technical Features

- **Code Obfuscation** - Production builds are heavily obfuscated for security
- **Developer Tools Protection** - Advanced detection and blocking of dev tools
- **Security Headers** - Comprehensive web security implementation
- **Performance Optimized** - Fast loading with code splitting and minification

## Available Commands

| Command    | Description                                |
| ---------- | ------------------------------------------ |
| `help`     | Show all available commands                |
| `about`    | Learn about Utkarsh and his goals          |
| `projects` | View portfolio projects with descriptions  |
| `skills`   | Display technical skills and technologies  |
| `contact`  | Get contact information and social links   |
| `clear`    | Clear the terminal screen                  |
| `ls`       | List all available commands                |
| `pwd`      | Show current directory                     |
| `date`     | Display current date and time              |
| `whoami`   | Show current user                          |
| `theme`    | Switch between light/dark themes           |
| `matrix`   | Cool matrix rain effect (easter egg)       |
| `fortune`  | Get random programming quotes              |
| `neofetch` | Display system information                 |
| `demo`     | Run interactive demo with typing animation |

## Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### UI Components

- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

### Development Tools

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/utkarsh/terminal-portfolio.git
cd terminal-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

### Development

```bash
npm run dev
```

Opens the development server at `http://localhost:8080`

### Production Build

```bash
npm run build
```

Creates optimized production build in `dist/` folder

### Code Quality

```bash
npm run lint
```

Runs ESLint to check code quality

## Customization

### Adding New Commands

1. Add your command to the `COMMANDS` object in `src/components/Terminal.tsx`
2. Update the help command to include your new command
3. Add any necessary styling or animations

### Theme Customization

- Modify colors in `src/index.css` under the `:root` and `.dark` selectors
- Add new theme variables as needed
- Update the theme switching logic in the Terminal component

### Styling

- All styles use Tailwind CSS classes
- Custom CSS variables for terminal colors
- Responsive design with mobile-first approach

## Security Features

### Production Security

- **Code Obfuscation** - JavaScript code is heavily obfuscated
- **Console Disabled** - Console functions are nullified in production
- **Source Maps Disabled** - No source maps in production builds
- **Developer Tools Detection** - Advanced detection and blocking

### Security Headers

- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## About the Developer

**Utkarsh** is a passionate BCA student from India, specializing in:

- Machine Learning & AI
- Robotics & Automation
- Web Development
- IoT & Smart Systems

### Contact

- **Email**: utkarsh@example.com
- **GitHub**: [github.com/utkarsh](https://github.com/utkarsh)
- **LinkedIn**: [linkedin.com/in/utkarsh](https://linkedin.com/in/utkarsh)

## Acknowledgments

- **Radix UI** for accessible components
- **Tailwind CSS** for the utility-first styling
- **Vite** for the fast development experience
- **React Team** for the amazing framework

---

**Star this repository if you found it helpful!**
