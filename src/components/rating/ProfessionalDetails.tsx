
import React from 'react';
import { cn } from '@/lib/utils';
import { Professional } from '@/services/supabaseService';

interface ProfessionalDetailsProps {
  profName: string;
  profPhone: string;
  companyName: string;
  onProfNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  professional: Professional | null | undefined;
  errors: { [key: string]: boolean };
}

const ProfessionalDetails: React.FC<ProfessionalDetailsProps> = ({
  profName,
  profPhone,
  companyName,
  onProfNameChange,
  professional,
  errors
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3 rtl">פרטי בעל המקצוע</h3>
      
      <div className="mb-4">
        <label htmlFor="profName" className="block text-sm font-medium text-gray-700 mb-1 rtl">שם בעל המקצוע*</label>
        <input
          type="text"
          id="profName"
          value={profName}
          onChange={professional ? undefined : onProfNameChange}
          className={cn(
            "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary rtl",
            errors.profName ? "border-red-500 bg-red-50" : "border-gray-300",
            professional ? "bg-gray-100" : ""
          )}
          placeholder="הזינו את שם בעל המקצוע"
          readOnly={!!professional}
          required
        />
        {errors.profName && (
          <p className="text-red-500 text-sm mt-1 rtl">נא להזין את שם בעל המקצוע</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="profPhone" className="block text-sm font-medium text-gray-700 mb-1 rtl">מספר טלפון*</label>
        <input
          type="tel"
          id="profPhone"
          value={profPhone}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-gray-100 rtl"
          placeholder="מספר טלפון"
          required
        />
      </div>

      {(companyName || professional) && (
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1 rtl">שם החברה</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-gray-100 rtl"
            placeholder="שם החברה"
          />
        </div>
      )}
    </div>
  );
};

export default ProfessionalDetails;
