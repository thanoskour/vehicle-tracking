# Vehicle Tracking Angular Project

## Overview

This is an Angular-based vehicle tracking application that allows users to view and manage vehicle records. The project includes two main components:

1. **Vehicle List**: A list of all the vehicles with filtering functionality.
2. **Vehicle Details**: Detailed records for a specific vehicle, including features such as editing and filtering.

The project uses Angular Material for UI components and services for data management, ensuring clean architecture and separation of concerns.

## Features

- **Vehicle List**: 
  - Displays all active vehicles in a clean table format.
  - Includes a search filter to search for vehicles by their license plate.
  - Clickable vehicle entries to view details.

- **Vehicle Details**:
  - Displays detailed records for the selected vehicle.
  - Includes filters for:
    - Serial Number
    - Driver
    - Date Range
    - Status (Approved/Cancelled)
  - Allows users to edit and delete records.
  - Pagination for large datasets.

- **Record Editing**: 
  - Edit records using a modal dialog where the serial number, issue date, reward amount, and other fields can be updated.

## Technologies Used

- **Angular**: Framework for building the client-side.
- **Angular Material**: UI component library for modern, responsive design.
- **RxJS**: For handling asynchronous data streams.
- **TypeScript**: Superset of JavaScript for type safety and enhanced development experience.
- **HTML & CSS**: For structuring and styling the application.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thanoskour/vehicle-tracking.git
   ```

2. **Install dependencies**:
   Navigate to the project folder and run:
   ```bash
   npm install
   ```

3. **Run the application**:
   To start the development server, run:
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200/`.

4. **Build the project**:
   To build the project for production, use:
   ```bash
   ng build
   ```

## Project Structure

- `src/app/vehicle-list`: Contains the component for listing vehicles with filtering functionality.
- `src/app/vehicle-details`: Contains the component for displaying and managing detailed records of a vehicle.
- `src/app/edit-record-dialog`: Component for editing vehicle records through a dialog modal.
- `src/app/data.service.ts`: Manages data fetching for vehicles, drivers, and records.

## Usage

1. Navigate to the vehicle list.
2. Use the search filter to find a vehicle by its plate.
3. Click on a vehicle to view its details and records.
4. Use the filters in the details view to filter records by serial number, driver, date, and status.
5. Edit or delete records as needed.

## Future Improvements

- Add more complex validation for record editing.
- Improve the UI design for better user experience.
- Implement authentication and role-based access control.

