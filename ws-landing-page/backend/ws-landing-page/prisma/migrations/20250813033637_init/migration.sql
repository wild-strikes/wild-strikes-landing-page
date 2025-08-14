-- CreateTable
CREATE TABLE "public"."whitelist" (
    "id" SERIAL NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "email" TEXT,
    "signature" TEXT,
    "message" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "whitelist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "whitelist_wallet_address_key" ON "public"."whitelist"("wallet_address");
