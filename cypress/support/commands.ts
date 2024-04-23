/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import type Chainable from 'cypress';

Cypress.Commands.add('addEvent', {
    prevSubject: true,
  },
  (subject, eventName, fn) => {
    const code = fn.toString();
    subject[0].addEventListener(eventName, fn);
    return subject;
 })

declare global {
  namespace Cypress {
    interface Chainable {
        addEvent(eventName: string, fn: () => void): Chainable<void>
    }
  }
}


