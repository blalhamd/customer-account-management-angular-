# Customer Account Management System (CAMS) - Angular Frontend

## Overview

This repository contains the Angular frontend application for the Customer Account Management System (CAMS). It provides a modern, responsive, and interactive user interface for managing customer accounts, transactions, and other banking operations. This application consumes the RESTful APIs exposed by the CAMS backend system.

## Key Features

*   **User Authentication & Authorization:** Secure login and role-based access control using JWT.
*   **Client Management:** Functionality to register new clients, view client details, and update client information.
*   **Account Management:** Interface for opening various account types (Current, Savings, Fixed Deposit, Joint Accounts) and managing their statuses.
*   **Transaction Handling:** Enables users to perform deposits, withdrawals, and transfers, and view transaction history.
*   **Responsive Design:** Optimized for various screen sizes, providing a seamless experience across desktop and mobile devices.
*   **Intuitive User Interface:** Built with Angular components and Bootstrap for a consistent and user-friendly experience.
*   **Error Handling:** Robust error handling and user feedback mechanisms.

## Technologies Used

*   **Frontend Framework:** Angular (v17.3.12)
*   **State Management:** RxJS (v7.8.0)
*   **UI Framework:** Bootstrap (v5.3.6)
*   **Authentication:** JWT (JSON Web Tokens) with `@auth0/angular-jwt`
*   **Icons:** Font Awesome (v6.7.2)
*   **Alerts/Notifications:** SweetAlert2 (v11.14.5)
*   **HTTP Client:** Angular\`s `HttpClient` with custom interceptors for JWT and error handling.

## Technical Highlights

*   **Modular Architecture:** The application is organized into feature modules, promoting code reusability and maintainability.
*   **Route Guards:** Implemented authentication and role-based guards to protect routes and control access.
*   **HTTP Interceptors:** Used for automatically attaching JWT tokens to outgoing requests and handling global error responses.
*   **Reactive Forms:** Utilizes Angular Reactive Forms for robust form validation and management.
*   **Component-Based Design:** Follows Angular\`s component-based architecture for building reusable UI elements.

## Key Use Cases

*   **Client Onboarding:** Registering new clients with their personal and contact details.
*   **Account Opening:** Clients or administrators can open different types of bank accounts.
*   **Fund Transfers:** Performing secure money transfers between accounts.
*   **Viewing Account Statements:** Accessing detailed transaction history for any account.
*   **User Profile Management:** Updating personal information and managing security settings.
*   **Administrator Operations:** Managing users, clients, and accounts with appropriate permissions.

## API Documentation

This Angular application interacts with a separate backend API. The documentation for the backend API can be found in its respective repository (e.g., `https://github.com/blalhamd/Customer-Account-Management-System-.git` ).

**Base API URL:** (This would typically be configured in the Angular environment files, e.g., `src/environments/environment.ts`)

Example API Endpoints consumed by this frontend:

*   `/api/Authentications/login` (POST): User login to obtain JWT.
*   `/api/Clients` (POST, GET, PUT, DELETE): Client registration and management.
*   `/api/Accounts` (GET, PUT, POST): Account opening and status updates.
*   `/api/Transactions` (POST, GET): Performing and viewing transactions.

For detailed request/response schemas, permissions, and other API-specific information, please refer to the backend API documentation.

