-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT,
    "logo" TEXT,
    "featured" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");
