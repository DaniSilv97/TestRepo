# React Router Login Demo

A complete, fully functional React.js application demonstrating React Router DOM v6 navigation with a basic login system using custom "encryption" for educational purposes.

## ⚠️ CRITICAL SECURITY WARNING

**THIS APPLICATION IS FOR DEMONSTRATION AND EDUCATIONAL PURPOSES ONLY!**

This project uses intentionally simplified and **INSECURE** "encryption" mechanisms to demonstrate concepts. The implementation includes:

- Hardcoded encryption keys
- Simple XOR cipher (trivially breakable)
- Client-side only authentication (no real backend)
- LocalStorage for session management (not secure)
- No HTTPS enforcement
- No real password hashing

**NEVER USE THIS CODE IN PRODUCTION OR FOR REAL APPLICATIONS!**

For production applications, you must:
- Use proper authentication services (OAuth, Auth0, Firebase, etc.)
- Implement server-side authentication with secure password hashing (bcrypt, Argon2)
- Use HTTPS/TLS for all communications
- Employ proper session management and CSRF protection
- Never store sensitive data in localStorage
- Use industry-standard encryption libraries
- Follow OWASP security guidelines

## Features

- ✅ React 18 with modern hooks
- ✅ React Router DOM v6 for navigation
- ✅ Protected routes with authentication
- ✅ Custom Authentication Context
- ✅ Login/Register functionality
- ✅ Custom "encryption" demonstration (XOR cipher)
- ✅ Simulated End-to-End Encryption (E2EE) concept
- ✅ Responsive design
- ✅ Persistent sessions (localStorage)
- ✅ Clean, modern UI with gradient styling

## Project Structure

```
react-router-login-demo/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx    # Route protection component
│   ├── context/
│   │   └── AuthContext.jsx       # Authentication state management
│   ├── pages/
│   │   ├── Home.jsx              # Public home page
│   │   ├── Login.jsx             # Login/register page
│   │   └── Dashboard.jsx         # Protected dashboard page
│   ├── utils/
│   │   └── simpleEncryption.js   # Custom "encryption" utilities
│   ├── App.jsx                   # Main app component with router
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.js               # Vite configuration
└── README.md                     # This file
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TestRepo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Demo Credentials

The application comes with pre-configured demo users:

| Username | Password    |
|----------|-------------|
| demo     | password123 |
| admin    | admin456    |
| user     | test789     |

You can also register new users through the application (they will only persist in the browser's localStorage).

## How It Works

### Authentication Flow

1. **Login/Register**: User enters credentials on the Login page
2. **"Encryption"**: Password is "encrypted" using XOR cipher client-side
3. **Validation**: Encrypted input is compared with stored encrypted password
4. **Session**: On success, user data is stored in localStorage
5. **Protected Routes**: Dashboard requires authentication to access
6. **Logout**: Clears session data from localStorage

### Custom "Encryption" Mechanism

The application uses a simple XOR cipher for demonstration:

```javascript
// Encryption: Plain text → XOR with key → Base64 encoding
const encrypted = encryptPassword('myPassword');

// Decryption: Base64 decode → XOR with key → Plain text
const decrypted = decryptPassword(encrypted);
```

**Why this is insecure:**
- Fixed, hardcoded key that never changes
- XOR cipher is symmetric and easily reversible
- Key is visible in client-side JavaScript
- No salt, no key derivation function
- Vulnerable to frequency analysis and known-plaintext attacks

### React Router v6 Features

- **BrowserRouter**: HTML5 history API for clean URLs
- **Routes & Route**: Declarative route configuration
- **Protected Routes**: Higher-order component pattern
- **Navigation**: Programmatic navigation with `useNavigate`
- **Location State**: Passing data between routes
- **Redirect After Login**: Returns user to intended page

### Context API

The application uses React Context for global authentication state:

```javascript
const { user, login, logout, isAuthenticated } = useAuth();
```

## Learning Objectives

This project demonstrates:

1. **React Router v6** - Modern routing patterns
2. **Authentication Flow** - Login/logout mechanics
3. **Protected Routes** - Route guards and redirects
4. **Context API** - Global state management
5. **Custom Hooks** - `useAuth()` hook pattern
6. **Encryption Concepts** - Why real encryption matters
7. **Security Awareness** - Common vulnerabilities to avoid

## Common Issues

### Port Already in Use
If port 3000 is busy, modify `vite.config.js`:
```javascript
server: {
  port: 3001 // Change to different port
}
```

### Dependencies Not Installing
Try clearing cache:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Technologies Used

- **React 18** - UI library
- **React Router DOM v6** - Client-side routing
- **Vite** - Build tool and dev server
- **Vanilla CSS** - Styling (no framework dependencies)

## Future Enhancements (Educational)

If you want to extend this project for learning:

- Add password strength validation
- Implement "remember me" functionality
- Add user profile pages
- Create more protected routes
- Add loading states and error boundaries
- Implement token refresh mechanism simulation
- Add form validation with libraries like Formik or React Hook Form

## Resources for Real Authentication

To learn proper authentication:

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Auth0 Documentation](https://auth0.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [NextAuth.js](https://next-auth.js.org/)
- [Passport.js](http://www.passportjs.org/)

## License

This project is for educational purposes. Feel free to use and modify for learning.

## Disclaimer

This code is intentionally vulnerable and insecure. It is designed to teach concepts, not provide production-ready code. The authors are not responsible for any misuse of this code. Always consult security professionals and use established security libraries for production applications.
