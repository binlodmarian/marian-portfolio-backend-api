# Complete Postman Testing Guide — Tasks API (User + Admin)

> **Start the server first:** `npm run dev` → you should see `Server is running on port 5000`

---

## Postman Environment Setup

Click **Environments → New Environment**, name it `Tasks API`, and add these variables:

| Variable | Value |
|---|---|
| `baseUrl` | `http://localhost:5000` |
| `accessToken` | *(empty — auto-filled by scripts)* |
| `refreshToken` | *(empty — auto-filled by scripts)* |
| `verifyToken` | *(empty — auto-filled by scripts)* |
| `taskId` | *(empty — auto-filled by scripts)* |
| `adminToken` | *(empty — auto-filled by scripts)* |
| `targetUserId` | *(empty — fill manually when needed)* |

Select this environment from the top-right dropdown before testing.

---

# 👤 USER FLOW

---

## 1. Signup

**`POST {{baseUrl}}/api/auth/signup`**

**Body → raw → JSON:**
```json
{
  "email": "testuser@gmail.com",
  "password": "password123",  
  "name": "Test User"
}
```

**Tests tab script:**
```js
pm.environment.set("verifyToken", pm.response.json().token);
```

**Expected:** `201` — message + token returned.

> ✅ **Proof point:** Try with a missing `email` field → should get `400` Zod validation error.

---

## 2. Verify Email

**`GET {{baseUrl}}/api/auth/verify-email/{{verifyToken}}`**

No body needed.

**Expected:** `200` — `"Email verified successfully"`

> ✅ **Proof point:** Call it a second time → `"Token already used"` (single-use confirmed).

---

## 3. Login

**`POST {{baseUrl}}/api/auth/login`**

**Body → raw → JSON:**
```json
{
  "email": "testuser@gmail.com",
  "password": "password123"
}
```

**Tests tab script:**
```js
const json = pm.response.json();
pm.environment.set("accessToken", json.accessToken);
pm.environment.set("refreshToken", json.refreshToken);
```

**Expected:** `200` — `accessToken`, `refreshToken`, and `user` object returned.

> ✅ **Proof point:** Try logging in **before** verifying email → `"Please verify your email before logging in"`

---

## 4. Refresh Access Token

**`POST {{baseUrl}}/api/auth/refresh`**

**Body → raw → JSON:**
```json
{
  "refreshToken": "{{refreshToken}}"
}
```

**Expected:** `200` — new `accessToken` returned.

---

## 5. Create Task

**`POST {{baseUrl}}/api/tasks`**

**Headers:** `Authorization: Bearer {{accessToken}}`

**Body → raw → JSON:**
```json
{
  "title": "Finish Capstone Activity",
  "description": "Submit the GitHub repo before deadline.",
  "status": "TODO",
  "dueDate": "2026-05-10T00:00:00.000Z"
}
```

**Tests tab script:**
```js
pm.environment.set("taskId", pm.response.json().id);
```

**Expected:** `201` — task object with `userId` matching your user.

> ✅ **Proof point:** Remove the Authorization header → `401 Unauthorized`

---

## 6. Get All My Tasks

**`GET {{baseUrl}}/api/tasks`**

**Headers:** `Authorization: Bearer {{accessToken}}`

**Expected:** `200` — array of tasks, all with your `userId`.

> ✅ **Proof point:** Create a second user account, log in as them — `GET /api/tasks` returns an empty array (data isolation confirmed).

---

## 7. Get One Task

**`GET {{baseUrl}}/api/tasks/{{taskId}}`**

**Headers:** `Authorization: Bearer {{accessToken}}`

**Expected:** `200` — single task object.

> ✅ **Proof point:** Use another user's task ID → `404 Task not found`

---

## 8. Update Task

**`PUT {{baseUrl}}/api/tasks/{{taskId}}`**

**Headers:** `Authorization: Bearer {{accessToken}}`

**Body → raw → JSON:**
```json
{
  "status": "IN_PROGRESS",
  "title": "Finish Capstone Activity (Updated)"
}
```

**Expected:** `200` — updated task with new `status` and `updatedAt`.

---

## 9. Delete Task

**`DELETE {{baseUrl}}/api/tasks/{{taskId}}`**

**Headers:** `Authorization: Bearer {{accessToken}}`

**Expected:** `200` — deleted task object returned.

> ✅ **Proof point:** Call `GET /api/tasks/{{taskId}}` after → `404 Task not found`

---

---

# 🔐 ADMIN FLOW

> **Important:** You need an ADMIN account first. See Step 10 below.

---

## 10. Create an Admin Account

