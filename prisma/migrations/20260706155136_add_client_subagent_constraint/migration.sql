-- Add CHECK constraint: if subagentId is set, brokerId must also be set
ALTER TABLE "Client" ADD CONSTRAINT "client_broker_required_for_subagent"
  CHECK ("brokerId" IS NOT NULL OR "subagentId" IS NULL);

-- Create function to validate subagent belongs to the same broker
CREATE OR REPLACE FUNCTION check_client_subagent_broker_consistency()
RETURNS trigger AS $$
BEGIN
  IF NEW."subagentId" IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM "Subagent"
      WHERE id = NEW."subagentId"
        AND "brokerId" = NEW."brokerId"
    ) THEN
      RAISE EXCEPTION 'Subagent (id=%) does not belong to Broker (id=%)', NEW."subagentId", NEW."brokerId"
        USING HINT = 'The subagentId must reference a subagent that belongs to the specified brokerId.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to enforce the consistency on insert or update
DROP TRIGGER IF EXISTS trg_client_subagent_broker_consistency ON "Client";
CREATE TRIGGER trg_client_subagent_broker_consistency
  BEFORE INSERT OR UPDATE OF "brokerId", "subagentId"
  ON "Client"
  FOR EACH ROW
  EXECUTE FUNCTION check_client_subagent_broker_consistency();