# Step 1: Authentication Flow (Signup & Login)

Now that your environment is set up, let's test the Authentication flow.

## 1. Signup a New User
We need to create a user account first.

1. In Postman, click the **+** button to create a new Request.
2. Change the method dropdown from `GET` to **`POST`**.
3. In the URL bar, type: `{{baseUrl}}/api/auth/signup`
4. Click on the **Body** tab below the URL.
5. Select **raw** and change the dropdown next to it from `Text` to **JSON**.
6. Paste this JSON into the box:
   ```json
   {
     "email": "testuser@gmail.com",
     "password": "password123",
     "name": "Test User"
   }
   ```
7. Click on the **Tests** tab (next to Pre-request Script). We will use a script to automatically save the verification token to your environment. Paste this:
   ```js
   if (pm.response.code === 201) {
       pm.environment.set("verifyToken", pm.response.json().token);
   }
   ```
8. Click **Send**.
9. **Expected Result:** You should see a `201 Created` status at the bottom, and a JSON response with a success message and a long `token`.

## 2. Verify Your Email
You cannot login until your email is verified.

1. Open a new Request tab (`+`).
2. Method: **`GET`**
3. URL: `{{baseUrl}}/api/auth/verify-email/{{verifyToken}}`
   *(Notice how `{{verifyToken}}` turns orange? That means Postman grabbed the token from the previous step!)*
4. Click **Send**.
5. **Expected Result:** Status `200 OK` and message `"Email verified successfully"`.

## 3. Login
Now that you are verified, you can log in.

1. Open a new Request tab (`+`).
2. Method: **`POST`**
3. URL: `{{baseUrl}}/api/auth/login`
4. Go to the **Body** tab → **raw** → **JSON**.
5. Paste your credentials:
   ```json
   {
     "email": "testuser@gmail.com",
     "password": "password123"
   }
   ```
6. Go to the **Tests** tab and paste this script to auto-save your access and refresh tokens:
   ```js
   if (pm.response.code === 200) {
       const json = pm.response.json();
       pm.environment.set("accessToken", json.accessToken);
       pm.environment.set("refreshToken", json.refreshToken);
   }
   ```
7. Click **Send**.
8. **Expected Result:** Status `200 OK`. The response will contain your `accessToken`, `refreshToken`, and your user details.

## 4. Refresh Token (Optional but good to test)
Access tokens expire after 15 minutes. To get a new one without logging in again:

1. Open a new Request tab (`+`).
2. Method: **`POST`**
3. URL: `{{baseUrl}}/api/auth/refresh`
4. Body → raw → JSON:
   ```json
   {
     "refreshToken": "{{refreshToken}}"
   }
   ```
5. Click **Send**.
6. **Expected Result:** A brand new `accessToken` is generated for you.

Next up, let's create some Tasks in `02-tasks-crud.md`!
