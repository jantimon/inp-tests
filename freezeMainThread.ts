
export const freezeMainThread = (duration: number) => {
    console.log("Freeze")
    const start = Date.now();
    while (Date.now() - start < duration) { }
    console.log("Unfreeze")
};