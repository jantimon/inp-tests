import { useEffect } from "react";
import { onINP } from "web-vitals";

let logStarted = false;
const logInpEvents = () => {
  if (logStarted) {
    return;
  }
  logStarted = true;
  const inpResults = document.createElement("div");
  inpResults.id = "inp-results";
  inpResults.style.position = "fixed";
  inpResults.style.bottom = "0";
  inpResults.style.right = "0";
  inpResults.style.pointerEvents = "none";
  inpResults.style.backgroundColor = "white";
  inpResults.style.padding = "10px";
  inpResults.style.border = "1px solid black";
  inpResults.style.color = "black";
  inpResults.style.zIndex = "9999";
  inpResults.innerHTML = "<h2>INP Results</h2>";
  document.body.appendChild(inpResults);
  onINP(
    (inp) => {
      console.log("INP", inp);
      document.querySelectorAll(".current").forEach((el) => {
        el.classList.remove("current");
      });
      inpResults.innerHTML += `<div>INP: <span class="inp value current">${inp.value}</span>ms</div>`;
    },
    { reportAllChanges: true }
  );
};

export function useInpOverlay() {
  useEffect(() => {
    logInpEvents();
  }, []);
    return null;
}