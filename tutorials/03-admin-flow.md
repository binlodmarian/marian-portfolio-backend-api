# Step 3: Admin Flow

To test the Admin endpoints, you first need an account with the `ADMIN` role. 

## 1. Making Your First Admin Account
You have to do this directly in the database (Neon) because regular users cannot make themselves admins.

1. Go to your [Neon Dashboard](https://console.neon.tech).
2. Go to the **SQL Editor**.
3. Run this exact command to promote the user we made in Tutorial 01:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'testuser@gmail.com';
   ```

## 2. Login as Admin
Since your role changed in the database, you need to login again to get a new token that proves you are an admin.

1. Go back to your **Login** request in Postman.
2. Ensure the Body still has your email and password.
3. Go to the **Tests** tab and replace the script with this one (to save it as `adminToken` instead of `accessToken`):
   ```js
   if (pm.response.code === 200) {
       pm.environment.set("adminToken", pm.response.json().accessToken);
   }
   ```
4. Click **Send**. You now have an `adminToken`.

---

> **Admin Authorization:**
> For all the endpoints below, go to the **Authorization** tab, set Type to `Bearer Token`, and use `{{adminToken}}`.

---

## 3. View All Users

1. Create a new Request.
2. Method: **`GET`**
3. URL: `{{baseUrl}}/api/admin/users`
4. Authorization: Bearer `{{adminToken}}`
5. Click **Send**.
6. **Expected Result:** A list of every single user registered in the app. 
7. Copy the `id` of any *other* user (not yourself) and paste it into the `targetUserId` variable in your Postman Environment. (If you don't have another user, do a quick Signup for `user2@gmail.com`!).

## 4. View a Specific User and Their Tasks

1. Create a new Request.
2. Method: **`GET`**
3. URL: `{{baseUrl}}/api/admin/users/{{targetUserId}}`
4. Authorization: Bearer `{{adminToken}}`
5. Click **Send**.
6. **Expected Result:** Shows that user's details, plus an array of all the tasks they have created.

## 5. Promote a User to Admin

1. Create a new Request.
2. Method: **`PATCH`** *(Note: It's PATCH, not POST or PUT)*
3. URL: `{{baseUrl}}/api/admin/users/{{targetUserId}}/promote`
4. Authorization: Bearer `{{adminToken}}`
5. Click **Send**.
6. **Expected Result:** The user object is returned, and their role is now `ADMIN`.

## 6. Demote an Admin back to User

1. Create a new Request.
2. Method: **`PATCH`**
3. URL: `{{baseUrl}}/api/admin/users/{{targetUserId}}/demote`
4. Authorization: Bearer `{{adminToken}}`
5. Click **Send**.
6. **Expected Result:** The user object is returned, and their role is now `USER`.

## 7. View Every Task in the System

1. Create a new Request.
2. Method: **`GET`**
3. URL: `{{baseUrl}}/api/admin/tasks`
4. Authorization: Bearer `{{adminToken}}`
5. Click **Send**.
6. **Expected Result:** A massive list of every task created by *any* user. Each task will also show the details of the user who owns it.

## 8. Delete Any User

1. Create a new Request.
2. Method: **`DELETE`**
3. URL: `{{baseUrl}}/api/admin/users/{{targetUserId}}`
4. Authorization: Bearer `{{adminToken}}`
5. Click **Send**.
6. **Expected Result:** `"User deleted successfully"`.
   *(Note: Because of our Prisma schema's `onDelete: Cascade`, deleting a user automatically deletes all of their tasks and tokens too!)*

---

**🎉 Congratulations! You have fully tested the entire Tasks API System! 🎉**
