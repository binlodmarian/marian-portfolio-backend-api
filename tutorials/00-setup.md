# Step 0: Initial Setup for Postman

Before you can test the API endpoints, you need to configure Postman so it can automatically save your tokens. This saves you from copying and pasting tokens manually for every request!

## 1. Start the Server
First, make sure your backend is actually running.
1. Open your terminal in VS Code.
2. Run `npm run dev`.
3. You should see `Server is running on port 5000`. Leave this terminal open.

## 2. Create a Postman Environment
An environment in Postman acts like a memory bank for variables (like your `baseUrl` and tokens).

1. Open Postman.
2. Look at the top right corner and click on **Environments** (it might look like a square with a checkmark or say "No Environment").
3. Click **Add** or **New Environment**.
4. Name the environment **Tasks API Environment**.
5. Add the following variables. Leave the `Current Value` blank for all of them except `baseUrl`:

| VARIABLE | INITIAL VALUE | CURRENT VALUE |
|---|---|---|
| `baseUrl` | `http://localhost:5000` | `http://localhost:5000` |
| `verifyToken` | *(leave blank)* | *(leave blank)* |
| `accessToken` | *(leave blank)* | *(leave blank)* |
| `refreshToken` | *(leave blank)* | *(leave blank)* |
| `taskId` | *(leave blank)* | *(leave blank)* |
| `adminToken` | *(leave blank)* | *(leave blank)* |
| `targetUserId` | *(leave blank)* | *(leave blank)* |

6. Click **Save** (Ctrl+S or Cmd+S).
7. Look at the top right corner again. Change the dropdown from **No Environment** to **Tasks API Environment**.

You are now ready to test! Go to the next tutorial: `01-auth-flow.md`.
