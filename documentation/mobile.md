
# Mobile Documentation

## Structure and Applications
The mobile application is modular, with each part focused on specific tasks:

1. **Call**
   - **Purpose**: Manages call functionalities within the mobile app.
   - **Components**:
     - UI components for call management.
     - Hooks for state and effect handling.
     - Screens dedicated to call-related views.

2. **Core**
   - **Purpose**: Provides shared utilities and components used across different mobile screens.
   - **Components**:
     - Core utility functions and helpers.
     - Common components used across multiple screens.

3. **Members**
   - **Purpose**: Handles member-related views and interactions on mobile.
   - **Components**:
     - UI elements for member information.
     - Screens for managing member details and interactions.

4. **Users**
   - **Purpose**: Manages user functionalities, including authentication and profile handling.
   - **Components**:
     - Authentication components and profile views.
     - Screens for user-related interactions.

## How to Run the Mobile Application Correctly
1. **Navigate to the Mobile Directory**:
   ```bash
   cd mobile
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Application**:
   - For iOS:
     ```bash
     npx react-native run-ios
     ```
   - For Android:
     ```bash
     npx react-native run-android
     ```
