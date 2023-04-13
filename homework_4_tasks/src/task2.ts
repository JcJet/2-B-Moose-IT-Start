// Задача 2

function isDigit(char: string): boolean {
    return isNaN(Number(char))
}

function splitToGroups(str: string): string[] {
    let isPair: boolean = false;
    let groups: string[] = [''];
    let curIndex: number = 0;
    for (let char of str) {
        if (isDigit(char)) {
            if (isPair) {
                curIndex++;
                groups[curIndex] = '';
                isPair = !isPair;
            }
            groups[curIndex] += char;
        }
        else {
            if (!isPair) {
                curIndex++;
                groups[curIndex] = '';
                isPair = !isPair;
            }
            groups[curIndex] += char;
        }
    }
    if (groups[0] === '') { //если в начале строки число без букв
        groups[0] = '1'
    }
    return groups

}

function groupToNumber(str: string): number {
    let digits: number = Number(str);
    if (!isNaN(digits)) {
        return digits
    }

    let numberStr: string = ''
    for (let char of str) {
        let charCode = char.charCodeAt(0);
        if (charCode < 97 || charCode > 122) {
            continue;
        }
        charCode -= 96 // порядок в алфавите, начиная с 1
        numberStr += String(charCode);
    }
    return groupToNumber(numberStr);
}

export function stringToNumber(str: string): number {
    let groups: string[] = splitToGroups(str);
    let sum: number = 0;
    let even: boolean = true;
    for (let i = 0; i < groups.length; i += 2) {
        const firstValue: number = groupToNumber(groups[i]);
        const secondValue: number = (i < groups.length - 1) ? groupToNumber(groups[i+1]) : 1;
        let combination = firstValue * secondValue;
        even = !even;
        if (even) {
            combination *= -1;
        }
        sum += combination;
    }
    return sum;


}