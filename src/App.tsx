import { useCallback, useEffect, useRef, useState } from "react";

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
  const [displayImage, setDisplayImage] = useState<string | ArrayBuffer | null>(
    null
  );
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
        if (
          setInfo(
            card,
            title,
            description,
            organization,
            location,
            displayImage
          )
        ) {
          cardElement.current.appendChild(card);
          console.log("setInfo");
        }
      }
    }
  }, [
    title,
    description,
    organization,
    location,
    isLoaded,
    card,
    displayImage,
  ]);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) {
      return;
    }
    // 選択されたファイルが画像ファイル以外だったらreturn
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      // バリデーションメッセージ表示
      console.log("jpeg/pngファイルを選択してください");
      return;
    }
    const reader = new FileReader();
    // base6４に変換
    reader.readAsDataURL(file);
    reader.onload = () => {
      // base64に変換した結果をstateにセットする
      setDisplayImage(reader.result);
      console.log(reader.result);
    };
  }, []);

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
  // Shift+Enterでも保存できるようにする
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.shiftKey) {
        handleDownload();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <div>
        <h1>企画カードを作ろう！</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <div>
            <h2>企画名</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <h2>企画紹介文</h2>
            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "800px" }}
            />
          </div>
          <div>
            <h2>企画団体名</h2>
            <input
              type="text"
              placeholder="Organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </div>
          <div>
            <h2>企画場所</h2>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <h2>画像</h2>
            <input type="file" onChange={handleUpload} />
          </div>
        </div>
        <div ref={cardElement} style={{ width: "100%", margin: "20px" }}></div>
        <button onClick={handleDownload}>作成したカードをダウンロード</button>
      </div>
    </>
  );
}

export default App;
