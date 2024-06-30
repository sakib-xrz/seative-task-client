# Seative Task Client (Todo Application)

**Live Website Link:** [https://seative-todo.vercel.app](https://seative-todo.vercel.app)

## Technology Used:

- **ShadCn** as component library
- **Axios** for handling HTTP requests
- **React Query** for data fetching and caching
- **Formik** for handling forms
- **Yup** for form validation
- **Zustand** for global state management

## Features:

- Fully custom authentication (user login / registration)
- Functional task management system: users can create, read, edit, and delete tasks
- **Search Functionality:** Users can search tasks by title
- **Sort Functionality:** Users can sort tasks by priority, duration, and due date in ascending or descending order
- **Filter Functionality:** Users can filter tasks by status, priority, and due date
- All search, sort, and filter functionalities are URL-based, ensuring persistence across page reloads
- Clear search, sort, and filter functionalities
- Task assignment: Users can assign tasks to other team members by searching for their names and can assign multiple users at a time
- Email notifications: An email will be sent to assigned users at midnight if the task is not complete and the due date has passed
