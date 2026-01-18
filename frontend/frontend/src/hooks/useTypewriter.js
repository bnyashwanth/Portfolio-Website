import { useEffect, useState } from "react";

const getHumanTypingDelay = (char, base = 110) => {
  if (char === " ") return base + 120;       // pause after space
  if (char === "@") return base + 180;       // pause on symbols
  if (char === ".") return base + 250;       // pause on punctuation
  return base + Math.random() * 90;          // natural jitter
};

const useTypewriter = (
  words,
  typingSpeed = 110,
  deletingSpeed = 70,
  delayBetweenWords = 1800
) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    // ---- TYPING ----
    if (!isDeleting && text.length < currentWord.length) {
      const nextChar = currentWord[text.length];
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length + 1));
      }, getHumanTypingDelay(nextChar, typingSpeed));
    }

    // ---- PAUSE AFTER FULL WORD ----
    else if (!isDeleting && text.length === currentWord.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenWords);
    }

    // ---- DELETING (slower + uneven) ----
    else if (isDeleting && text.length > 0) {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length - 1));
      }, deletingSpeed + Math.random() * 60);
    }

    // ---- MOVE TO NEXT WORD ----
    else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    delayBetweenWords,
  ]);

  return text;
};

export default useTypewriter;
