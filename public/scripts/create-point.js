const ufSelect = document.querySelector("select[name=uf]")
const selectedStateInput = document.querySelector("input[name=state]")
const citySelect = document.querySelector("select[name=city]")

function populateUFs() {
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUFs()

function getCities(event) {
  citySelect.disabled = true
  citySelect.innerHTML =
    '<option value="" disabled selected>Selecione a cidade</option>'

  const idUf = event.target.value
  const indexOfSelectedState = event.target.selectedIndex

  selectedStateInput.value = event.target.options[indexOfSelectedState].text

  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idUf}/municipios`
  )
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false
    })
}

ufSelect.addEventListener("change", getCities)

// Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")
const collectedItemsInput = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectItem(event) {
  const itemLi = event.target
  const itemId = itemLi.dataset.id
  const alreadySelected = selectedItems.includes(itemId)

  if (alreadySelected) {
    itemLi.classList.remove("selected")
    const filteredItems = selectedItems.filter((item) => item !== itemId)
    selectedItems = filteredItems
  } else {
    itemLi.classList.add("selected")
    selectedItems.push(itemId)
  }

  collectedItemsInput.value = selectedItems.join(", ")
}

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectItem)
}
