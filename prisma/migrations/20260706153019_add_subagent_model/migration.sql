-- CreateTable
CREATE TABLE "Subagent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brokerId" INTEGER NOT NULL,

    CONSTRAINT "Subagent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subagent_name_brokerId_key" ON "Subagent"("name", "brokerId");

-- AddForeignKey
ALTER TABLE "Subagent" ADD CONSTRAINT "Subagent_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "Broker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
