Number.prototype.maxNumber = function () {
  const split = this.toString().split('');
  let max = +split[0];
  for (let i = 0; i < split.length; i++) {
    if (+split[i] > max) {
      max = split[i];
    }
  }
  console.log(`Max : ${max}`);
  return max;
};

Number.prototype.minNumber = function () {
  const split = this.toString().split('');
  let min = +split[0];
  for (let i = 0; i < split.length; i++) {
    if (+split[i] < min) {
      min = split[i];
    }
  }
  console.log(`min : ${min}`);
  return min;
};

const myNumber = 1023;

myNumber.maxNumber();
myNumber.minNumber();
