export const shapeSide = (shape, num, radius) => {
    for (let i = 1; i <= num + 1; i++) {
        let xPos = radius * Math.cos(2 * Math.PI * i / num);
        let yPos = radius * Math.sin(2 * Math.PI * i / num);
        shape.lineTo(xPos, yPos);
    }
};

export const randNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
};