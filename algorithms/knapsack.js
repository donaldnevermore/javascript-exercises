function maxValue(weights, values, index, weightAvailable) {
    if (index === 0) {
        if (weights[index] <= weightAvailable) {
            return values[index];
        } else {
            return 0;
        }
    }

    const withoutIndex = maxValue(weights, values, index - 1, weightAvailable);

    if (weights[index] > weightAvailable) {
        return withoutIndex;
    } else {
        const withIndex =
            values[index] +
            maxValue(
                weights,
                values,
                index - 1,
                weightAvailable - weights[index]
            );
        return Math.max(withIndex, withoutIndex);
    }
}

function fastMaxValue(weights, values, index, weightAvailable, memory) {
    const key = `(${index},${weightAvailable})`;
    if (memory[key] != null) {
        return memory[key];
    }

    if (index === 0) {
        if (weights[index] <= weightAvailable) {
            memory[key] = values[index];
            return values[index];
        } else {
            memory[key] = 0;
            return 0;
        }
    }

    const withoutIndex = fastMaxValue(
        weights,
        values,
        index - 1,
        weightAvailable,
        memory
    );

    if (weights[index] > weightAvailable) {
        memory[key] = withoutIndex;
        return withoutIndex;
    } else {
        const withIndex =
            values[index] +
            fastMaxValue(
                weights,
                values,
                index - 1,
                weightAvailable - weights[index],
                memory
            );
        const result = Math.max(withIndex, withoutIndex);
        memory[key] = result;
        return result;
    }
}

const weightAvailable = 5;
let memo = {};

// prettier-ignore
const weights = [5, 3, 2, 5, 7, 8, 6, 7, 10, 1, 3, 4, 5, 6, 7, 8, 8, 1, 1, 5, 7, 6, 2, 1, 8, 4, 2, 8];
// prettier-ignore
const values = [9, 7, 8, 3, 4, 5, 6, 10, 9, 8, 7, 8, 6, 5, 4, 3, 5, 7, 8, 2, 0, 3, 2, 0, 7, 5, 6, 9];

const result = fastMaxValue(
    weights,
    values,
    weights.length - 1,
    weightAvailable,
    memo
);
console.log(result);

let weights2 = [5, 3, 2];
let values2 = [9, 7, 8];
const result2 = maxValue(
    weights2,
    values2,
    weights2.length - 1,
    weightAvailable
);
console.log(result2);
