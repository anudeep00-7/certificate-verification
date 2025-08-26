Certificate Verification System
A dynamic web application that allows participants to verify their certificates by entering a unique ID. The system fetches data from a Google Sheet via a secure Google Apps Script API, validates the ID, and generates a personalized, downloadable certificate on the fly.

Live Demo
https://anudeep00-7.github.io/certificate-verification/

Test Roll Numbers
For demonstration purposes, the following roll numbers are active in the database:

101 -- Alex

102 --Jordan

How It Works
The verification process is designed to be simple, secure, and efficient.

1. User enters a Roll Number/ID in the web interface.
   │
   └───> 2. A fetch() request is sent to the Google Apps Script API endpoint.
         │
         └───> 3. The API script searches the connected Google Sheet for a matching ID.
               │
               ├───> 4a. If a match is found, the script returns the participant's name.
               │     │
               │     └───> 5a. The website displays a success message, generates a certificate with the name, and enables the download button.
               │
               └───> 4b. If no match is found, the script returns an error message.
                     │
                     └───> 5b. The website displays a "Not Found" error to the user.


Key Features
Instant Verification: Validate certificates in real-time using unique roll numbers.

Secure Data Fetching: Utilizes Google Apps Script as a secure backend to interact with a private Google Sheet.

Dynamic Certificate Generation: Automatically populates a certificate template with the validated participant's name.

Image Download: Provides an option to download the generated certificate as a high-quality PNG image.

Clean & Responsive UI: A modern, user-friendly interface that works seamlessly across devices.

Technologies Used
Frontend: HTML5, Tailwind CSS, JavaScript (ES6+)

Backend/API: Google Apps Script

Database: Google Sheets

Image Generation: html2canvas.js

Project Structure
certificate-verification/
│
├── index.html         # Main HTML file
├── certificate.jpg    # Certificate background image
└── README.md          # Project documentation


(Note: For simplicity, CSS and JavaScript are included within index.html in this version.)

Setup and Deployment
To set up this project for your own use, follow these steps:

1. Clone the Repository

git clone https://github.com/anudeep00-7/certificate-verification.git
cd certificate-verification


2. Configure the API URL
Open index.html and find the verifyCertificate function. Replace the placeholder URL with your own deployed Google Apps Script URL:

const response = await fetch(
    "YOUR_DEPLOYED_APP_SCRIPT_URL?rollno=" + encodedRollNo
);


3. Add Your Certificate Template
Replace the existing certificate.jpg file in the root directory with your own certificate background image.

4. Deploy to GitHub Pages

Navigate to your repository's Settings tab.

Go to the Pages section in the sidebar.

Under "Build and deployment," select your main branch as the source and click Save.

Your site will be live at https://<your-username>.github.io/certificate-verification/.

Customization
Certificate Design: To change the look of the certificate, replace certificate.jpg and adjust the text positioning and styling within the #certificate div in the HTML and CSS.

UI Branding: Modify the colors, fonts, and logos in the CSS section to match your organization's branding.

License
This project is open-source . You are free to use, modify, and distribute it as you see fit. Attribution is appreciated but not required.
