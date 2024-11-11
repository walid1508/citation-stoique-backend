import styled from "@emotion/styled";

import { useQuoteContext } from "@/contexts/quote-context";
import Blockquote from "./blockquote";
import ClickIcon from "./click-icon";
import ErrorMessage from "./error-message";

const Container = styled.div`
  position: relative;
  min-height: 100%;
  width: 100%;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10vw 5vw;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }
`;

const Hint = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;

  @media (max-width: 620px) {
    right: auto;
    left: 20px;
  }
`;

const HomeView = () => {
  const { quote, loading, error, fetchQuote } = useQuoteContext();

  const buttonKeyDown = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    } else if (event.keyCode === 13) {
      event.preventDefault();
      fetchQuote();
    }
  };

  const buttonKeyUp = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
      fetchQuote();
    }
  };

  return (
    <Container
      tabIndex={0}
      role="button"
      aria-label="Get a new random quote"
      onClick={fetchQuote}
      onKeyDown={buttonKeyDown}
      onKeyUp={buttonKeyUp}
    >
      {loading ? (
        <p>Chargement...</p>
      ) : quote ? (
        <Blockquote text={quote.text} author={quote.author} animate={loading} />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <p>Pas de citation disponible.</p>
      )}
      <Hint>
        <ClickIcon color="#ffffff" size={64} />
      </Hint>
    </Container>
  );
};

export default HomeView;
