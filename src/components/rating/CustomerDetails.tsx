
import React from 'react';
import { cn } from '@/lib/utils';

interface CustomerDetailsProps {
  customerName: string;
  customerPhone: string;
  onCustomerNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCustomerPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: boolean };
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customerName,
  customerPhone,
  onCustomerNameChange,
  onCustomerPhoneChange,
  errors
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3 rtl">פרטי הלקוח</h3>
      
      <div className="mb-4">
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1 rtl">שם מלא של הלקוח*</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={onCustomerNameChange}
          className={cn(
            "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary rtl",
            errors.customerName ? "border-red-500 bg-red-50" : "border-gray-300"
          )}
          placeholder="הזינו את השם המלא שלכם"
          required
        />
        {errors.customerName && (
          <p className="text-red-500 text-sm mt-1 rtl">נא להזין את השם המלא שלכם</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1 rtl">מספר טלפון של הלקוח*</label>
        <input
          type="tel"
          id="customerPhone"
          value={customerPhone}
          onChange={onCustomerPhoneChange}
          className={cn(
            "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary rtl",
            errors.customerPhone ? "border-red-500 bg-red-50" : "border-gray-300"
          )}
          placeholder="הזינו את מספר הטלפון שלכם"
          required
        />
        {errors.customerPhone && (
          <p className="text-red-500 text-sm mt-1 rtl">נא להזין את מספר הטלפון שלכם</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
