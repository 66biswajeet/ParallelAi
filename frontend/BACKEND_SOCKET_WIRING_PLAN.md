# Backend and Socket Wiring Plan for the React Frontend

This file describes how the React frontend should connect to the existing backend and Socket.IO server.

---

## 1. Backend API Base URL

Set a shared API base URL in the frontend environment:

```env
VITE_API_BASE_URL=http://localhost:5173
```

All API calls should use this base URL.

---

## 2. Authentication Flow

### Existing backend endpoints

- POST /api/auth/sign-up
- POST /api/auth/sign-in
- POST /api/auth/sign-out
- GET /api/user/credits
- POST /api/project/create-project

### Frontend expectations

- The backend uses JWTs stored in an HTTP-only cookie called auth_session.
- Frontend requests should include credentials: true so cookies are sent and received correctly.
- The frontend should keep an auth state in global storage after sign in or sign up.

### Recommended auth approach

Use either:

- Zustand for simple global auth state, or
- React Context for a light and beginner-friendly setup

Suggested state:

- user object
- isAuthenticated boolean
- loading state
- logout action

---

## 3. API Service Layer

Create a service module such as:

- src/services/api.ts
- src/services/auth.service.ts
- src/services/project.service.ts

### Example API client setup

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
```

### Auth service methods

- signUp(email, password, name)
- signIn(email, password)
- signOut()
- getCredits()

### Project service methods

- createProject(name, initialPrompt)

---

## 4. Socket.IO Connection

The backend exposes a Socket.IO server at the same host and port.

### Recommended client setup

```ts
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_BASE_URL, {
  withCredentials: true,
  transports: ["websocket"],
});
```

### Important notes

- The backend expects clients to emit join_project_canvas with the project ID.
- The frontend should listen for:
  - generation_status
  - code_stream_chunk

### Example connection flow

```ts
socket.emit("join_project_canvas", projectId);

socket.on("generation_status", (data) => {
  console.log(data);
});

socket.on("code_stream_chunk", (data) => {
  console.log(data.chunk);
});
```

---

## 5. Project Creation Flow

### Step 1: Submit form

When the user submits the create-project form:

- collect name and initialPrompt
- call POST /api/project/create-project

### Step 2: Handle success

On success:

- store the returned project details
- navigate to the project generation page
- join the socket room with the project id

### Step 3: Show live updates

While the backend generates content:

- show status text from generation_status
- append streamed chunks into a preview or editor panel

### Step 4: Final output

When complete:

- show the finished generated code in the preview area
- allow the user to review or copy it

---

## 6. Frontend State Design

### Auth state

Store:

- user info
- authentication status
- loading status

### Project state

Store:

- current project
- generation status
- streamed code chunks
- error message

### Suggested state library

For a beginner-friendly setup, use Zustand because it is lightweight and easy to understand.

Example idea:

- useAuthStore
- useProjectStore

---

## 7. Suggested Route Structure

```text
/                      -> Landing page
/sign-up               -> Sign up page
/sign-in               -> Sign in page
/dashboard             -> Dashboard page
/projects/:id          -> Live generation page
/credits               -> Credits page
```

Protected routes should redirect unauthenticated users to /sign-in.

---

## 8. UI Integration with Backend Responses

### Sign up / sign in

On success:

- store user info
- update auth state
- redirect to dashboard

On failure:

- show validation or server error message

### Credits

On page load:

- call GET /api/user/credits
- show the number and update state

### Create project

- call backend API
- show loading indicator
- handle errors clearly

---

## 9. Socket Event Handling Plan

### Events to listen to

- generation_status
  - used for current status text and progress UI
- code_stream_chunk
  - used to append HTML code progressively

### Recommended UI behavior

- show a stepper or status badge for current stage
- append code chunks into a preview area or code viewer
- update a “Completed” state when generation is done

---

## 10. Error Handling Plan

The frontend should handle:

- network errors
- failed sign in / sign up
- insufficient credits
- failed project creation
- socket connection issues

Show friendly error messages using toast notifications or inline alert boxes.

---

## 11. Suggested Implementation Order

1. Set up React + Vite + TypeScript
2. Add routing and layout shell
3. Create auth pages and API services
4. Connect sign up and sign in to backend
5. Build dashboard and credits view
6. Add project creation form
7. Connect project creation endpoint
8. Add Socket.IO client and join room flow
9. Display generation status and streamed content
10. Polish UI styling and loading states

---

## 12. Example Frontend Data Flow

```text
User submits project form
  -> Frontend sends POST /api/project/create-project
  -> Backend returns project object
  -> Frontend navigates to /projects/:id
  -> Frontend joins socket room for that project
  -> Frontend listens to generation_status and code_stream_chunk
  -> Preview UI updates live
```

---

## 13. Notes for Beginners

Keep the first version simple:

- use basic forms and cards
- avoid over-engineering the state layer
- focus on getting auth, project creation, and socket updates working first
- use clear loading states and error messages

The most important part is to connect the frontend to the three core backend capabilities:

- authentication
- project creation
- real-time generation updates
