import { useEffect, useRef, useState } from "react";

import getCard from "./hooks/getCard";
import { setInfo } from "./hooks/setInfo";

function App() {
  const [card, setCard] = useState<SVGSVGElement | null>(null);
  const cardElement = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [title, setTitle] = useState("企画名を入力");
  const [description, setDescription] = useState("紹介文が入力されます");
  const [organization, setOrganization] = useState("企画団体名");
  const [location, setLocation] = useState("11a");
  useEffect(() => {
    getCard().then((card) => {
      setCard(card);
      setIsLoaded(true);
    });
  }, []);
  useEffect(() => {
    if (isLoaded) {
      if (card && cardElement.current) {
        cardElement.current.innerHTML = "";
        if (setInfo(card, title, description, organization, location)) {
          cardElement.current.appendChild(card);
          console.log("setInfo");
        }
      }
    }
  }, [title, description, organization, location, isLoaded, card]);

  function handleDownload() {
    if (card && cardElement.current) {
      const svgData = new XMLSerializer().serializeToString(card);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "card.svg";
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  return (
    <>
      <div>
        <h1>企画カードを作ろう！</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div ref={cardElement}></div>
        <button onClick={handleDownload}>Download</button>
      </div>
    </>
  );
}

export default App;
