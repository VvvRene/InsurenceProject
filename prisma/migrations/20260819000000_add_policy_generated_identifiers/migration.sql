CREATE OR REPLACE FUNCTION generate_policy_record_identifiers()
RETURNS trigger AS $$
BEGIN
  IF NEW."policyNumber" IS NULL OR btrim(NEW."policyNumber") = '' THEN
    NEW."policyNumber" := 'POL-' || upper(substr(md5(random()::text), 1, 12));
  END IF;

  IF NEW.uuid IS NULL OR btrim(NEW.uuid) = '' THEN
    NEW.uuid := 'P-?-'
      || upper(substr(md5(random()::text), 1, 6));
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION finalize_policy_record_identifiers()
RETURNS trigger AS $$
DECLARE
  suffix_text TEXT;
BEGIN
  IF NEW.uuid LIKE 'P-?-%' THEN
    suffix_text := substr(NEW.uuid, length('P-?-') + 1);
    UPDATE "InsurancePolicy"
    SET uuid = 'P-' || NEW.id || '-' || suffix_text
    WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_policy_generated_identifiers ON "InsurancePolicy";
DROP TRIGGER IF EXISTS trg_policy_finalize_generated_identifiers ON "InsurancePolicy";

CREATE TRIGGER trg_policy_generated_identifiers
BEFORE INSERT OR UPDATE OF uuid, "policyNumber"
ON "InsurancePolicy"
FOR EACH ROW
EXECUTE FUNCTION generate_policy_record_identifiers();

CREATE TRIGGER trg_policy_finalize_generated_identifiers
AFTER INSERT
ON "InsurancePolicy"
FOR EACH ROW
EXECUTE FUNCTION finalize_policy_record_identifiers();