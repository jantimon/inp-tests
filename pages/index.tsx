import { useInpOverlay } from "@/inpOverlay";

const freezeMainThread = (duration: number) => {
  console.log("Freeze")
  const start = Date.now();
  while (Date.now() - start < duration) {}
  console.log("Unfreeze")
};
// @ts-ignore
globalThis.freezeMainThread = freezeMainThread;

export default function Home() {
  useInpOverlay();
  return (
    <main>
      <h1>INP Tests</h1>
      <button id="button" onClick={() => {
        console.log("Hello")
      }}>
        Click me
      </button>
      <style jsx>{`
        #buttonActive:active {
          background-color: red;
        }
      `}</style>
      <button id="buttonActive">
        Freeze main thread with :active
      </button>
    </main>
  );
}
