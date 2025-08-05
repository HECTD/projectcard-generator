export type Project = {
  organizationName: string;
  projectTitle: string;
  thumbnail?: string | ArrayBuffer | null;
  tags: string[];
  description: {
    heading: string;
    text: string;
  };
  location: {
    name: string;
    number: string;
  }[];
};

export default function ProjectCard(props: { project: Project }) {
  // 場所名の1文字目の数値によって色を変える
  const getLocationFillColor = (num: string) => {
    switch (num) {
      case "1":
        return "#7744ba";
      case "2":
        return "#4499ba";
      case "3":
        return "#00a37e";
      case "4":
        return "#ffbb00";
      case "5":
        return "#ef4644";
      case "6":
        return "#ef810f";
      case "7":
        return "#008009";
      default:
        return "#252525";
    }
  };
  const locationFillColor = getLocationFillColor(
    props.project.location[0].number.charAt(0)
  );

  // 企画タイトルは13文字ごとに分割
  // 見出しは15文字ごとに分割
  // 紹介文は33文字ごとに分割

  const projectTitle: string[] =
    props.project.projectTitle.match(/.{1,13}/g) || [];
  const description: {
    heading: string[];
    text: string[];
  } = {
    heading: props.project.description.heading.match(/.{1,15}/g) || [],
    text: props.project.description.text.match(/.{1,33}/g) || [],
  };
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1361 229"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5,
      }}
    >
      <defs>
        <style>
          {
            "<![CDATA[@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Noto+Sans+JP:wght@100..900&display=swap');]]>"
          }
        </style>
      </defs>
      <g transform="matrix(1,0,0,1,-59.0551,-182.069)">
        <g transform="matrix(0.617394,0,0,0.617394,3.48962,173.872)">
          {/* 場所A */}
          <g
            id="場所A"
            transform="matrix(0.517241,0,0,0.517241,-13.4483,-38.7931)"
          >
            <g id="ナンバリングA" transform="matrix(1,0,0,1,-640,-1080)">
              <g
                id="ナンバリング枠A"
                transform="matrix(0.78125,0,0,0.192308,277.5,1173.08)"
              >
                <path
                  d="M1040,714.427L1040,1125.57C1040,1155.61 1034,1180 1026.6,1180L733.397,1180C726.003,1180 720,1155.61 720,1125.57L720,714.427C720,684.388 726.003,660 733.397,660L1026.6,660C1034,660 1040,684.388 1040,714.427Z"
                  style={{ fill: locationFillColor }}
                />
              </g>
              <g id="ナンバリング文字A" transform="matrix(1,0,0,1,7.08,-0.8)">
                <g transform="matrix(80,0,0,80,1052,1380)" />
                <text
                  x="860px"
                  y="1380px"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 500,
                    fontSize: "80px",
                    fill: "white",
                  }}
                >
                  {props.project.location[1]
                    ? props.project.location[1].number
                    : props.project.location[0].number}
                </text>
              </g>
            </g>
            <g
              id="場所名A"
              transform="matrix(0.678669,0,0,0.678669,132.643,85.0863)"
            >
              <g transform="matrix(125.644,0,0,125.644,1099.72,320)" />
              <text
                x="520px"
                y="320px"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 600,
                  fontSize: "125.644px",
                }}
              >
                {props.project.location[1]
                  ? props.project.location[1].name
                  : props.project.location[0].name}
              </text>
            </g>
          </g>
          {/* 場所B */}
          {props.project.location[1] && (
            <g
              id="場所B"
              transform="matrix(0.517241,0,0,0.517241,-13.4483,-100.517)"
            >
              <g id="ナンバリングB" transform="matrix(1,0,0,1,-640,-1080)">
                <g
                  id="ナンバリング枠B"
                  transform="matrix(0.78125,0,0,0.192308,277.5,1173.08)"
                >
                  <path
                    d="M1040,714.427L1040,1125.57C1040,1155.61 1034,1180 1026.6,1180L733.397,1180C726.003,1180 720,1155.61 720,1125.57L720,714.427C720,684.388 726.003,660 733.397,660L1026.6,660C1034,660 1040,684.388 1040,714.427Z"
                    style={{ fill: locationFillColor }}
                  />
                </g>
                <g id="ナンバリング文字B" transform="matrix(1,0,0,1,7.08,-0.8)">
                  <g transform="matrix(80,0,0,80,1052,1380)" />
                  <text
                    x="860px"
                    y="1380px"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      fontSize: "80px",
                      fill: "white",
                    }}
                  >
                    {props.project.location[0].number}
                  </text>
                </g>
              </g>

              <g
                id="場所名B"
                transform="matrix(0.678669,0,0,0.678669,132.643,85.0863)"
              >
                <g transform="matrix(125.644,0,0,125.644,1099.72,320)" />
                <text
                  x="520px"
                  y="320px"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontWeight: 600,
                    fontSize: "125.644px",
                  }}
                >
                  {props.project.location[0].name}
                </text>
              </g>
            </g>
          )}
          {/* 企画画像 */}
          <g id="企画画像" transform="translate(90,150) scale(1)">
            <clipPath id="clip">
              <rect
                x="0"
                y="0"
                rx="15"
                width="306.7"
                height="230"
                style={{ fill: "rgb(235,235,235)", aspectRatio: "3/4" }}
              />
            </clipPath>
            {props.project.thumbnail && (
              <image
                xlinkHref={props.project.thumbnail as string}
                style={{ aspectRatio: "3/4" }}
                clipPath="url(#clip)"
                height="100%"
              />
            )}
          </g>
          {/* タグ */}
          <g id="タグ" transform="translate(440,150) scale(0.5)">
            {props.project.tags.map((tag, index) => (
              <g
                key={index}
                transform={`translate(${props.project.tags
                  .slice(0, index)
                  .reduce((acc, tag) => acc + tag.length * 37 + 100, 0)}, 0)`} // タグ間隔を調整
              >
                <rect
                  width={tag.length * 37 + 80}
                  height="70"
                  style={{ fill: "rgb(190,220,255)" }}
                  rx="15"
                  x="0"
                  y="385"
                />
                <text
                  x="50"
                  y="435"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontWeight: 600,
                    fontSize: "37px",
                    fill: "rgb(0,84,176)",
                  }}
                >
                  {tag}
                </text>
                <g transform="translate(4,445)">
                  <g transform="scale(0.05)">
                    <path
                      d="M240,-160L280,-320L120,-320L140,-400L300,-400L340,-560L180,-560L200,-640L360,-640L400,-800L480,-800L440,-640L600,-640L640,-800L720,-800L680,-640L840,-640L820,-560L660,-560L620,-400L780,-400L760,-320L600,-320L560,-160L480,-160L520,-320L360,-320L320,-160L240,-160ZM380,-400L540,-400L580,-560L420,-560L380,-400Z"
                      style={{
                        fill: "rgb(0,83,176)",
                        fillRule: "nonzero",
                      }}
                    />
                  </g>
                </g>
              </g>
            ))}
          </g>
          {/* 団体名 */}
          <g
            id="団体名"
            transform="matrix(0.295236,0,0,0.295236,283.894,227.12)"
          >
            <g transform="matrix(125.644,0,0,125.644,2018.68,320)" />
            <text
              x="520px"
              y="320px"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 600,
                fontSize: "125.644px",
              }}
            >
              {props.project.organizationName || "不明な団体"}
            </text>
          </g>
          <g
            id="企画名"
            transform="matrix(0.517241,0,0,0.517241,5.72547,-33.7931)"
          >
            <g
              id="企画名2"
              transform="matrix(0.912323,0,0,0.912323,355.385,287.324)"
            >
              <g transform="matrix(125.644,0,0,125.644,2017.8,320)" />
              <text
                x="520px"
                y="320px"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 700,
                  fontSize: "125.644px",
                }}
              >
                {projectTitle[1] || ""}
              </text>
            </g>
            s
            <g
              id="企画名1"
              transform="matrix(0.923694,0,0,0.923694,353.376,153.668)"
            >
              <g transform="matrix(125.644,0,0,125.644,2150.36,320)" />
              <text
                x="520px"
                y="320px"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 700,
                  fontSize: "125.644px",
                }}
              >
                {projectTitle[0] || "名称未設定の企画"}
              </text>
            </g>
          </g>
          <g
            id="見出し"
            transform="matrix(1.08108,0,0,1.08108,-215.937,-241.946)"
          >
            <g
              id="見出し2"
              transform="matrix(0.459592,0,0,0.459592,835.499,248.921)"
            >
              <g transform="matrix(100.262,0,0,100.262,2898.42,450)" />
              <text
                x="1400px"
                y="450px"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 700,
                  fontSize: "100.262px",
                }}
              >
                {description.heading[1] || ""}
              </text>
            </g>
            <g
              id="見出し3"
              transform="matrix(0.459592,0,0,0.459592,839.187,192.339)"
            >
              <g transform="matrix(100.262,0,0,100.262,2893.51,450)" />
              <text
                x="1400px"
                y="450px"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 700,
                  fontSize: "100.262px",
                }}
              >
                {description.heading[0] || "紹介文見出し"}
              </text>
            </g>
          </g>
          <g
            id="紹介文"
            transform="matrix(0.599689,0,0,0.599689,478.387,-11.33)"
          >
            <g
              id="紹介文2"
              transform="matrix(0.436697,0,0,0.436697,901.609,391.478)"
            >
              <g transform="matrix(100.262,0,0,100.262,4703.25,450)" />
              <text
                x="1400px"
                y="450px"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 500,
                  fontSize: "100.262px",
                }}
              >
                {description.text[1] || ""}
              </text>
            </g>
            <g
              id="紹介文3"
              transform="matrix(0.436697,0,0,0.436697,901.836,452.159)"
            >
              <g transform="matrix(100.262,0,0,100.262,4703.25,450)" />
              <text
                x="1400px"
                y="450px"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 500,
                  fontSize: "100.262px",
                }}
              >
                {description.text[2] || ""}
              </text>
            </g>
            <g
              id="紹介文1"
              transform="matrix(0.436697,0,0,0.436697,901.723,330.798)"
            >
              <g transform="matrix(100.262,0,0,100.262,4703.25,450)" />
              <text
                x="1400px"
                y="450px"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 500,
                  fontSize: "100.262px",
                }}
              >
                {description.text[0] || "紹介文がありません"}
              </text>
            </g>
          </g>
          {/* メインカーブ */}
          <g id="メインカーブ" transform="matrix(1,0,0,1,-110,-220)">
            <path
              d="M680,320L2328.97,319.897C2368.17,319.897 2400,351.726 2400,390.931L2400,600"
              style={{
                fill: "none",
                stroke: locationFillColor,
                strokeWidth: "6.75px",
              }}
            />
          </g>

          {/* 場所2カーブ */}
          {props.project.location[1] && (
            <g id="場所2カーブ" transform="matrix(1,0,0,1,-90,-410)">
              <path
                d="M880,509.986C836.217,455.649 827.043,450.181 773,449.138C736.703,448.437 660,449.138 660,449.138"
                style={{
                  fill: "none",
                  stroke: locationFillColor,
                  strokeWidth: "6.75px",
                }}
              />
            </g>
          )}
        </g>
      </g>
    </svg>
  );
}
