# 🚀 Render Deployment Guide - MediVision AI

## 📋 Prerequisites
- ✅ GitHub account with your code pushed
- ✅ Render account (sign up at https://render.com)
- ✅ MongoDB Atlas account (free tier) OR use Render's MongoDB

---

## 🎯 Step-by-Step Deployment

### **Step 1: Set Up MongoDB Database**

#### Option A: Use Render's MongoDB (Recommended)
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"** (or use external MongoDB)
3. For external MongoDB (Atlas):
   - Go to https://cloud.mongodb.com
   - Create free cluster
   - Get connection string
   - Save it for later

#### Option B: MongoDB Atlas (Free Forever)
1. Go to https://cloud.mongodb.com
2. Sign up / Log in
3. Click **"Build a Database"** → **"Free"** (M0)
4. Choose **AWS** → **Region closest to you**
5. Click **"Create"**
6. Create database user:
   - Username: `medivision_user`
   - Password: (generate strong password, save it!)
7. Click **"Network Access"** → **"Add IP Address"** → **"Allow Access from Anywhere"** (0.0.0.0/0)
8. Click **"Database"** → **"Connect"** → **"Connect your application"**
9. Copy connection string (looks like: `mongodb+srv://medivision_user:<password>@cluster0.xxxxx.mongodb.net/`)
10. Replace `<password>` with your actual password
11. Add database name at the end: `...mongodb.net/medivision`

---

### **Step 2: Deploy Backend**

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com

2. **Click "New +"** → **"Web Service"**

3. **Connect GitHub Repository**
   - Click **"Connect account"** (if not connected)
   - Select **"Rehan0707/Medivision_Ai"**
   - Click **"Connect"**

4. **Configure Backend Service**
   - **Name**: `medivision-backend`
   - **Region**: Choose closest to you (e.g., Oregon)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

5. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable")
   
   Add these one by one:
   
   ```
   NODE_ENV=production
   PORT=5001
   MONGO_URI=<your-mongodb-connection-string>
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=supersecretkey_medivision_ai_2026_production
   OPENAI_API_KEY=<your-openai-key>
   GEMINI_API_KEY=<your-gemini-key>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   NEXTAUTH_SECRET=medivision_neural_encryption_key_2026_production
   NEWS_API_KEY=<your-news-api-key>
   FRONTEND_URL=https://medivision-frontend.onrender.com
   ```
   
   ⚠️ **Replace `<your-...>` with actual values from your `.env` file!**

6. **Click "Create Web Service"**

7. **Wait for deployment** (5-10 minutes)
   - Watch the logs
   - Once you see "Server running on port 5001", it's ready!

8. **Copy Backend URL**
   - It will be: `https://medivision-backend.onrender.com`
   - Save this for the next step!

---

### **Step 3: Deploy Frontend**

1. **Click "New +"** → **"Web Service"** again

2. **Select Same Repository**
   - Choose **"Rehan0707/Medivision_Ai"**

3. **Configure Frontend Service**
   - **Name**: `medivision-frontend`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

4. **Add Environment Variables**
   
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://medivision-backend.onrender.com
   NEXTAUTH_URL=https://medivision-frontend.onrender.com
   NEXTAUTH_SECRET=medivision_neural_encryption_key_2026_production
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   ```
   
   ⚠️ **Use the backend URL you copied in Step 2!**

5. **Click "Create Web Service"**

6. **Wait for deployment** (10-15 minutes for Next.js build)

7. **Your app is live!** 🎉
   - Frontend: `https://medivision-frontend.onrender.com`

---

## 🔧 Post-Deployment Configuration

### Update Google OAuth Redirect URIs

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to **"APIs & Services"** → **"Credentials"**
4. Click your OAuth 2.0 Client ID
5. Add to **"Authorized redirect URIs"**:
   ```
   https://medivision-frontend.onrender.com/api/auth/callback/google
   ```
6. Click **"Save"**

---

## ⚠️ Important Notes

### Free Tier Limitations
- **Services sleep after 15 minutes** of inactivity
- **First request after sleep takes 30-60 seconds** to wake up
- **750 hours/month** free (enough for 1 service 24/7)

### Upgrade to Paid ($7/month per service)
- No sleep
- Faster performance
- More resources

---

## 🐛 Troubleshooting

### Backend won't start?
1. Check logs in Render dashboard
2. Verify MongoDB connection string is correct
3. Make sure all environment variables are set

### Frontend shows errors?
1. Check that `NEXT_PUBLIC_API_URL` points to your backend
2. Verify backend is running (visit backend URL directly)
3. Check browser console for errors

### Database connection failed?
1. Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
2. Check username/password in connection string
3. Ensure database name is appended to connection string

---

## 📊 Monitoring

### View Logs
1. Go to your service in Render dashboard
2. Click **"Logs"** tab
3. See real-time logs

### Check Status
- Green = Running
- Yellow = Deploying
- Red = Failed

---

## 🔄 Auto-Deploy on Git Push

Render automatically deploys when you push to GitHub!

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Render will detect the push and redeploy automatically! 🚀

---

## 💡 Tips

1. **Use environment variables** for all secrets (never hardcode!)
2. **Monitor your logs** regularly
3. **Set up health checks** for better reliability
4. **Use paid tier** for production apps (no sleep)

---

## 🆘 Need Help?

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

---

**Your MediVision AI app is now live on the internet! 🎉**
