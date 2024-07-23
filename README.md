# WerqAi Task Assessment

# Overview

This repository contains a mono repo with a frontend and backend for a job listing web application. The project is managed using Yarn. This README provides instructions on how to set up and run the project.

## Setup and Installation

Follow these steps to get the project up and running:

1. **Install Dependencies**

   Run the following command in the root directory to install all necessary dependencies for both frontend and backend:
   ```bash
   yarn install

2. **Set Up Environment Variables**

    Create a .env file by copying the .env.example file:
   ```bash
   cp .env.example .env

3. **Database seeding for jobs**

    Navigate to the backend directory and run the seed script to populate the database with initial data:
   ```bash
   cd backend
   yarn run seed
   cd ..

4. **Run the Development Server**

    Start the development server for both frontend and backend:
   ```bash
   yarn run dev

This will start both the frontend and backend applications. Make sure to check the terminal output for any additional instructions or information about the running services.

# **Project Structure**

**frontend**: Contains the frontend application developed using React.

**backend**: Contains the backend application developed using Node.js and Express with MongoDB.