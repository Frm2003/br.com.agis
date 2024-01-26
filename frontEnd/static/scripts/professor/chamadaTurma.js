document.querySelector('.site').addEventListener('load', loadChamada())

function loadChamada() {
    let codTurma = localStorage.getItem('codTurma')

    fetch(`http://localhost:8080/AGIS/turma/${codTurma}`)
        .then(response => {
            return response.json()
        })
        .then(turma => {
            calculaDias(turma.diaDaSemana)
        })
        .catch(error => {
            console.log(error)
        })

    fetch(`http://localhost:8080/AGIS/matricula/turma/${codTurma}`)
        .then(response => {
            return response.json()
        })
        .then(data => {

        })
        .catch(error => {
            console.log(error)
        })
}

function calculaDias(diaDaSemana) {
    let dia = new Date(calculaChamada(localStorage.getItem('dataInicioAula'), diaDaSemana))
    let overflow = document.querySelector('.overflow')

    let html = ``
    for (let aula = 0; aula < 20; aula++) {
        html += `
            <div class="cartao">
                <div class="cardTitle">
                    <h4>Dia: ${dia.getDate()}/${dia.getMonth() + 1}/${dia.getFullYear()}</h4>
                </div>
                <div class="cardContent">
                    <div style="padding: 0.5em;">
                        
                    </div>
                </div>
                <div class="cardFooter" style="text-align: right; margin: .5em 0">
                    <button class="btForm" onclick="realizarChamada('${dia.toDateString()}')">Chamada</button>
                </div>
            </div>`
        dia.setDate(dia.getDate() + 7)
    }
    overflow.innerHTML = html
}

function realizarChamada(data) {
    let dataDaChamada = new Date(data)

    if (dataDaChamada == new Date()) {

    } else {
        console.log('dia diferente')
    }
}

function calculaChamada(data, diaDaSemana) {
    let dataInicio = new Date(data)

    switch (diaDaSemana) {
        case "Segunda":
            dif = 1 - dataInicio.getDay()
            break;
        case "Terça":
            dif = 2 - dataInicio.getDay()
            break
        case "Quarta":
            dif = 3 - dataInicio.getDay()
            break
        case "Quinta":
            dif = 4 - dataInicio.getDay()
            break
        case "Sexta":
            dif = 5 - dataInicio.getDay()
            break
        case "Sabado":
            dif = 6 - dataInicio.getDay()
            break
    }

    if (dif < 0) { dif += 7 }

    return dataInicio.setDate(dataInicio.getDate() + dif)
}