# React Router Login Demo

A complete, fully functional React.js application demonstrating React Router DOM v6 navigation with a basic login system. This educational project shows the difference between **reversible encryption** (for data transmission) and **irreversible hashing** (for password storage).

## ⚠️ CRITICAL SECURITY WARNING

**THIS APPLICATION IS FOR DEMONSTRATION AND EDUCATIONAL PURPOSES ONLY!**

This project uses intentionally simplified and **INSECURE** cryptographic mechanisms to demonstrate concepts. The implementation includes:

- Hardcoded encryption keys
- Simple XOR cipher for transmission (trivially breakable)
- Basic SHA-256 hashing without salt (vulnerable to rainbow tables)
- Client-side only authentication (no real backend)
- LocalStorage for session management (not secure)
- No HTTPS enforcement
- No rate limiting or account lockout

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
- ✅ **Dual cryptography demonstration:**
  - Reversible encryption (XOR) for transmission
  - Irreversible hashing (SHA-256) for storage
- ✅ Simulated End-to-End Encryption (E2EE) concept
- ✅ Visual demos showing encryption vs hashing
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

This application demonstrates TWO different cryptographic concepts:

#### 1. **REVERSIBLE Encryption** (For Transmission - simulating HTTPS/TLS)
Used when sending data between client and "server":
- Password is encrypted with XOR cipher before transmission
- Server decrypts it to get the original password
- Simulates how HTTPS/TLS protects data in transit

#### 2. **IRREVERSIBLE Hashing** (For Storage - correct password storage)
Used when storing passwords in the database:
- Passwords are hashed with SHA-256 (one-way function)
- **Cannot be decrypted** - it's mathematically impossible to reverse
- Validation works by comparing hashes, not passwords

### Complete Authentication Flow

```
1. User enters password: "password123"
   ↓
2. CLIENT: Encrypt for transmission (XOR)
   → "SGVsbG8gV29ybGQh" (Base64)
   ↓
3. [Simulated Network Transmission]
   ↓
4. SERVER: Decrypt received data (XOR)
   → "password123" (temporarily in memory)
   ↓
5. SERVER: Hash password (SHA-256)
   → "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"
   ↓
6. SERVER: Compare with stored hash
   → Match? ✓ Login success!
   ↓
7. Store session in localStorage
```

### Why This Dual System?

**Reversible Encryption (XOR) for Transmission:**
```javascript
// Can encrypt AND decrypt
const encrypted = encryptForTransmission('myPassword');
const decrypted = decryptFromTransmission(encrypted); // Gets original back!
```
- **Purpose**: Protect data during transmission
- **Real-world equivalent**: HTTPS/TLS
- **Insecure here because**: Hardcoded key, simple XOR cipher

**Irreversible Hashing (SHA-256) for Storage:**
```javascript
// Can ONLY hash, CANNOT reverse
const hash = await hashPassword('myPassword');
// → "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"

// Try to reverse it? IMPOSSIBLE!
// No function can get "myPassword" back from the hash
```
- **Purpose**: Store passwords securely in database
- **Real-world equivalent**: bcrypt, Argon2, scrypt
- **Why it's better**: Even if database is stolen, passwords are safe
- **Still insecure here because**: No salt, plain SHA-256 (use bcrypt in production!)

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
