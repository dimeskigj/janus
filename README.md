> [!WARNING]
> Active development on this hobby project has ceased and is in an unstable state.

<div style="background-color: white; padding: 1rem; padding-left: 2rem;">
    <img src="logo.svg" />
<div>
    
# Termince

**Termince** is a modern appointment booking service designed to make scheduling a breeze for businesses and their clients. Built with a **.NET API** and an **Angular frontend**, Termince offers a smooth and intuitive experience for both administrators and users. 🚀

## Features 🌟

### For Administrators:
- **Business Management**: Create and manage businesses on the platform effortlessly.
- **Service Configuration**: Define services offered and set timeslots for those services. 🕒
- **Dependent Services**: Link dependent services to avoid overlapping timeslots. 🔗
- **Appointment Dashboard**: View, edit, remove, and reschedule appointments with ease. 📅
- **Team Management**: Add multiple users to collaborate on managing appointments. 👥

### For Users:
- **Easy Booking**: Select a timeslot from the business's page in just a few clicks. ✅
- **Personal Information**: Provide name, phone number, and email address for booking. ✍️
- **Confirmation Email**: Receive an email to confirm the selected timeslot. 📧
- **Booking Assurance**: Finalize appointments after email confirmation. 🔒

---

## How It Works 🤔

1. **Administrator Setup**:
   - Register a business and define the services offered.
   - Set available timeslots for each service.
   - Specify dependencies between services to prevent scheduling conflicts.

2. **User Booking**:
   - Navigate to the desired business's page.
   - Choose an available timeslot for a service.
   - Enter required details (name, phone number, email).
   - Confirm the appointment via the email sent.

3. **Appointment Management**:
   - Administrators view all appointments in a dashboard.
   - Admins can edit, reschedule, or cancel appointments as needed.

---

## Getting Started 🚀

### Prerequisites ✅
- **Backend**:
  - .NET SDK installed.
  - SQL Server for database management.
- **Frontend**:
  - Node.js and Angular CLI installed.

### Installation 🖥️
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dimeskigj/janus.git
   cd janus
   ```
2. **Setup Backend**:
   - Navigate to the API directory and restore dependencies:
     ```bash
     cd Backend
     dotnet restore
     ```
   - Configure database connection in `appsettings.json`.
   - Run the application:
     ```bash
     dotnet run
     ```
3. **Setup Frontend**:
   - Navigate to the Angular app directory:
     ```bash
     cd Web
     npm install
     ```
   - Start the development server:
     ```bash
     ng serve
     ```

---

## Usage 💡
- **Admins**: Register your business, define services, and manage appointments through the dashboard.
- **Users**: Book appointments by selecting a business, choosing a service, and confirming your timeslot via email.

---

## License 📜
GNU General Public License (GPL).

