let generateBtn = document.querySelector("#shortURL");
let api = document.querySelector("#myurl");
let toastError = document.querySelector(".error");
let toastSuccess = document.querySelector(".success");
let loader = document.querySelector(".loading");
const url = new URL("https://t.ly/api/v1/link/shorten");
let headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

function isValidURL(inputURL) {
  try {
    new URL(inputURL);
    return true;
  } catch (error) {
    return false;
  }
}

generateBtn.addEventListener("click", () => {
  if (api.value && isValidURL(api.value)) {
    loader.classList.remove("hide");
    chrome.storage.local.get(["API"], async function (result) {
      try {
        let apiToken = result.API
          ? result.API
          : "bW7wpegbjeGgFArtPdj8ERAn2Oj3iD2jNWy5gqwx2UHCJiAb9zHWIkz0d0fq";
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            long_url: api.value,
            domain: "https://t.ly/",
            api_token: apiToken,
          }),
        });

        const json = await response.json();

        loader.classList.add("hide");
        toastSuccess.classList.remove("hide");

        const link = document.createElement("a");
        link.href = json.short_url;
        link.textContent = json.short_url;
        link.style.color = "green";
        const text = document.createElement("p");
        text.innerHTML = "Generated url: ";

        toastSuccess.innerHTML = "";
        toastSuccess.appendChild(text);
        toastSuccess.appendChild(link);
        link.target = "_blank";
      } catch (err) {
        alert(err);
      }
    });
  } else {
    toastError.classList.remove("hide");
    setTimeout(() => {
      toastError.classList.add("hide");
    }, 1500);
  }
});
