$('.date-form').submit(function (e) {
  e.preventDefault();

  const inputVal = $(this.inputDate).val();
  const now = +new Date(); /* get current Date time */
  const timeCalculation = +inputVal * 3600 * 24 * 1000; /* 1 Day default */
  const total = now + timeCalculation;
  const result = new Date(total).toLocaleString('en-us', {
    weekday: 'long',
  });

  $('.input-user').text(inputVal);
  $('.date-result').text(result);
  $('.full-time').text(
    new Date(total).toLocaleString('en-us', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  );
});
