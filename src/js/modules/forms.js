const forms = () => {
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input'),
    phoneInputs = document.querySelectorAll('input[name="user_phone"]');

  //allowing only numbers for the phone number inputs using regex

  phoneInputs.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/, '');
    });
  });

  //object of messages to display while the POST request is happening

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  //saving out fetched data after the POST request into the postData variable with async/await

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
      method: "POST",
      body: data
    });
    return await res.text();
  };

  /* ------------------------ clearing the inputs value ----------------------- */

  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
  };

  /* ------------- POST request is made when the form is submitted and ------------ */
  /* -------------- the fetched data is displayed in the console -------------- */

  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();
      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);

      const formData = new FormData(item);

      postData('assets/server.php', formData)
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
};

export default forms;