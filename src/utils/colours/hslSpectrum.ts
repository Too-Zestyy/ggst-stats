export const genHslSpectrum = (numHues: number, lightnessGroupSize: number = 1, maxSaturation: number = 100, minSaturation: number = 70, maxLightness: number = 60, hueCutout: number = 10, offset: number = 0): string[] => {

    let spectrum: string[] = [];

    const spectrumIncrement = (360 - hueCutout)/(numHues * lightnessGroupSize);
    const lightnessIncrement = maxLightness / lightnessGroupSize;

    const saturationIncrement = (maxSaturation - minSaturation) / (lightnessGroupSize - 1);

    for (let i = 0; i < numHues; i++) {

        for (let j = 0; j < lightnessGroupSize; j++) {
            spectrum.push(
                `hsl(${spectrumIncrement*(i + j) + offset + (hueCutout/2)}, ${(maxSaturation) - (saturationIncrement * j)}%, ${maxLightness + (lightnessIncrement * j)}%)`
            );
        }
    }

    return spectrum;
}