-- CreateTable
CREATE TABLE "user_profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_id_key" ON "user_profile"("id");
