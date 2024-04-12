import React, { useEffect, useState } from "react";

type ScrollToTopProps = {
    scrollY: number;
    target?: React.ReactElement;
};

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ scrollY, target = window.document.body }) => {
  const [backToTop, setBackToTop] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > scrollY) {
      setBackToTop(true);
    } else {
      setBackToTop(false);
    }
  };

  console.log(target)

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {backToTop && (
        <p
          style={{
            backgroundColor: "red",
            padding: "10px",
            position: "fixed",
            bottom: "300px",
          }}
          onClick={scrollUp}
        >
          Lên đầu
        </p>
      )}
    </>
  );
};
