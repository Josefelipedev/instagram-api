-- CreateTable
CREATE TABLE "InstagramSession" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "session" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstagramSession_pkey" PRIMARY KEY ("id")
);
