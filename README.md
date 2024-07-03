
# Protest Aid Kenya

Protest Aid Kenya is a web application designed to assist individuals injured or killed during peaceful protests in Kenya. The system allows public users to submit requests for aid and provides administrators with tools to manage and verify these requests. 

## Table of Contents

- [Protest Aid Kenya](#protest-aid-kenya)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Components](#components)
  - [Routes](#routes)
  - [File Structure](#file-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Features

1. **Public Requests Submission**:
    - Users can submit requests for aid, attaching necessary documents.
    - Two types of requests: Injury and Burial.
    - Dynamic hints to guide users on required documents based on request type.

2. **Admin Dashboard**:
    - View and manage all submitted requests.
    - Change the status of requests (Pending, Verification, Disputed, Completed).
    - Attach payment receipts.

3. **Request Details**:
    - View details of individual requests.
    - Dynamic hints and form validation.

4. **Sticky Navbar**:
    - Navbar remains at the top of the screen while scrolling.

5. **Pagination and Filters**:
    - Paginate request lists.
    - Filter requests by type, status, and location.
    - Search requests by name.

## Technologies Used

- **Frontend**:
    - React.js
    - Styled-components for styling
    - React Router for navigation
    - Formik for form handling
    - Yup for form validation

- **Backend**:
    - The backend is assumed to be a RESTful API (not included in this repository). Example endpoints:
        - \`GET /api/requests\`
        - \`PUT /api/requests/:id\`

- **Tools**:
    - Axios for HTTP requests
    - Faker.js for generating dummy data

## Installation

1. Clone the repository:
    \`\`\`bash
    git clone https://github.com/yourusername/protest-aid-kenya.git
    cd protest-aid-kenya
    \`\`\`

2. Install dependencies:
    \`\`\`bash
    npm install
    \`\`\`

3. Start the development server:
    \`\`\`bash
    npm start
    \`\`\`

## Usage

1. **Home Page**:
    - View the welcome message.
    - Access the form to submit a new request by clicking the floating button.

2. **Submit Request**:
    - Fill in the form with personal details, request type, and necessary documents.
    - Submit the form to create a new request.

3. **Admin Dashboard**:
    - View the list of all requests.
    - Filter requests by type, status, and location.
    - Search requests by name.
    - Change the status of requests and attach payment receipts.

## Components

1. **Navbar**:
    - Sticky at the top of the page.
    - Contains navigation links to Home and Admin Dashboard.
    - Displays the project name "Protest Aid Kenya" with an icon.

2. **Home**:
    - Displays the welcome message.
    - Contains the floating button to open the request submission form.
    - Displays the list of current requests.

3. **RequestForm**:
    - Form for submitting new requests.
    - Dynamic hints based on request type.
    - Validation and error messages for form fields.

4. **RequestList**:
    - Displays the list of requests with pagination, filtering, and search functionality.
    - Admin actions to change request status and view notes.

5. **AdminDashboard**:
    - Admin interface for managing requests.
    - Dummy data for testing purposes.

## Routes

- \`/\`: Home page with request submission form and list of requests.
- \`/admin\`: Admin dashboard for managing requests.
- \`/request/:id\`: Individual request details page (to be implemented).

## File Structure

```
protest-aid-kenya/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── RequestForm.js
│   │   ├── RequestList.js
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   ├── AdminDashboard.js
│   │   └── RequestPage.js
│   │
│   ├── App.js
│   ├── index.js
│   └── ...
│
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (\`git checkout -b feature-branch\`).
3. Make your changes.
4. Commit your changes (\`git commit -m 'Add new feature'\`).
5. Push to the branch (\`git push origin feature-branch\`).
6. Create a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to contribute, report issues, or suggest new features! Your support is greatly appreciated. Thank you for using Protest Aid Kenya.
