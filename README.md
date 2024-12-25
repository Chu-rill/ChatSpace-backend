### **Backend README**

<!-- ```md -->

# Express Template TS

An Express.js project template to kickstart your Node.js applications with a basic setup.

## Features

**Express.js:** A minimalist web framework for Node.js.
**ESLint:** For linting JavaScript code.
**Pre-configured Routes:** Basic routing setup to get started with.
**Environment Variables:** Uses .env file for environment configuration.
**Nodemon:** For auto-restarting the server during development.

# Project Structure

```bash
express-template-ts/
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── error
│   │   ├── error.ts
│   │   └── validation.error.ts
│   ├── index.ts
│   ├── middleware
│   │   ├── jwt.ts
│   │   └── ValidationMiddleware.ts
│   ├── models
│   │   └── User.ts
│   ├── repositories
│   │   └── user.repository.ts
│   ├── routes
│   │   ├── auth.routes.ts
│   │   └── user.routes.ts
│   ├── service
│   │   └── user.service.ts
│   ├── types
│   │   └── types.d.ts
│   ├── utils
│   │   ├── db.ts
│   │   ├── email.ts
│   │   └── encryption.ts
│   ├── validation
│   │   └── auth.validation.ts
│   └── views
│       ├── forgetPassword.handlebars
│       ├── welcome.hbs
│       └── welcomeMessage.handlebars
├── tsconfig.json
└── vercel.json
```

# Prerequisites

1. Node.js (v14 or higher)
2. NPM or Yarn

# Installation

1. Clone the repository:

```bash
git clone https://github.com/Chu-rill/express-template-js.git

```

2. Navigate to the project directory:

```bash
cd express-template-js
```

3. Install dependencies:

```bash
npm install
```

4. Create a .env file based on the .env.example:

```bash
cp .env.example .env
```

5. Start the development server:

```bash
npm run dev
```

# Usage

1. Open http://localhost:{PORT} in your browser to see the app running.
2. Customize routes by modifying files in the routes/ folder.

# Available Scripts

1. **npm start:** Starts the server in production mode.
2. **npm run dev:** Starts the server with Nodemon for auto-reloading during development.

# License

This project is licensed under the MIT License.
