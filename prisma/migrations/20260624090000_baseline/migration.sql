-- Baseline migration generated from current schema.prisma model.

-- CreateTable
CREATE TABLE "Client" (
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"type" TEXT NOT NULL,
	"identity" TEXT NOT NULL,
	"abbr" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"chineseName" TEXT,
	"address1" TEXT NOT NULL,
	"address2" TEXT,
	"phoneNumber" TEXT NOT NULL,
	"email" TEXT,
	"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" DATETIME NOT NULL,
	"date" DATETIME,
	"gender" TEXT NOT NULL,
	"industry" TEXT,
	"natureOfWork" TEXT,
	"workDescription" TEXT,
	"remark" TEXT
);

-- CreateTable
CREATE TABLE "InsuranceCompany" (
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Broker" (
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Currency" (
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"abbr" TEXT NOT NULL,
	"rate" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "InsurancePolicy" (
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"uuid" TEXT NOT NULL,
	"processType" TEXT NOT NULL,
	"category" TEXT NOT NULL,
	"policyNumber" TEXT NOT NULL,
	"quotationNumber" TEXT,
	"remark" TEXT,
	"clientId" INTEGER NOT NULL,
	"insuranceCompanyId" INTEGER NOT NULL,
	"brokerId" INTEGER NOT NULL,
	"effectiveDate" DATETIME NOT NULL,
	"expiryDate" DATETIME NOT NULL,
	"premiumAmount" REAL,
	"currency" TEXT,
	"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" DATETIME NOT NULL,
	"previousPolicyId" INTEGER,
	CONSTRAINT "InsurancePolicy_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "InsurancePolicy_insuranceCompanyId_fkey" FOREIGN KEY ("insuranceCompanyId") REFERENCES "InsuranceCompany" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT "InsurancePolicy_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "Broker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT "InsurancePolicy_previousPolicyId_fkey" FOREIGN KEY ("previousPolicyId") REFERENCES "InsurancePolicy" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VehiclePolicyDetail" (
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"policyId" INTEGER NOT NULL,
	"coverageType" TEXT NOT NULL,
	"registrationNumber" TEXT NOT NULL,
	"vehicleType" TEXT NOT NULL,
	"engineNumber" TEXT,
	"chassisNumber" TEXT,
	"vehicleBodyType" TEXT NOT NULL,
	"manufacturer" TEXT,
	"modelName" TEXT,
	"enginDisplacement" REAL NOT NULL,
	"totalWeight" REAL NOT NULL,
	"yearOfManufacture" INTEGER NOT NULL,
	"seatNumber" REAL NOT NULL,
	"region" TEXT NOT NULL,
	"moneyLenderLicence" TEXT,
	CONSTRAINT "VehiclePolicyDetail_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "InsurancePolicy" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HomePolicyDetail" (
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"policyId" INTEGER NOT NULL,
	"propertyAddress" TEXT NOT NULL,
	"propertyType" TEXT NOT NULL,
	"sumInsuredStructure" REAL,
	"isMortgaged" BOOLEAN NOT NULL DEFAULT false,
	CONSTRAINT "HomePolicyDetail_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "InsurancePolicy" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LifePolicyDetail" (
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"policyId" INTEGER NOT NULL,
	"beneficiaryName" TEXT NOT NULL,
	"sumAssured" REAL NOT NULL,
	"medicalRequired" BOOLEAN NOT NULL DEFAULT false,
	CONSTRAINT "LifePolicyDetail_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "InsurancePolicy" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClientFile" (
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name" TEXT NOT NULL,
	"path" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"size" INTEGER NOT NULL,
	"mimeType" TEXT NOT NULL,
	"uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"clientId" INTEGER NOT NULL,
	CONSTRAINT "ClientFile_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceCompany_name_key" ON "InsuranceCompany"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Broker_name_key" ON "Broker"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_abbr_key" ON "Currency"("abbr");

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePolicy_uuid_key" ON "InsurancePolicy"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePolicy_policyNumber_key" ON "InsurancePolicy"("policyNumber");

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePolicy_previousPolicyId_key" ON "InsurancePolicy"("previousPolicyId");

-- CreateIndex
CREATE INDEX "InsurancePolicy_clientId_idx" ON "InsurancePolicy"("clientId");

-- CreateIndex
CREATE INDEX "InsurancePolicy_insuranceCompanyId_idx" ON "InsurancePolicy"("insuranceCompanyId");

-- CreateIndex
CREATE INDEX "InsurancePolicy_brokerId_idx" ON "InsurancePolicy"("brokerId");

-- CreateIndex
CREATE UNIQUE INDEX "VehiclePolicyDetail_policyId_key" ON "VehiclePolicyDetail"("policyId");

-- CreateIndex
CREATE UNIQUE INDEX "HomePolicyDetail_policyId_key" ON "HomePolicyDetail"("policyId");

-- CreateIndex
CREATE UNIQUE INDEX "LifePolicyDetail_policyId_key" ON "LifePolicyDetail"("policyId");

-- CreateIndex
CREATE INDEX "ClientFile_clientId_idx" ON "ClientFile"("clientId");
