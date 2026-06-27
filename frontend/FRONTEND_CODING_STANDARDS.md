# Frontend Coding Standards for PyarelalAI

This file defines the coding standards and development rules for the React frontend project so the codebase stays clean, readable, and consistent as it grows.

---

## 1. Project Principles

The frontend should be:

- simple to understand
- easy to extend
- consistent in design and code style
- beginner-friendly
- scalable for future features

---

## 2. File and Folder Structure

Use a predictable structure:

```text
src/
  components/
  pages/
  features/
  hooks/
  services/
  store/
  types/
  utils/
  styles/
```

### Rules

- Keep reusable UI in components/
- Keep route-level screens in pages/
- Keep feature-specific logic in features/
- Keep API calls in services/
- Keep global state in store/
- Keep helper functions in utils/

---

## 3. Naming Conventions

### Files

- Use lowercase names
- Use kebab-case for multi-word files: auth.service.ts
- Use PascalCase for React component files: Navbar.tsx

### Components

- Use PascalCase for component names
- Example: SignInPage, ProjectCard, Navbar

### Functions and variables

- Use camelCase
- Example: createProject, isAuthenticated, userData

### Constants

- Use UPPER_SNAKE_CASE
- Example: API_BASE_URL

---

## 4. Component Rules

### Keep components small

Each component should focus on one responsibility.

### Use functional components only

Prefer React functional components with hooks.

### Keep UI and logic separate when possible

- UI components should render content
- logic should live in hooks, services, or feature modules

### Reuse shared components

Do not duplicate buttons, cards, inputs, and layout wrappers across the app.

---

## 5. Styling Rules

### Use a consistent design system

- use the same spacing scale
- use the same button and input styles
- use the same yellow and white theme everywhere

### Prefer utility-first styling if using Tailwind

Keep spacing, color, and layout values consistent.

### Avoid hard-coded one-off styles everywhere

If a style is reused, make it a shared component or shared class.

---

## 6. State Management Rules

### Keep state simple

Use local state for simple UI interactions.

### Use global state only for shared data

Examples:

- auth user state
- current project state
- generation status state

### Avoid prop drilling for deeply shared state

Use context or Zustand instead of passing props through many levels.

---

## 7. API and Service Rules

### Keep API logic in services/

Do not place fetch or axios logic directly inside UI components.

### Centralize backend calls

All network requests should go through a service layer.

### Handle loading and errors clearly

Every API call should have:

- loading state
- success handling
- error handling

---

## 8. Socket Rules

### Keep socket logic in one place

Create a dedicated socket service module instead of scattering socket code across pages.

### Separate socket event handling from UI rendering

UI components should react to state updates, not directly manage raw socket events.

### Always clean up listeners

When a component unmounts, disconnect or remove event listeners if necessary.

---

## 9. Form Handling Rules

### Validate input before submission

Use clear validation messages for required fields.

### Show loading states

Buttons should show progress when requests are being sent.

### Show meaningful errors

Do not show generic messages only; provide helpful feedback.

---

## 10. Error Handling Rules

### Always handle failures gracefully

The app should never crash because of a failed request or socket event.

### Show user-friendly feedback

Use inline alerts, toast messages, or banner messages.

### Log important errors during development

Use console logs only for debugging, not for production behavior.

---

## 11. Accessibility Rules

The frontend should follow basic accessibility standards:

- use semantic HTML
- give form inputs labels
- ensure keyboard support
- maintain visible focus states
- keep text contrast readable
- use buttons for actions and links for navigation

---

## 12. TypeScript Rules

### Use TypeScript for all new code

Avoid writing plain JavaScript for new features.

### Define types for API responses and state

Do not use any unnecessarily if a proper type can be created.

### Prefer explicit types over implicit any

Avoid using any unless absolutely necessary.

---

## 13. Comments and Documentation

### Keep comments purposeful

Use comments only when the code is not self-explanatory.

### Document non-obvious logic

Especially for socket flow, auth flow, and project generation flow.

---

## 14. Git and Workflow Rules

### Commit often with clear messages

Example:

- feat: add auth pages
- feat: connect project creation API
- feat: add socket-based live generation UI

### Keep changes focused

Do not mix unrelated changes in one commit.

---

## 15. Recommended Implementation Order

1. Build layout and shared components
2. Build auth flow
3. Build dashboard and credits view
4. Build project creation flow
5. Connect backend APIs
6. Connect Socket.IO
7. Improve UX, loading states, and error handling
8. Refactor for maintainability

---

## 16. Final Standard

The frontend should feel polished, simple, and consistent. Every screen should follow the same visual language, use the same component patterns, and keep the code easy for a learner to follow.
