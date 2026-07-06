-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "brokerId" INTEGER,
ADD COLUMN     "subagentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "Broker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_subagentId_fkey" FOREIGN KEY ("subagentId") REFERENCES "Subagent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
