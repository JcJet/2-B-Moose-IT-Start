export function ucFirst(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

const punctuations= ".,;?!"
function isPunctuation(chr) {
    return punctuations.includes(chr)
}

function removePunctuation(str) {
    for (let punctuation of punctuations)
        str = str.replace(punctuation,"")
    return str;
}

export function fixSpaces(str) {
    let newStr = ""
    for (let i = 0; i < str.length; i++) {
        if (isPunctuation(str[i])) {
            if (str[i-1] === ' ') newStr = newStr.slice(0, -1) + str[i];
            else if (str[i+1] !== ' ') newStr += str[i] + ' ';
            else newStr += str[i]
        }
        else if (str[i] === ' ' && str[i-1] === ' ') continue
        else newStr += str[i]
    };
    return newStr;
};

export function getWordCount(str) {
    str = removePunctuation(str);
    return str.match(/\S+/g).length;
};

export function getWordList(str, sep = " ", case_sensitive = false) {
    if (!case_sensitive) str = str.toLowerCase();
    str = removePunctuation(str);
    let words = str.match(/\S+/g);
    let word_counts = []
    for (const word of words) {
        if (typeof word_counts[word] === 'undefined') word_counts[word] = 1;
        else word_counts[word]++
    };
    return word_counts;
};