// src/controllers/ErrorController.js
import { useState, useCallback } from "react";

export const useErrorController = () => {
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  const handleError = useCallback((error, errorInfo) => {
    setError(error);
    setErrorInfo(errorInfo);
    console.error('Game Error:', error, errorInfo);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setErrorInfo(null);
  }, []);

  const logError = useCallback((message, details) => {
    console.error(`Game Log: ${message}`, details);
  }, []);

  return {
    error,
    errorInfo,
    hasError: error !== null,
    handleError,
    clearError,
    logError,
  };
};
