# Step 2: Tasks CRUD (Create, Read, Update, Delete)

All of these endpoints require you to be authenticated. This means you must attach your `accessToken` to every request.

> **How to add Authorization in Postman:**
> For every request in this file, click the **Authorization** tab.
> Change the **Type** to `Bearer Token`.
> In the **Token** field, type: `{{accessToken}}`

---

## 1. Create a Task (POST)

1. Create a new Request (`+`).
2. Method: **`POST`**
3. URL: `{{baseUrl}}/api/tasks`
4. **Authorization** tab → Type: `Bearer Token` → Token: `{{accessToken}}`
5. **Body** tab → **raw** → **JSON**.
6. Paste your task details:
   ```json
   {
     "title": "Complete Capstone Backend",
     "description": "Finish all requirements for the 100 points.",
     "status": "TODO"
   }
   ```
7. **Tests** tab (to auto-save the Task ID):
   ```js
   if (pm.response.code === 201) {
       pm.environment.set("taskId", pm.response.json().id);
   }
   ```
8. Click **Send**.
9. **Expected Result:** `201 Created` and you should see a JSON response with a `"message": "Task created successfully"` and the `task` object returned, which includes your `userId`.

---

## 2. Get All Your Tasks (GET)

1. Create a new Request (`+`).
2. Method: **`GET`**
3. URL: `{{baseUrl}}/api/tasks`
4. **Authorization** tab → Type: `Bearer Token` → Token: `{{accessToken}}`
5. Click **Send**.
6. **Expected Result:** `200 OK`. It will return a JSON with a message like `"1 task(s) found"` and an array `tasks` containing the task you just created. If you create more tasks, they will all show up here. Notice that this *only* returns tasks that belong to you!

---

## 3. Get A Single Task (GET)

1. Create a new Request (`+`).
2. Method: **`GET`**
3. URL: `{{baseUrl}}/api/tasks/{{taskId}}`
4. **Authorization** tab → Type: `Bearer Token` → Token: `{{accessToken}}`
5. Click **Send**.
6. **Expected Result:** `200 OK`. It returns a message `"Task retrieved successfully"` along with the specific task object.
   *(Test point: Try typing a random fake ID in the URL instead of `{{taskId}}`. It will return a 404 Not Found error.)*

---

## 4. Update A Task (PUT)

1. Create a new Request (`+`).
2. Method: **`PUT`**
3. URL: `{{baseUrl}}/api/tasks/{{taskId}}`
4. **Authorization** tab → Type: `Bearer Token` → Token: `{{accessToken}}`
5. **Body** tab → **raw** → **JSON**.
6. Paste the updated details:
   ```json
   {
     "status": "IN_PROGRESS",
     "title": "Complete Capstone Backend (Almost Done!)"
   }
   ```
7. Click **Send**.
8. **Expected Result:** `200 OK`. The response will have `"message": "Task updated successfully"` and the returned task object will show the new title and status, and the `updatedAt` timestamp will change.

---

## 5. Delete A Task (DELETE)

1. Create a new Request (`+`).
2. Method: **`DELETE`**
3. URL: `{{baseUrl}}/api/tasks/{{taskId}}`
4. **Authorization** tab → Type: `Bearer Token` → Token: `{{accessToken}}`
5. Click **Send**.
6. **Expected Result:** `200 OK`. The response will say `"message": "Task deleted successfully"`.
7. **Verify it worked:** Go back to the "Get All Your Tasks" request and click Send again. The array should now be empty `[]` because you deleted it!

Next up: Learn how to manage the whole system in `03-admin-flow.md`.
