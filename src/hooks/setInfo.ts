export function setInfo(
  svgDocument: SVGSVGElement | null,
  title: string,
  description: string,
  organization: string,
  location: string
) {
  if (typeof svgDocument?.querySelectorAll !== "function") return false;
  // タイトル：1行12文字、最大2行 1行目はtitle1、2行目はtitle2
  const title1 = svgDocument.getElementById("title1");
  const title2 = svgDocument.getElementById("title2");
  if (title1 && title2) {
    title1.textContent = title.slice(0, 12);
    title2.textContent = title.slice(12);
  }
  // 説明文：1行20文字、最大5行 1行目はdescription1、2行目はdescription2 ...
  const description1 = svgDocument.getElementById("description1");
  const description2 = svgDocument.getElementById("description2");
  const description3 = svgDocument.getElementById("description3");
  const description4 = svgDocument.getElementById("description4");
  const description5 = svgDocument.getElementById("description5");
  if (
    description1 &&
    description2 &&
    description3 &&
    description4 &&
    description5
  ) {
    description1.textContent = description.slice(0, 20);
    description2.textContent = description.slice(20, 40);
    description3.textContent = description.slice(40, 60);
    description4.textContent = description.slice(60, 80);
    description5.textContent = description.slice(80);
  }
  // 団体名：1行14文字 最大1行 organization
  const organizationElement = svgDocument.getElementById("organization");
  if (organizationElement) {
    organizationElement.textContent = organization.slice(0, 14);
  }
  // 場所: 3文字 1文字目はlocation1、2文字目はlocation2、3文字目はlocation3
  // 1文字目の数字に応じて背景(locationBG)の色を変える
  const location1 = svgDocument.getElementById("location1");
  const location2 = svgDocument.getElementById("location2");
  const location3 = svgDocument.getElementById("location3");
  const locationBG = svgDocument.getElementById("locationBG");
  if (location1 && location2 && location3 && locationBG) {
    switch (Number(location.slice(0, 1))) {
      case 1:
        locationBG.setAttribute("fill", "#7445aa");
        break;
      case 2:
        locationBG.setAttribute("fill", "#4499ba");
        break;
      case 3:
        locationBG.setAttribute("fill", "#00a37e");
        break;
      case 4:
        locationBG.setAttribute("fill", "#ffbb00");
        break;
      case 5:
        locationBG.setAttribute("fill", "#ef4644");
        break;
      case 6:
        locationBG.setAttribute("fill", "#7445aa");
        break;
      default:
        locationBG.setAttribute("fill", "#252525");
        break;
    }
    location1.textContent = location.slice(0, 1);
    location2.textContent = location.slice(1, 2);
    location3.textContent = location.slice(2);
  }
  return true;
}
