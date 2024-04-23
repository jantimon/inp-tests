import { useInpOverlay } from "@/inpOverlay";

export default function Home() {
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
