// Задача 1.

function calcTaskWeights(studentArray: number[][]): number[] {
    let weights: number[] = []
    for (let i = 0; i < studentArray[0].length; i++) {
        weights[i] = 1;
        for (let j = 0; j < studentArray.length; j++) {
            if (studentArray[j][i] === 0) {
                weights[i]++;
            }
        }
    }
    return weights
}

export function countScores(studentArray: number[][]): number[] {
    let resultArray: number[] = [];
    let weights: number[] = calcTaskWeights(studentArray);
    for (let i = 0; i < studentArray.length; i++) {
        resultArray[i] = 0;
        for (let j = 0; j < studentArray[0].length; j++) {
            resultArray[i] += studentArray[i][j] * weights[j];
        }
    }
    return resultArray;

}