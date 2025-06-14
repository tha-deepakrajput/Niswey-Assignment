# Task Management API

A simple RESTful API built with Node.js for managing tasks.

## Setup Instructions

1. Clone the repository
2. Navigate to project directory
```bash
cd Niswey-assignment
```
3. Install dependencies (if any)
```bash
npm install
```
4. Start the server
```bash
node index.js
```
The server will run at `http://localhost:3000`

## API Endpoints

### 1. Get All Tasks
- **URL:** `/tasks`
- **Method:** `GET`
- **Response Format:**
```json
[
    {
        "id": 1,
        "title": "Sample Task"
    }
]
```

### 2. Create New Task
- **URL:** `/tasks`
- **Method:** `POST`
- **Request Body:**
```json
{
    "title": "Your Task Title"
}
```
- **Success Response (201):**
```json
{
    "id": 1,
    "title": "Your Task Title"
}
```

### 3. Update Task
- **URL:** `/tasks/:id`
- **Method:** `PUT`
- **Request Body:**
```json
{
    "title": "Updated Task Title"
}
```
- **Success Response (200):**
```json
{
    "id": 1,
    "title": "Updated Task Title"
}
```

### 4. Delete Task
- **URL:** `/tasks/:id`
- **Method:** `DELETE`
- **Success Response (200):**
```json
{
    "message": "Task Deleted Successfully"
}
```

## Testing with Postman

1. Open Postman application
2. Create a new request:
   - Click "New" button
   - Select "HTTP Request"

3. Test GET Request:
   - Select `GET` method
   - Enter URL: `http://localhost:3000/tasks`
   - Click "Send"

4. Test POST Request:
   - Select `POST` method
   - Enter URL: `http://localhost:3000/tasks`
   - Go to "Headers" tab:
     - Add `Content-Type: application/json`
   - Go to "Body" tab:
     - Select "raw"
     - Select "JSON"
     - Enter sample request body:
     ```json
     {
         "title": "Complete assignment"
     }
     ```
   - Click "Send"

5. Test PUT Request:
   - Select `PUT` method
   - Enter URL: `http://localhost:3000/tasks/1`
   - Use same headers and body format as POST
   - Enter updated title in body
   - Click "Send"

6. Test DELETE Request:
   - Select `DELETE` method
   - Enter URL: `http://localhost:3000/tasks/1`
   - Click "Send"

## Error Responses

The API returns appropriate error messages for:
- Invalid JSON format
- Missing or invalid title
- Task not found
- Invalid route
- Invalid task ID
