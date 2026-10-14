# Project Overview & Architecture: Greenhouse CCU-2 (HvA)

## 1. Project Purpose & Target Audience
- **Project Identity**: Climate Control Unit (CCU-2) Greenhouse Management System developed as part of an **EWA (Enterprise Web Applications)** project at **HvA (Hogeschool van Amsterdam)**.
- **Goal / Target**:
  - Monitor and control greenhouse environmental parameters (temperature, humidity, CO2, lighting/RGB, soil moisture, etc.) across different greenhouses (`gh_id`).
  - Provide a collaborative dashboard for greenhouse operations teams (specialists in botany, agronomy, technology, etc.).
  - Support team notes/knowledge sharing, user and team management, role-based controls (admin vs. regular user), and real-time + historical telemetry data analysis with charts.

---

## 2. Technology Stack & Tools

### Backend
- **Framework & Runtime**: Java 11, Spring Boot `2.5.5`
- **Core Modules**:
  - `spring-boot-starter-web`: RESTful APIs and MVC
  - `spring-boot-starter-data-jpa`: Object-relational mapping via Hibernate / JPA
  - `spring-boot-starter-security` & `spring-security-crypto`: BCrypt password encoding
  - `spring-boot-starter-mail`: Email service (SMTP via Gmail for alerts/notifications)
  - `spring-boot-starter-webflux`: Non-blocking web client (`WebClient`) for external CCU API communication
  - `spring-boot-starter-validation`: Bean validation
- **Authentication & Security**: Custom JWT implementation using `io.jsonwebtoken` (`jjwt-api`, `jjwt-impl`, `jjwt-jackson` `0.11.2`) with custom `JWTRequestFilter`.
- **Database**: MySQL (`mysql-connector-java`) hosted on remote HvA server (`db.hbo-ict.cloud:3306`).
- **Cloud Storage**: Azure Blob & File Storage (`azure-spring-boot-starter-storage` `3.12.0`) for avatar and file attachments.
- **External CCU Hardware / Simulator API**: External endpoint `http://sneltec.com/hva/v2.php` querying greenhouse sensor hardware or simulations.
- **Testing**: JUnit 5, Mockito, Spring Boot Starter Test.

### Frontend
- **Framework**: Angular `12.2.4`, TypeScript `~4.3.5`, RxJS `~6.6.0`
- **UI & Styling**: Bootstrap `5.1.2`, custom CSS
- **Data Visualization**: Chart.js `2.9.4` via `ng2-charts` `2.4.3` for sensor trends and history data
- **UI Utilities**:
  - `ngx-masonry` & `masonry-layout` for dynamic card layouts (notes board)
  - `angular2-notifications` for toast alerts
  - `@auth0/angular-jwt` for decoding JWT tokens
- **Testing**: Jasmine & Karma test runner

---

## 3. Project Structure

```
ccu-2/
├── backend/
│   ├── pom.xml                                  # Maven dependencies and build definition
│   └── src/
│       ├── main/
│       │   ├── java/nl/hva/backend/
│       │   │   ├── BackendApplication.java     # Spring Boot application entry point
│       │   │   ├── models/                      # JPA entities (User, Team, Sensor, SensorData, Note, etc.)
│       │   │   ├── repositories/                # Spring Data JPA repositories & interfaces
│       │   │   ├── rest/                        # REST Controllers & HTTP endpoints
│       │   │   │   ├── config/                  # CORS and web configuration
│       │   │   │   ├── exception/               # Centralized exception handlers & HTTP error classes
│       │   │   │   ├── security/                # JWT utilities, filter, and claims handler
│       │   │   │   ├── AuthController.java      # Login & authentication endpoints
│       │   │   │   ├── HistoryController.java   # Historic sensor query endpoints
│       │   │   │   ├── NotesController.java     # Notes management
│       │   │   │   ├── SensorController.java    # Live and DB sensor data retrieval
│       │   │   │   ├── SettingsController.java  # User preferences and profile configuration
│       │   │   │   ├── TeamsController.java     # Team creation, membership & overview
│       │   │   │   └── UserController.java      # User CRUD & profile picture management
│       │   │   └── services/                    # Business services (EmailService, FileService, SensorService, UserService)
│       │   └── resources/
│       │       └── application.properties       # Port (8085), DB creds, JWT secret, Azure storage, Mail settings
│       └── test/                                # JUnit & Mockito unit/integration tests
│
└── frontend/
    ├── package.json                             # NPM packages and Angular scripts
    ├── angular.json                             # Angular build and project settings
    └── src/
        └── app/
            ├── app-routing.module.ts            # Angular routing definitions & route guards
            ├── app.module.ts                    # Root module and dependency declarations
            ├── components/
            │   ├── mainpage/                    # Home dashboard, login, navigation bar, live sensor cards
            │   ├── notes/                       # Notes board display
            │   ├── notes-navbar/                # Filter notes by specialty (botany, agronomy, etc.)
            │   ├── share-notes/                 # Create note dialog / component
            │   ├── edit-notes/                  # Edit note component
            │   ├── teams/                       # Team view, team management, add user dialog
            │   ├── settings/                    # Account info and user preference forms
            │   └── error/                       # Fallback / 404 page
            ├── models/                          # TypeScript interfaces and data models
            ├── services/                        # Angular services (Auth, HTTP Interceptors, Sensor, History, Team, Notes, etc.)
            └── shared/                          # Custom pipes (e.g. ReversePipe) and form validators
```

---

## 4. Key Services & Features

1. **Authentication & Authorization (`/auth`, JWT)**:
   - Stateless authentication via JSON Web Tokens.
   - Roles: `ADMIN` and standard users (`specialty`-based roles).
   - Frontend route guards (`AuthGuardService`, `AdminGuard`) and HTTP Interceptor (`AuthInterceptorService`) injecting the Bearer token.
2. **Sensor Data Ingestion & Visualization (`/sensors`, `/history`)**:
   - Fetches live readings from both local MySQL storage and remote CCU API (`sneltec.com`).
   - Supports parameter adjustments and time-series plotting via Chart.js on the dashboard.
3. **Collaborative Notes (`/notes`)**:
   - Filterable board organized by specialization (botany, agronomy, engineering).
   - CRUD operations for sharing team insights.
4. **Team & User Management (`/teams`, `/users`)**:
   - Admin features for inviting users, managing team memberships, and updating user roles.
   - User profile images uploaded to Azure Blob Storage via `FileService`.
5. **System Notifications & Emailing (`EmailService`)**:
   - Integration with SMTP server for transactional notifications and alerts.

---

## 5. Usage & Development Workflow

### Prerequisites
- JDK 11
- Node.js (v14/v16 recommended for Angular 12) & npm
- Access to MySQL database (configured in `application.properties`)

### Running the Backend
```bash
cd backend
mvn spring-boot:run
# Server runs on http://localhost:8085
```

### Running the Frontend
```bash
cd frontend
npm install
npm start   # or ng serve
# Application serves on http://localhost:4200
```
