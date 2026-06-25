-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "abbr" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chineseName" TEXT,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3),
    "gender" TEXT NOT NULL,
    "industry" TEXT,
    "natureOfWork" TEXT,
    "workDescription" TEXT,
    "remark" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsurancePolicy" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "processType" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "policyNumber" TEXT NOT NULL,
    "quotationNumber" TEXT,
    "remark" TEXT,
    "clientId" INTEGER NOT NULL,
    "insuranceCompanyId" INTEGER NOT NULL,
    "brokerId" INTEGER NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "premiumAmount" DOUBLE PRECISION,
    "currency" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "previousPolicyId" INTEGER,

    CONSTRAINT "InsurancePolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehiclePolicyDetail" (
    "id" SERIAL NOT NULL,
    "policyId" INTEGER NOT NULL,
    "coverageType" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "engineNumber" TEXT,
    "chassisNumber" TEXT,
    "vehicleBodyType" TEXT NOT NULL,
    "manufacturer" TEXT,
    "modelName" TEXT,
    "enginDisplacement" DOUBLE PRECISION NOT NULL,
    "totalWeight" DOUBLE PRECISION NOT NULL,
    "yearOfManufacture" INTEGER NOT NULL,
    "seatNumber" DOUBLE PRECISION NOT NULL,
    "region" TEXT NOT NULL,
    "moneyLenderLicence" TEXT,

    CONSTRAINT "VehiclePolicyDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomePolicyDetail" (
    "id" SERIAL NOT NULL,
    "policyId" INTEGER NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "sumInsuredStructure" DOUBLE PRECISION,
    "isMortgaged" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "HomePolicyDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LifePolicyDetail" (
    "id" SERIAL NOT NULL,
    "policyId" INTEGER NOT NULL,
    "beneficiaryName" TEXT NOT NULL,
    "sumAssured" DOUBLE PRECISION NOT NULL,
    "medicalRequired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LifePolicyDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceCompany" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "InsuranceCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Broker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Broker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientFile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "ClientFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "abbr" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePolicy_uuid_key" ON "InsurancePolicy"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePolicy_policyNumber_key" ON "InsurancePolicy"("policyNumber");

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePolicy_previousPolicyId_key" ON "InsurancePolicy"("previousPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "VehiclePolicyDetail_policyId_key" ON "VehiclePolicyDetail"("policyId");

-- CreateIndex
CREATE UNIQUE INDEX "HomePolicyDetail_policyId_key" ON "HomePolicyDetail"("policyId");

-- CreateIndex
CREATE UNIQUE INDEX "LifePolicyDetail_policyId_key" ON "LifePolicyDetail"("policyId");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceCompany_name_key" ON "InsuranceCompany"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Broker_name_key" ON "Broker"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_abbr_key" ON "Currency"("abbr");

-- AddForeignKey
ALTER TABLE "InsurancePolicy" ADD CONSTRAINT "InsurancePolicy_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "Broker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsurancePolicy" ADD CONSTRAINT "InsurancePolicy_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsurancePolicy" ADD CONSTRAINT "InsurancePolicy_insuranceCompanyId_fkey" FOREIGN KEY ("insuranceCompanyId") REFERENCES "InsuranceCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsurancePolicy" ADD CONSTRAINT "InsurancePolicy_previousPolicyId_fkey" FOREIGN KEY ("previousPolicyId") REFERENCES "InsurancePolicy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehiclePolicyDetail" ADD CONSTRAINT "VehiclePolicyDetail_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "InsurancePolicy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomePolicyDetail" ADD CONSTRAINT "HomePolicyDetail_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "InsurancePolicy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LifePolicyDetail" ADD CONSTRAINT "LifePolicyDetail_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "InsurancePolicy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientFile" ADD CONSTRAINT "ClientFile_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

