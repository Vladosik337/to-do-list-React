import React from 'react';

interface CheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className="mr-3 h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
    />
  );
};

export default Checkbox;
