# Serverless NestJS Backend - Deployment Guide

## ✅ **Now You Have a TRUE Serverless Backend!**

### 📁 **Serverless Structure:**

```
/api/
└── index.ts                 # Vercel serverless function entry point
/src/
├── whitelist/              # Your whitelist API modules
├── prisma/                 # Database service
├── dto/                    # Data validation
└── main.ts                 # For local development only
```

### 🚀 **How the Serverless Architecture Works:**

1. **Local Development**: Uses `src/main.ts` with traditional NestJS server
2. **Vercel Production**: Uses `api/index.ts` as a serverless function
3. **Database**: Prisma connects to your PostgreSQL database
4. **Routes**: All API calls go through `/api/*` endpoints

### 🌐 **API Endpoints (Serverless):**

- `POST /api/whitelist` - Add wallet to whitelist  
- `GET /api/whitelist` - Get all whitelisted wallets
- `GET /api/whitelist/stats` - Get whitelist statistics
- `GET /api/whitelist/check/:walletAddress` - Check if whitelisted
- `DELETE /api/whitelist/:walletAddress` - Remove from whitelist

### 📦 **Deploy to Vercel:**

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Set Environment Variables:**

   ```bash
   vercel env add DATABASE_URL
   vercel env add FRONTEND_URL
   ```

4. **Deploy:**

   ```bash
   vercel --prod
   ```

### 🗄️ **Database Setup Options:**

**Option 1: Vercel Postgres (Recommended for serverless)**

```bash
# In your Vercel dashboard, add Vercel Postgres
# Copy the connection string to your environment variables
```

**Option 2: Neon (Free PostgreSQL)**

```bash
# Create account at neon.tech
# Create database and copy connection string
```

**Option 3: Supabase**

```bash
# Create account at supabase.com  
# Create project and copy connection string
```

### 🛠️ **Local Development:**

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Update DATABASE_URL in .env

# 3. Run migrations
npx prisma migrate dev --name init

# 4. Start development server
npm run start:dev
```

### ⚡ **Key Serverless Benefits:**

- ✅ **Auto-scaling**: Handles traffic spikes automatically
- ✅ **Cost-effective**: Pay only for actual usage
- ✅ **Zero server management**: No server maintenance needed
- ✅ **Global edge deployment**: Fast response times worldwide
- ✅ **Prisma connection pooling**: Efficient database connections

### 🔧 **Files That Make It Serverless:**

- `api/index.ts` - The serverless function handler
- `vercel.json` - Vercel deployment configuration  
- `prisma/schema.prisma` - Database schema for connection pooling
- `package.json` - Build scripts optimized for serverless

### 🎯 **Production Checklist:**

- [ ] Database URL configured in Vercel
- [ ] Frontend URL configured for CORS  
- [ ] Environment variables set in Vercel dashboard
- [ ] Database migrations applied
- [ ] Vercel deployment successful

Your backend is now **100% serverless** and ready for production! 🚀
