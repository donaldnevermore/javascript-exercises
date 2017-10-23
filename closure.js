function createComparisonFunction(propertyName) {
    return function (object1, object2) {
        var value1 = object1[propertyName]; // 即使内部函数被放回，或者在其他
        var value2 = object2[propertyName]; // 地方被调用，仍然可以访问propertyName
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    }
}

function createFunction() {
    var result = new Array();

    for (var i = 0; i < 10; i++) {
        result[i] = function () {
            return i;
        }
    }

    return result;
}

function createFunction2() {
    var result = new Array();

    for (var i = 0; i < 10; i++) {
        result[i] = function (num) {
            return function () {
                return num;
            }(i);
        }
    }

    return result;
}