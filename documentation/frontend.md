
# Frontend Documentation

## Structure and Applications
The frontend is structured into several key components, each responsible for specific functionalities:

1. **Call**
   - **Purpose**: Manages interfaces related to calls, including routing, components, hooks, and pages.
   - **Components**:
     - Routes for navigating call-related pages.
     - UI components specific to call functionalities.
     - Hooks for managing call states and effects.

2. **Core**
   - **Purpose**: Contains shared functionalities and components used across the frontend.
   - **Components**:
     - Common UI components.
     - Shared hooks and utility functions.
     - Pages providing core application views.

3. **Members**
   - **Purpose**: Manages member-related features such as viewing and managing member information.
   - **Components**:
     - Routes for member-related navigation.
     - Components for member data display and management.
     - Dedicated pages for member interactions.

4. **Users**
   - **Purpose**: Manages user interactions, including registration, authentication, and profile management.
   - **Components**:
     - User-specific routes and views.
     - Components for handling user interactions.
     - Hooks managing user states and logic.

## How to Run the Frontend Correctly
1. **Navigate to the Frontend Directory**:
   ```bash
   cd frontend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables** (ensure `.env` is configured correctly).
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
