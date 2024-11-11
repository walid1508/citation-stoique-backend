"use client";

import PropTypes from "prop-types";
import React, { ReactNode } from "react";

export const quoteContext = React.createContext<{
  quote: { text: string; author: string } | null;
  loading: boolean;
  error: any;
  fetchNewQuote: () => Promise<void>;
}>({
  quote: null,
  loading: false,
  error: null,
  fetchNewQuote: async () => {},
});
const { Provider } = quoteContext;

interface QuoteProviderProps {
  children: ReactNode;
  initialQuote?: {
    text: string;
    author: string;
  } | null;
  serverError?: any;
}

export const QuoteProvider: React.FC<QuoteProviderProps> = ({
  children,
  initialQuote = null,
  serverError,
}) => {
  const [quote, setQuote] = React.useState(initialQuote);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(serverError);

  const fetchNewQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/quote");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch quote: ${response.status} ${response.statusText}`
        );
      }
      const newQuote = await response.json();
      setQuote(newQuote);
    } catch (err: any) {
      console.error("Error fetching new quote:", err);
      setError(err.message || "An unknown error occurred");
    }

    setLoading(false);
  };

  return (
    <Provider value={{ quote, loading, error, fetchNewQuote }}>
      {children}
    </Provider>
  );
};

QuoteProvider.propTypes = {
  children: PropTypes.node.isRequired,
  serverError: PropTypes.any,
  initialQuote: PropTypes.shape({
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }),
};
