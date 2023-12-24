# FullStack Form Builder Application

This FullStack form builder application is developed using Next.js, ReactJS, TypeScript, Dnd-Kit, PostgreSQL, Prisma, Tailwind CSS, and Clerk for authentication. It allows users to dynamically create, customise, manage and share forms efficiently.

## Features

- **Dynamic Form Creation:** Build forms easily by dragging and dropping various elements such as text fields, numbers, text areas, dates, selects, checkboxes, etc.
- **Element Customization:** Customize form elements by specifying labels, placeholders, required fields, helper texts, etc.
- **Persistence:** Store created forms securely in a PostgreSQL database using Prisma for efficient retrieval and management.
- **Authentication:** Utilises Clerk for secure user authentication and authorisation, ensuring that the users sensitive data is managed through it.
- **Responsive Design:** Tailwind CSS ensures a responsive and intuitive user interface, adaptable to different screen sizes and devices.
- **Deployment:** The following project was deployed on Vercel

## Technologies Used

- **Next.js:** React framework for server-rendered applications.
- **ReactJS:** JavaScript library for building user interfaces.
- **TypeScript:** Superset of JavaScript that provides static typing and enhanced tooling.
- **Dnd-Kit:** Drag and drop utilities for building accessible, smooth drag and drop interfaces.
- **PostgreSQL:** Powerful open-source relational database system.
- **Prisma:** Modern database toolkit for TypeScript and Node.js.
- **Clerk:** Authentication and user management solution for modern applications.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Vercel:** Platform for deploying web projects.

## Installation

To run the application locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure the environment variables, including Clerk Auth and Prisma credentials.

   - **Clerk Auth:** Obtain Clerk Auth credentials and update the environment variables accordingly.
   - **Prisma:** Set up a `.env` file or use an environment-specific method to configure Prisma connection details (database URL, etc.).
   - Check respective websites for more details

4. Run the application using `npm run dev`.

## Prisma Configuration

To set up Prisma for database connectivity, ensure you have the necessary Prisma connection details configured:

1. Create a `.env` file in the root directory.
2. Add the required environment variables:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
   # Replace 'username', 'password', 'localhost', '5432', and 'dbname' with your PostgreSQL credentials and database name.
   ```

## Deployment

The application is deployed on [Vercel](https://vercel.com/), ensuring seamless accessibility. If you wish to view the application in real-time click [here!](buildr-eight.vercel.app/)

## What I learned

Throughout the development of this project, several valuable lessons were learned:

### FullStack Development Proficiency

Working on this FullStack project significantly enhanced proficiency in both frontend and backend development. I decided to use Next.js this time to learn something new as opposed to previously using Node.js and ReactJS. Understanding the intricacies of Next.js, ReactJS, TypeScript, and integrating them with a database like PostgreSQL through Prisma deepened my grasp of the basics of FullStack development.

### Dynamic UI Creation and Drag-and-Drop Functionality

Implementing the dynamic form builder with drag-and-drop functionality using Dnd-Kit was an enlightening experience. Learning how to create a user-friendly interface for customising forms and managing dynamic elements was a key learning point. I managed to make sure usability principles, goals and accessibility was met in order to ensure universal access.

### Secure Authentication Integration

Incorporating Clerk for user authentication and authorisation was an educational process. Understanding how to integrate secure authentication methods and manage user sessions in a FullStack application was a valuable lesson as opposed to basic frontend user verification in previous projects.

## Future Improvements

In the future, I will try to improve its optimisation to ensure better Search Engine Optimisation (SEO) and improve the User Interface to ensure that usability goals are met.
