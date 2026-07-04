"use client";

import React from 'react';
import { Dialog } from '@mui/material';
import type { Client, VehicleType, VehicleBodyType, InsurancePolicy } from '~/generated/prisma/client'; 
import InsurancePolicyForm from '../forms/InsurancePolicyForm';
import type { InsuranceGeneralInformation } from '~/.frontend/models/InsuranceGenernalInformation';
import type { VehiclePolicyDetailInformation } from '~/.frontend/models/VehiclePolicyDetailInformation';
import { DateTime } from 'luxon';

interface PolicyUpsertDialogProps {
  open: boolean;
  clients?: Client[];
  insuranceCompanies?: any[];
  brokers?: any[];
  vehicleTypes?: VehicleType[];
  vehicleBodyTypes?: VehicleBodyType[];
  policy?: (InsurancePolicy & { vehicleDetail?: { coverageType: string; registrationNumber: string; vehicleType: string; engineNumber?: string | null; chassisNumber?: string | null; vehicleBodyType: string; manufacturer?: string | null; modelName?: string | null; enginDisplacement: number; totalWeight: number; yearOfManufacture: number; seatNumber: number; region: string; moneyLenderLicence?: string | null; } | null }) | null;
  onClose: () => void;
  onSave?: (data: { insuranceGeneralInformation: InsuranceGeneralInformation; vehiclePolicyDetailInformation: VehiclePolicyDetailInformation }) => void;
}

const PolicyUpsertDialog: React.FC<PolicyUpsertDialogProps> = ({ open, clients, insuranceCompanies, brokers, vehicleTypes, vehicleBodyTypes, policy, onClose, onSave }) => {

  const handleInternalClose = () => {
    onClose();
  };

  // Compute initial defaults from the policy if editing
  const getInitialGeneralInfo = (): InsuranceGeneralInformation | undefined => {
    if (!policy) return undefined;
    return {
      uuid: policy.uuid,
      processType: policy.processType as 'New' | 'Renewal',
      category: policy.category as 'Vehicle' | 'Home' | 'Life',
      policyNumber: policy.policyNumber,
      quotationNumber: policy.quotationNumber || '',
      remark: policy.remark || '',
      clientId: policy.clientId,
      insuranceCompanyId: policy.insuranceCompanyId,
      brokerId: policy.brokerId,
      effectiveDate: policy.effectiveDate,
      expiryDate: policy.expiryDate,
      premiumAmount: policy.premiumAmount || 0,
      currency: (policy.currency as 'HKD' | 'USD' | 'CNY') || 'HKD',
      updateDate: new Date(),
      previousPolicyId: policy.previousPolicyId,
    };
  };

  const getInitialVehicleDetail = (): VehiclePolicyDetailInformation | undefined => {
    if (!policy?.vehicleDetail) return undefined;
    const vd = policy.vehicleDetail;
    return {
      coverageType: vd.coverageType as 'Comprehensive' | 'Third-Party',
      registrationNumber: vd.registrationNumber,
      vehicleType: vd.vehicleType,
      engineNumber: vd.engineNumber || '',
      chassisNumber: vd.chassisNumber || '',
      vehicleBodyType: vd.vehicleBodyType,
      manufacturer: vd.manufacturer || '',
      modelName: vd.modelName || '',
      enginDisplacement: vd.enginDisplacement,
      totalWeight: vd.totalWeight,
      yearOfManufacture: vd.yearOfManufacture,
      seatNumber: vd.seatNumber,
      region: vd.region as 'Hong Kong' | 'Mainland China' | 'Overseas',
      moneyLenderLicenceNumber: vd.moneyLenderLicence || undefined,
    };
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleInternalClose}
      slotProps={{
        paper: {
          sx: {
            maxWidth: '80%',
            maxHeight: '80vh',
            borderRadius: 4,
          },
        },
      }}
    > 
        <InsurancePolicyForm
          clients={clients || []}
          insuranceCompanies={insuranceCompanies || []}
          brokers={brokers || []}
          vehicleTypes={vehicleTypes || []}
          vehicleBodyTypes={vehicleBodyTypes || []}
          initialGeneralInfo={getInitialGeneralInfo()}
          initialVehicleDetail={getInitialVehicleDetail()}
          onSave={(data) => {
            onSave?.(data);
            handleInternalClose();
          }}
        ></InsurancePolicyForm> 
    </Dialog>
  );
};

export default PolicyUpsertDialog;
