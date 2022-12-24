export const generateProgressNum = (floor: number, ceiling: number) => {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor
}

export const progressMovement = async (setProgress: Function) => {
setProgress(Math.floor(generateProgressNum(15, 32)));
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            setProgress(generateProgressNum(32, 49));
        }, 1000);
        setTimeout(() => {
            setProgress(generateProgressNum(49, 62));
        }, 2300);
        setTimeout(() => {
            resolve(setProgress(generateProgressNum(62, 91)));
        }, 3400);
    });
}