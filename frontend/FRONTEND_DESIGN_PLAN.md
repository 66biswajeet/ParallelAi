# Frontend Design Plan for PyarelalAI

This document is the main blueprint for building the React frontend for PyarelalAI using a clean white-and-yellow visual system. The goal is to create a polished, modern, learning-friendly interface that matches the backend features already built: authentication, project creation, credits, live generation status, and real-time code streaming.

---

## 1. Product Goal

The frontend should let users:

- sign up and sign in
- view their credit balance
- create new AI-generated website projects
- see generation progress live
- view streamed HTML output in a preview panel
- experience a smooth, premium interface with a clean and modern visual style

---

## 2. Recommended Frontend Stack

Use a modern React setup:

- React + Vite + TypeScript
- React Router for routing
- Axios for API requests
- Socket.IO client for live updates
- Zustand or React Context for global auth state
- Tailwind CSS or a lightweight component system for styling



---

## 3. Visual Theme: White + Yellow

### Core Color Palette

- Primary Yellow: #F5C542
- Yellow Accent: #FFD54F
- Soft Yellow Background: #FFF8E1
- White Base: #FFFFFF
- Dark Text: #1F2937
- Muted Gray: #6B7280
- Border: #E5E7EB

### Styling Direction

- Clean white backgrounds
- Yellow used for CTA buttons, highlights, badges, and active states
- Rounded corners and subtle shadows
- Soft spacing and calm modern layout
- Strong contrast for readability

### Typography

- Use a modern sans-serif like Inter, Poppins, or Manrope
- Headings should feel bold and confident
- Body text should stay minimal and clean

---

## 4. Page Structure

### 4.1 Landing Page

Purpose: Introduce the product and guide users into sign up.

Sections:

- hero section with headline and CTA buttons
- short feature highlights
- testimonial or trust section
- footer with product information

Visual style:

- large bold heading
- bright yellow CTA buttons
- simple illustration or abstract dashboard preview

### 4.2 Sign Up Page

Purpose: Create a new account.

Elements:

- email field
- password field
- name field
- submit button
- link to sign in page
- success/error feedback

Design notes:

- centered card layout
- soft yellow accent on the form header
- simple validation states

### 4.3 Sign In Page

Purpose: Let returning users log in.

Elements:

- email field
- password field
- sign in button
- link to sign up
- forgot password placeholder if needed later

### 4.4 Dashboard Page

Purpose: Show the user’s projects and actions.

Sections:

- top navigation bar
- welcome header
- credits summary card
- “Create New Project” button
- list of existing projects
- empty state if no projects exist

Design notes:

- white card surfaces with yellow highlights
- quick actions should be visually obvious

### 4.5 Create Project Modal or Page

Purpose: Start a new project generation flow.

Fields:

- project name
- initial prompt
- submit button

Behavior:

- send request to backend
- show loading state
- redirect or open the project canvas on success

### 4.6 Project Canvas / Live Generation Page

Purpose: Show project generation progress and live HTML preview.

Sections:

- header with project title and status
- live generation log panel
- preview iframe or sandbox view
- current code panel if desired
- status chips such as refining prompt, streaming code, completed, failed

This is the most important screen because it matches the backend socket flow.

### 4.7 Credits Page

Purpose: Display the current credit count and explain how credits work.

Sections:

- current balance card
- description of credit usage
- upgrade or recharge concept placeholder
- progress bar or visual indicator

### 4.8 Settings Page (optional early version)

Purpose: Let users update profile information and log out.

Include:

- name change field
- email display
- logout button

---

## 5. Core User Flows

### Flow 1: Sign Up

1. User lands on landing page
2. Clicks “Get Started”
3. Fills sign up form
4. Backend creates account and returns user data
5. App stores auth state and redirects to dashboard

### Flow 2: Create a Project

1. User clicks “Create Project”
2. Fills name and prompt
3. Frontend sends POST request to backend
4. Project is accepted and queued
5. User is redirected to the live generation page

### Flow 3: Live Generation Experience

1. User joins the project socket room
2. Frontend listens for generation progress events
3. Status messages update the UI in real time
4. Code chunks stream into the preview panel
5. Final generated code is displayed when complete

---

## 6. UI Component Ideas

Use these reusable components:

- AppShell / Layout
- Navbar
- Button
- InputField
- Card
- Modal
- Badge / StatusChip
- EmptyState
- Loader / Spinner
- ProjectListItem
- CreditsCard
- PreviewPanel

Keep the design consistent by using a shared component library with the same spacing, corner radius, and color tokens.

---

## 7. Responsive Behavior

The interface should work well on:

- mobile phones
- tablets
- desktop screens

Mobile priorities:

- stacked cards
- simplified sidebar or top navigation
- full-width buttons
- easy-to-tap form controls

---

## 8. Accessibility Expectations

The frontend should follow good accessibility practices:

- use semantic HTML
- maintain proper heading hierarchy
- ensure buttons and links are keyboard accessible
- provide visible focus states
- use sufficient contrast for text and buttons
- support screen readers with meaningful labels

---

## 9. Suggested File Structure for the Frontend

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

Suggested grouping:

- components/: shared UI pieces
- pages/: route-level screens
- features/: auth, projects, credits, socket stream logic
- services/: API and socket helpers
- store/: global state like auth and project state

---

## 10. MVP First Version

For the first version, build these features first:

1. landing page
2. sign up and sign in
3. dashboard
4. create project
5. live generation page with socket updates
6. credits view

After that, expand with:

- project history
- editing and publishing
- profile settings
- polished animation and onboarding

---

## 11. Final Design Direction

The frontend should feel:

- simple ,clean and modern
- trustworthy and premium
- simple enough for beginners
- visually rich without being noisy

The best overall feel is a calm white canvas with yellow highlights that make calls to action feel energetic and important.
