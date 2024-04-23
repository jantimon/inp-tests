This is a simple project to test the impact of different actions on the Input to Next paint metric.

## Fast INPs

- non interactive elements have a good INP 🏃‍♀️
- button without side effects has a good INP 🏃‍♀️
- button with artificial main thread delay inside onIdle has a good INP 🏃‍♀️
- button with artificial main thread delay inside 2 requestAnimationFrame has a good INP 🏃‍♀️
- fetching data has a good INP 🏃‍♀️

## Slow INPs

- button with artificial main thread delay inside requestAnimationFrame has a bad INP 🐌
- button with artificial main thread delay inside setTimeout has a bad INP 🐌
- button with artificial main thread delay has a bad INP 🐌
- :active does not improve a bad INP 🐌

Full [test suite](https://github.com/jantimon/inp-tests/blob/main/cypress/e2e/spec.cy.ts)

[![Cypress Tests](https://github.com/jantimon/inp-tests/actions/workflows/test.yaml/badge.svg)](https://github.com/jantimon/inp-tests/actions/workflows/test.yaml)