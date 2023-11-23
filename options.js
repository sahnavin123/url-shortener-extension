let saveBtn = document.querySelector("#save");
let api = document.querySelector("#myapi");
let toastError = document.querySelector(".toast-error");
let toastSuccess = document.querySelector(".toast-success");

const apiKey = "bW7wpegbjeGgFArtPdj8ERAn2Oj3iD2jNWy5gqwx2UHCJiAb9zHWIkz0d0fq";

saveBtn.addEventListener("click", () => {
    const api_value = api.value ? api.value : apiKey;
  if (api_value) {
    toastSuccess.classList.remove("d-hide");
    chrome.storage.local.set({ API: api_value }, function () {
      console.log("Value is set to " + api_value);
    });
  } else {
    toastError.classList.remove("d-hide");
    setTimeout(() => {
      toastError.classList.add("d-hide");
    }, 1500);
  }
});
