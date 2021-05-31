Number.prototype.maxNumber = function () {
  const split = this.toString().split('');
  let max = +split[0]; /* initial value */
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
  let min = +split[0]; /* initial value */
  for (let i = 0; i < split.length; i++) {
    if (+split[i] < min) {
      min = split[i];
    }
  }
  console.log(`Min : ${min}`);
  return min;
};

const myNumber = 1023;

myNumber.maxNumber(); /* Max : 3 */
myNumber.minNumber(); /* Min : 0 */
