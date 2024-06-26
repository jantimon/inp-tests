/// <reference types="cypress-real-events" />
import "cypress-real-events";

const freezeMainThread = (duration: number) => {
  console.log("Freeze");
  const start = Date.now();
  while (Date.now() - start < duration) {}
  console.log("Unfreeze");
};

describe("INP Tests", () => {
  it("non interactive elements have a good INP", () => {
    cy.visit("http://localhost:3000");
    cy.wait(200);

    cy.wait(200);
    cy.get("h1:first").realClick({ scrollBehavior: false });
    expectInp("good");
  });

  it("button without side effects has a good INP", () => {
    cy.visit("http://localhost:3000");
    cy.wait(200);
    cy.get("#button").realClick();
    expectInp("good");
  });

  it("button with artificial main thread delay has a bad INP", () => {
    cy.visit("http://localhost:3000");
    cy.wait(200);

    cy.get("#button")
      .addEvent("click", () => {
        freezeMainThread(200);
      })
      .realClick();
    expectInp({ min: 200 });
  });

  it("button with artificial main thread delay inside requestIdleCallback has a good INP", () => {
    cy.visit("http://localhost:3000");
    cy.wait(200);

    cy.get("#button")
      .addEvent("click", () => {
        requestIdleCallback(() => freezeMainThread(200));
      })
      .realClick();

    expectInp("good");
  });

  it("button with artificial main thread delay inside requestAnimationFrame has a bad INP", () => {
    cy.visit("http://localhost:3000");
    cy.wait(200);

    cy.get("#button")
      .addEvent("click", () => {
        requestAnimationFrame(() => freezeMainThread(200));
      })
      .realClick();

    expectInp("needs-improvement");
  });

  it("button with artificial main thread delay inside two requestAnimationFrames has a bad INP", () => {
    cy.visit("http://localhost:3000");
    cy.wait(200);

    cy.get("#button")
      .addEvent("click", () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            freezeMainThread(200);
          });
        });
      })
      .realClick();

    expectInp("good");
  });

  it("button with artificial main thread delay inside setTimeout has a bad INP", () => {
    cy.visit("http://localhost:3000");
    cy.wait(200);

    cy.get("#button")
      .addEvent("click", () => {
        setTimeout(() => freezeMainThread(200));
      })
      .realClick();

    expectInp("needs-improvement");
  });

  it("fetching data has a good INP", () => {
    cy.visit("http://localhost:3000");
    cy.wait(200);

    cy.get("#button")
      .addEvent("click", () => {
        fetch("/api/hello");
      })
      .realClick();
    expectInp("good");
  });

  it(":active does not improve a bad INP", () => {
    cy.visit("http://localhost:3000");
    cy.wait(200);

    cy.get("#buttonActive")
      .addEvent("click", () => {
        freezeMainThread(200);
      })
      .realClick();
    expectInp({ min: 200 });
  });
});

describe("INP Test React State" , () => {
  it("useState with slow useEffects has a bad INP", () => {
    cy.visit("http://localhost:3000/state");
    cy.wait(200);

    cy.get("button#state").realClick();
    expectInp("good");
  })
  it("useTransition with slow useEffects has a good INP", () => {
    cy.visit("http://localhost:3000/state");
    cy.wait(200);

    cy.get("button#state").realClick();
    expectInp("good");
  })
});

function expectInp(
  option: number | { min?: number; max?: number } | "good" | "needs-improvement"
) {
  let min = -1;
  let max = -1;

  if (typeof option === "number") {
    max = option;
  }
  if (typeof option === "object") {
    min = option.min || -1;
    max = option.max || -1;
  }
  if (option === "good") {
    min = 0;
    max = 199;
  }
  if (option === "needs-improvement") {
    min = 200;
  }

  cy.get(".current.inp.value")
    .invoke("text")
    .should((value) => {
      const inp = parseFloat(value);
      if (min !== -1) {
        expect(inp).to.be.gte(min);
      }
      if (max !== -1) {
        expect(inp).to.be.lte(max);
      }
    });
  cy.get(".current.inp.value").invoke("removeClass", "current");
}
