import React, { createContext, useContext, useState, useCallback } from 'react';

interface ErrorContextType {
  hasErrors: boolean;
  showError: () => void;
  hideError: () => void;
}


interface ErrorProviderProps {
  children: React.ReactNode;
}

const ErrorContext = createContext<ErrorContextType>({
  hasErrors: false,
  showError: () => {},
  hideError: () => {} 
});

export const useError = () => useContext(ErrorContext);

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [hasErrors, setHasErrors] = useState(false);

  const showError = useCallback(() => {
    setHasErrors(true);
  }, []);

  const hideError = useCallback(() => {
    setHasErrors(false);
  }, []);

  return (
    <ErrorContext.Provider value={{ hasErrors, showError, hideError }}>
      {children}
    </ErrorContext.Provider>
  );
};
