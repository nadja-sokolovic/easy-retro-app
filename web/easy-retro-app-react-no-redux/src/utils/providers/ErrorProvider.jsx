import React, { createContext, useContext, useState, useCallback } from 'react';

const ErrorContext = createContext({ hasErrors: false, showError: () => {}, hideError: () => {} });

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
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
