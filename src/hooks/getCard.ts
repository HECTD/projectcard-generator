export default async function getCard(): Promise<SVGSVGElement> {
  let fetched = new DOMParser().parseFromString(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"></svg>`,
    "image/svg+xml"
  ).childNodes[0] as SVGSVGElement;
  await fetch(
    `https://raw.githubusercontent.com/HECTD/projectcard-generator/main/public/card2.svg`
  ).then((res) => {
    const newHeaders = new Headers(res.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    res.text().then((svg) => {
      console.log("svg", svg);
      const unEscapedSvg = svg.replace(/&quot;/g, '"');
      fetched = new DOMParser().parseFromString(unEscapedSvg, "image/svg+xml")
        .childNodes[0] as SVGSVGElement;
    });
  });

  console.log("fetched", fetched);
  return fetched;
}
