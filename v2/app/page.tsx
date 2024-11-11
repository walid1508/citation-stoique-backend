"use client";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import HomeView from "../components/home-view";
import { QuoteProvider } from "../contexts/quote";

const HomePage = () => {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        console.log("Fetching quote...");
        const response = await fetch("/api/quote");
        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }
        const data = await response.json();
        console.log("Quote data received:", data);
        setQuote(data);
        setError(null);
      } catch (err: any) {
        console.error("Error during initial quote fetch:", err);
        setError(
          err.message || "An error occurred while fetching the initial quote."
        );
        setQuote(null);
      }
    };

    fetchQuote();
  }, []);

  console.log("Quote state in HomePage:", quote);
  console.log("Error state in HomePage:", error);

  return (
    <QuoteProvider initialQuote={quote} serverError={error}>
      <HomeView />
    </QuoteProvider>
  );
};

HomePage.defaultProps = {
  error: null,
  quote: null,
};

HomePage.propTypes = {
  error: PropTypes.any,
  quote: PropTypes.shape({
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }),
};

export default HomePage;
