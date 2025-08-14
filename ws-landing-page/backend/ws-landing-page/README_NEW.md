# Wild Strikes Landing Page - Backend

A serverless NestJS backend with Prisma ORM for managing whitelist functionality.

## Features

- 🚀 Serverless deployment ready for Vercel
- 📊 PostgreSQL database with Prisma ORM
- ✅ Wallet address whitelist management
- 🔒 Input validation and error handling
- 📝 TypeScript support
- 🌍 CORS enabled for frontend integration

## API Endpoints

### Whitelist Management

- `POST /api/whitelist` - Add wallet to whitelist
- `GET /api/whitelist` - Get all whitelisted wallets
- `GET /api/whitelist/stats` - Get whitelist statistics
- `GET /api/whitelist/check/:walletAddress` - Check if wallet is whitelisted
- `GET /api/whitelist/:walletAddress` - Get specific wallet details
- `DELETE /api/whitelist/:walletAddress` - Remove wallet from whitelist

## Setup Instructions

### Local Development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your database URL and other configurations.

3. **Set up the database**

   ```bash
   # Create and run migrations
   npx prisma migrate dev --name init
   
   # Generate Prisma client
   npx prisma generate
   ```

4. **Start the development server**

   ```bash
   npm run start:dev
   ```

### Vercel Deployment

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Set up environment variables on Vercel**

   ```bash
   vercel env add DATABASE_URL
   vercel env add FRONTEND_URL
   ```

4. **Deploy**

   ```bash
   vercel --prod
   ```

## Database Schema

The application uses a single `Whitelist` model:

```prisma
model Whitelist {
  id            Int      @id @default(autoincrement())
  walletAddress String   @unique
  email         String?
  signature     String?
  message       String?
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `FRONTEND_URL` - Frontend application URL for CORS
- `PORT` - Server port (default: 3001)

## Project Structure

```
src/
├── dto/                 # Data Transfer Objects
├── prisma/             # Prisma service
├── whitelist/          # Whitelist module
│   ├── whitelist.controller.ts
│   ├── whitelist.service.ts
│   └── whitelist.module.ts
├── app.module.ts       # Main application module
└── main.ts            # Application entry point
```

## Request/Response Examples

### Add to Whitelist

```bash
POST /api/whitelist
Content-Type: application/json

{
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "email": "user@example.com",
  "signature": "0x...",
  "message": "I agree to join the whitelist"
}
```

Response:

```json
{
  "success": true,
  "message": "Successfully added to whitelist",
  "data": {
    "id": 1,
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "email": "user@example.com",
    "signature": "0x...",
    "message": "I agree to join the whitelist",
    "isActive": true,
    "createdAt": "2025-08-13T10:00:00.000Z",
    "updatedAt": "2025-08-13T10:00:00.000Z"
  }
}
```

### Check Whitelist Status

```bash
GET /api/whitelist/check/0x1234567890abcdef1234567890abcdef12345678
```

Response:

```json
{
  "success": true,
  "data": {
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "isWhitelisted": true
  }
}
```
