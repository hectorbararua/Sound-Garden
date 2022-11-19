const id = location.search.split('?id=')[1]
const nome = document.getElementById('nome')
const banner = document.getElementById('banner')
const atracoes = document.getElementById('atracoes')
const descricao = document.getElementById('descricao')
const data = document.getElementById('data')
const lotacao = document.getElementById('lotacao')

fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`)
  .then(function (response) {
    return response.json()
  })
  .then(function (evento) {
    nome.value = evento.name
    banner.value = evento.poster
    atracoes.value = evento.attractions?.join(',')
    descricao.value = evento.description
    data.value = evento.scheduled
    lotacao.value = evento.number_tickets
  })

const formularioevento = document.getElementById('formularioevento')

formularioevento.addEventListener('submit', function (e) {
  e.preventDefault()
  const data = new FormData(e.target)

  fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.get('nome'),
      poster: data.get('banner'),
      attractions: data.get('atracoes').split(','),
      description: data.get('descricao'),
      scheduled: new Date(data.get('data')).toISOString(),
      number_tickets: data.get('lotacao')
    })
  }).then(function (response) {
    console.log(response)
    if (response.status == 200) {
      alert('O seu evento foi atualizado com sucesso!')
      location.href = 'https://hectorbararua.github.io/Sound-Garden/admin.html'
    }
  })
})
