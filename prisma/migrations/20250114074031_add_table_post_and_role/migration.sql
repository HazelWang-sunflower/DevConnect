-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "accountEmail" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_type_key" ON "role"("type");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_accountEmail_fkey" FOREIGN KEY ("accountEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
