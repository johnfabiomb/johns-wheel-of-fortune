validateForm = (params, container) => {
  errors = []
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!params?.email.match(mailformat)) {
    errors.push("Email is not valid");
  }
  if (!params?.name) {
    errors.push("Name is required");
  }

  if (!params?.surname) {
    errors.push("Surname is required");
  }
  if (errors.length) {
    container.innerHTML = errors.join("\r\n");
    container.classList.add('message--red');
  }
  return !errors.length
}

getPathFromUrl = (url) => url.split("?")[0];

getQueryParams = () => window.location.search.substring(1) ? window.location.search.substring(1)
  .split('&')
  .reduce((accumulator, singleQueryParam) => {
    const [key, value] = singleQueryParam.split('=');
    accumulator[key] = decodeURIComponent(value);
    return accumulator;
  }, {}) : undefined;

getResponse = () => fetch(`./assets/response.json`, {
  method: "GET",
  mode: "cors",
  headers: {
    'Content-Type': 'application/json'
  }
}).then((response) => response.json())
  .catch((error) => console.error('Whoops! Erro:', error.message || error));