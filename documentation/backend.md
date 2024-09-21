
# Backend Documentation

## Structure and Applications
The backend contains several key applications, each with its specific responsibilities:

1. **Calls**
   - **Purpose**: Manages call-related functionalities, such as handling incoming and outgoing calls or managing call records.
   - **Components**:
     - Models define the call data structure.
     - Views handle call-related requests.
     - Serializers transform data for APIs.

2. **Core**
   - **Purpose**: Provides core functionalities and shared utilities used across other apps, including filters, common models, and utilities.
   - **Components**:
     - Models for shared data structures.
     - Utility functions and helpers.
     - Basic views for handling common requests.

3. **Members**
   - **Purpose**: Handles membership management, including roles, permissions, and group associations.
   - **Components**:
     - Models manage member data.
     - Views provide member-related operations.
     - Admin setups for managing member configurations.

4. **Toolkit**
   - **Purpose**: Provides additional tools, management commands, templates, and reusable features.
   - **Components**:
     - Custom management commands for backend tasks.
     - Views for toolkit-specific requests.
     - Templates and utilities for extended functionality.

5. **Users**
   - **Purpose**: Manages user-related features, including authentication, user profiles, and permissions.
   - **Components**:
     - Models for user data, profiles, and permissions.
     - Views handle login, registration, and profile management.
     - Serializers for user data in API interactions.

## How to Run the Backend Correctly
1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```
2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Set Up Environment Variables** (if applicable, create a `.env` file with necessary variables).
4. **Apply Migrations**:
   ```bash
   python manage.py migrate
   ```
5. **Run the Server**:
   ```bash
   python manage.py runserver
   ```
