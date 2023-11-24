let saveBtn = document.querySelector("#save");
let api = document.querySelector("#myapi");
let toastError = document.querySelector(".error");
let toastSuccess = document.querySelector(".success");

const apiKey = "bW7wpegbjeGgFArtPdj8ERAn2Oj3iD2jNWy5gqwx2UHCJiAb9zHWIkz0d0fq";

saveBtn.addEventListener("click", () => {
    const api_value = api.value ? api.value : apiKey;
  if (api_value) {
    toastSuccess.classList.remove("hide");
    chrome.storage.local.set({ API: api_value }, function () {
      console.log("Value is set to " + api_value);
    });
  } else {
    toastError.classList.remove("hide");
    setTimeout(() => {
      toastError.classList.add("hide");
    }, 1500);
  }
});
