const buttonSearch = document.querySelector("#page-home main button")
const modal = document.querySelector("#modal")
const buttonCloseModal = document.querySelector("#modal .header button")

buttonSearch.addEventListener("click", () => {
  modal.classList.remove("hidden")
})

buttonCloseModal.addEventListener("click", () => {
  modal.classList.add("hidden")
})
