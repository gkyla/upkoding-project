// const form = document.querySelector('form');

// function ascendingOrderNumber(number) {
//    /*  manually check without helper function from built-in js function such as array prototype sort  */

//    const numberToArray = [...number];

//    for (var i = 1; i < numberToArray.length; i += 1) {
//       if (numberToArray[i - 1] > numberToArray[i]) {
//          var tmp = numberToArray[i - 1];
//          numberToArray[i - 1] = numberToArray[i];
//          numberToArray[i] = tmp;
//       }
//    }

//    return numberToArray;
// }

// form.addEventListener('submit', (e) => {
//    e.preventDefault();
//    const resultOrder = ascendingOrderNumber(form.number.value);
//    console.log(resultOrder);
// });
