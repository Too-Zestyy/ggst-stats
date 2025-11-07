
export const getRandomRGBColour = () => {
    const curColour = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    return curColour;
}