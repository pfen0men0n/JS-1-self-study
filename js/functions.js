const checkStringLength = function (string, maxLength) {
    if (string.length <= maxLength) {
        return true;
    }
        return false;
}
console.log(checkStringLength('Привет как дела собака ты сутулая?', 50));

const isPalindrome = function (string) {
string = string.toLowerCase().replace(/[^a-z]+/g,"");
return string === string.split("").reverse().join("");

}
console.log(isPalindrome('топот'));
