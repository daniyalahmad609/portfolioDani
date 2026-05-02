# Image Upload Error Fix Guide

## Root Cause
The error **"An unexpected response was received from the server"** occurs because your Supabase environment variables are not configured. The `.env.local` file is missing from your project.

## Solution

### Step 1: Create `.env.local` file
Create a new file named `.env.local` in the root of your project (same level as `package.json`) with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Step 2: Find your Supabase credentials
1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** (in the same page, under service_role) → `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Verify Supabase Storage Buckets
Make sure these buckets exist in your Supabase Storage:
- `services` - for service images
- `projects` - for project images
- `profiles` - for profile images

If they don't exist:
1. Go to **Storage** in your Supabase dashboard
2. Click **Create a new bucket** for each missing bucket
3. Set **Public** option to allow file access

### Step 4: Restart the development server
After creating `.env.local`:
1. Stop the dev server (Ctrl+C in terminal)
2. Run `npm run dev` again
3. The environment variables will be loaded

## Code Improvements Made
✅ Added comprehensive error handling in `uploadImageToRecord` function
✅ Improved error serialization to prevent "unexpected response" errors
✅ Added proper type checking for all Supabase API responses
✅ Added try-catch blocks for better error visibility

## Testing the Fix
1. Navigate to `http://localhost:3001/admin/services`
2. Fill in a Record ID (e.g., "test-service")
3. Select an image file
4. Click "Upload"
5. You should see success message with the uploaded URL

## Troubleshooting
If you still see errors after following these steps:
1. Check the browser console (F12 → Console tab) for detailed error messages
2. Check the terminal output where you're running `npm run dev`
3. Verify bucket permissions are set to Public
4. Ensure the Record ID corresponds to an existing service in your database
