const requestOptions = {
  method: 'GET',
  redirect: 'follow'
}

let eventos = []

async function getEventos() {
  const response = await fetch(
    'https://xp41-soundgarden-api.herokuapp.com/events',
    requestOptions
  )

  const section = document.querySelector('#events')
  eventos = await response.json()

  let cardEventos = ''

  eventos.slice(0, 3).forEach((evento, index) => {
    cardEventos += ` <article class="evento card p-5 m-3">

    <h2>${evento.name} - ${new Date(evento.scheduled).toLocaleString()}</h2>
    <h4>${evento.attractions}</h4>
    <p>
    ${evento.description}
    </p>
    <button onclick = 'showTicket(${index})'  class="btn btn-primary">reservar ingresso</button>
  </article>
`
  })

  section.innerHTML += cardEventos
}

getEventos()

let button = document.querySelector('.btn-primary')
let modal = document.querySelector('dialog')
let buttonClose = document.querySelector('#close')

function showTicket(eventIndex) {
  let modalTilte = document.querySelector('#modalTilte')
  let modalDescription = document.querySelector('#modalDescription')

  console.log(eventos[eventIndex].description)

  modalTilte.innerHTML = `Reservar - ${eventos[eventIndex].name}`
  modalDescription.innerHTML = eventos[eventIndex].description

  modal.showModal()
}

buttonClose.onclick = function () {
  modal.close()
}
