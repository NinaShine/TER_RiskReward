# FrontendApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.4.

## Introduction

This project is a simple one-page web application built using the MEAN stack (MongoDB, Express.js, Angular, Node.js). It serves as a presentation page for the "Projet TER M1".

## Technologies utilisées

- Angular CLI: 19.1.4
- Angular Material: 19.1.1
- Node.js
- Express.js
- MongoDB

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd frontend/frontend-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   ng serve
   ```
5. Open your browser and navigate to `http://localhost:4200/`.

## Structure du projet

- `src/app`: Contains the main application code.
  - `app.component.*`: Main application component.
  - `data/`: Contains the data-related components.
  - `presentation/`: Contains the presentation page components.
- `src/assets`: Contains static assets.
- `src/environments`: Contains environment configuration files.

## Fonctionnalités

- Presentation page with a modern design using Angular Material.
- Data component to display data from the backend.

## Comment étendre le projet

To extend the project, you can add new components, services, or modules. Here are some examples:

### Adding a new component
1. First, navigate to app/components

2. Generate a new component:
   ```bash
   ng generate component new-component
   ```
3. Implement the component logic in the generated files.

### Adding a new service

1. Generate a new service:
   ```bash
   ng generate service new-service
   ```
2. Implement the service logic in the generated files.
3. Inject the service into the required components or modules.
 
## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
