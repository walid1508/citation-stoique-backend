"use client";

import HomeView from "../components/home-view";
import { QuoteProvider } from "../contexts/quote-context";

const HomePage = () => {
  return (
    <QuoteProvider>
      <HomeView />
    </QuoteProvider>
  );
};

export default HomePage;
