const ChangeTheme = (change) => {
  console.log("changing theme...", change);
  const root = document.querySelector(":root");
  const darkWhite = "rgb(207, 207, 207)";
  const darkPrimary = "rgb(14, 17, 23)";
  const darkSecondary = "rgb(31, 35, 44)";
  const darkThird = "rgb(45, 51, 66)";
  const darkHighlight = "rgb(174, 171, 96)";

  const lightWhite = "rgb(55, 55, 55)";
  const lightSecondary = "rgb(192, 192, 192)";
  const lightThird = "rgb(183, 183, 183)";
  const lightHighlight = "rgb(57, 91, 100)";

  root.style.setProperty("--primary", darkPrimary);
  root.style.setProperty("--white", darkWhite);
  root.style.setProperty("--secondary", darkSecondary);
  root.style.setProperty("--third", darkThird);
  root.style.setProperty("--highlight", darkHighlight);
  if (!change) {
    root.style.setProperty("--primary", darkWhite);
    root.style.setProperty("--white", lightWhite);
    root.style.setProperty("--secondary", lightSecondary);
    root.style.setProperty("--third", lightThird);
    root.style.setProperty("--highlight", lightHighlight);
  }
};

export default ChangeTheme;