**Option A — Use Neon Dashboard (easiest for first admin):**
1. Go to your Neon project dashboard
2. Open the SQL editor
3. Run this query (replace the ID with a real user's UUID):
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'testuser@gmail.com';
```

**Option B — Signup → Login → use promote endpoint (needs an existing admin).**

Once your admin account has `role = ADMIN`:
- Login as admin using `POST /api/auth/login`

**Tests tab script (run on the admin login request):**
```js
pm.environment.set("adminToken", pm.response.json().accessToken);
```

---

## 11. Get All Users (Admin)

**`GET {{baseUrl}}/api/admin/users`**

**Headers:** `Authorization: Bearer {{adminToken}}`

**Expected:** `200` — array of all users in the system.

> ✅ **Proof point:** Use a regular user token → `403 Forbidden: Admins only`

---

## 12. Get a Specific User (Admin)

**`GET {{baseUrl}}/api/admin/users/{{targetUserId}}`**

**Headers:** `Authorization: Bearer {{adminToken}}`

> Copy any user's `id` from Step 11's response and paste it into `targetUserId` in your environment.

**Expected:** `200` — user object including their tasks list.

---

## 13. Promote a User to Admin

**`PATCH {{baseUrl}}/api/admin/users/{{targetUserId}}/promote`**

**Headers:** `Authorization: Bearer {{adminToken}}`

No body needed.

**Expected:** `200` — user object with `"role": "ADMIN"`

---

## 14. Demote an Admin to User

**`PATCH {{baseUrl}}/api/admin/users/{{targetUserId}}/demote`**

**Headers:** `Authorization: Bearer {{adminToken}}`

No body needed.

**Expected:** `200` — user object with `"role": "USER"`

---

## 15. Delete a User (Admin)

**`DELETE {{baseUrl}}/api/admin/users/{{targetUserId}}`**

**Headers:** `Authorization: Bearer {{adminToken}}`

**Expected:** `200` — `"User deleted successfully"` (all their tasks are also deleted via cascade).

> ⚠️ Don't delete your own admin account or you'll lose access!

---

## 16. Get All Tasks — All Users (Admin)

**`GET {{baseUrl}}/api/admin/tasks`**

**Headers:** `Authorization: Bearer {{adminToken}}`

**Expected:** `200` — array of **every task in the system**, each including the task owner's user info.

---

## 17. Delete Any Task (Admin)

**`DELETE {{baseUrl}}/api/admin/tasks/{{taskId}}`**

**Headers:** `Authorization: Bearer {{adminToken}}`

**Expected:** `200` — `"Task deleted successfully"` (admin can delete any task regardless of owner).

---

## Common Errors

| Error | Cause | Fix |
|---|---|---|
| `401 Unauthorized` | No or expired Bearer token | Add `Authorization: Bearer {{accessToken}}` header |
| `403 Forbidden: Admins only` | Using a regular user token on admin routes | Use `{{adminToken}}` instead |
| `"Please verify your email"` | Logging in before verification | Run Step 2 first |
| `"Token already used"` | Re-using verification token | Expected — it's single-use |
| `404 Task not found` | Task doesn't exist or belongs to another user | Check `{{taskId}}` and correct account |
| `400` Zod errors | Invalid request body | Check required fields and data types |

---

## Full Checklist

```
USER FLOW
[ ] 1.  POST   /api/auth/signup                    → 201
[ ] 2.  GET    /api/auth/verify-email/:token        → 200
[ ] 3.  POST   /api/auth/login                      → 200 (accessToken + refreshToken)
[ ] 4.  POST   /api/auth/refresh                    → 200 (new accessToken)
[ ] 5.  POST   /api/tasks                           → 201 (linked to userId)
[ ] 6.  GET    /api/tasks                           → 200 (only own tasks)
[ ] 7.  GET    /api/tasks/:id                       → 200
[ ] 8.  PUT    /api/tasks/:id                       → 200 (updated)
[ ] 9.  DELETE /api/tasks/:id                       → 200 (deleted)

ADMIN FLOW
[ ] 10. Set role = ADMIN in Neon DB
[ ] 11. GET    /api/admin/users                     → 200 (all users)
[ ] 12. GET    /api/admin/users/:id                 → 200 (user + tasks)
[ ] 13. PATCH  /api/admin/users/:id/promote         → 200 (role: ADMIN)
[ ] 14. PATCH  /api/admin/users/:id/demote          → 200 (role: USER)
[ ] 15. DELETE /api/admin/users/:id                 → 200 (cascade deleted)
[ ] 16. GET    /api/admin/tasks                     → 200 (all tasks)
[ ] 17. DELETE /api/admin/tasks/:id                 → 200 (any task deleted)
```
