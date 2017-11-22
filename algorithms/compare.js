var print = console.log;
var num = [1, 2, 3, 7, 8, 9];
var newElements = [4, 5, 6];
// nums.splice(3,0,newElements)
num.splice(3, 4);


var num2 = [1, 2, 3, 4, 100, 200, 5];
// num2.reverse()
num2.sort(compare);
print(num2);

function compare(num1, num2) {
    return num1 - num2;
}

function square(num) {
    print(num, num * num);
}
num2.forEach(square);