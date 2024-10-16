import React, { useState } from 'react';

interface AddItemInput {
  onAddItem: (newItemTitle: string) => void;
  placeholder: string;
  buttonText: string;
}

const InputWithButton: React.FC<AddItemInput> = ({ onAddItem, placeholder, buttonText }) => {
  const [inputTitle, setInputTitle] = useState('');

  const handleAddItem = () => {
    if (inputTitle.trim()) {
      onAddItem(inputTitle);
      setInputTitle('');
    }
  };

  const handleClearInput = () => {
    setInputTitle('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2 rounded-lg shadow-sm bg-gray-100">
      <input
        type="text"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
      />
      {inputTitle && (
        <button
          onClick={handleClearInput}
          className="px-3 py-1 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200 ease-in-out"
        >
          ✕
        </button>
      )}
      <button
        onClick={handleAddItem}
        className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-200 ease-in-out shadow-lg"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default InputWithButton;
