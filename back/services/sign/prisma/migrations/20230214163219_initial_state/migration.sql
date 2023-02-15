-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "token" TEXT,
    "tokenTime" TIMESTAMP(3),
    "code" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_createdAt_updatedAt_email_password_name_token_token_key" ON "User"("id", "createdAt", "updatedAt", "email", "password", "name", "token", "tokenTime", "code", "active");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_code_active_key" ON "User"("email", "code", "active");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_password_active_key" ON "User"("email", "password", "active");
