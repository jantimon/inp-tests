This is a simple project to test the impact of different actions on the Input to Next paint metric.

- non interactive elements have a good INP
- button without side effects has a good INP
- button with artificial main thread delay has a bad INP
- button with artificial main thread delay inside onIdle has a good INP
- button with artificial main thread delay inside requestAnimationFrame has a bad INP
- button with artificial main thread delay inside setTimeout has a bad INP
- fetching data has a good INP
- :active does not improve a bad INP