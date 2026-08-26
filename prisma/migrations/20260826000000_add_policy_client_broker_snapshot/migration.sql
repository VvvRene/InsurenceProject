ALTER TABLE "InsurancePolicy"
ADD COLUMN "clientBrokerId" INTEGER;

UPDATE "InsurancePolicy" AS policy
SET "clientBrokerId" = client."brokerId"
FROM "Client" AS client
WHERE policy."clientId" = client.id;

ALTER TABLE "InsurancePolicy"
ADD CONSTRAINT "InsurancePolicy_clientBrokerId_fkey"
FOREIGN KEY ("clientBrokerId") REFERENCES "Broker"(id)
ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "InsurancePolicy_clientBrokerId_idx"
ON "InsurancePolicy"("clientBrokerId");