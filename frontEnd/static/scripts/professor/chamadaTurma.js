document.querySelector('.site').addEventListener('load', loadChamada())


function loadChamada() {
    let codTurma = localStorage.getItem('codTurma')
    fetch(`http://localhost:8080/AGIS/turma/${codTurma}`)
        .then(response => {
            return response.json()
        })
        .then(turma => {
            document.querySelector('.h2').innerHTML = `${turma.disciplina.nome}`
            calculaDias(turma.diaDaSemana)
        })
        .catch(error => {
            console.log(error)
        })
}

function calculaDias(diaDaSemana) {
    let dia = new Date(calculaChamada(localStorage.getItem('dataInicioAula'), diaDaSemana))
    let overflow = document.querySelector('.grid .overflow')

    let html = ``
    for (let aula = 0; aula <= 20; aula++) {
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
                    <button class="btForm" onclick="realizarChamada('${dia}')">Chamada</button>
                </div>
            </div>`
        dia.setDate(dia.getDate() + 7)
    }
    overflow.innerHTML = html
}

function realizarChamada(dataChamada) {
    let dia = new Date(dataChamada)
    let codTurma = localStorage.getItem('codTurma')

    document.getElementById('popup').style.display = "block"

    fetch(`http://localhost:8080/AGIS/matricula/turma/${codTurma}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            let tbody = document.querySelector('tbody')
            let html = '';

            data.forEach(matricula => {
                html += `<tr>
                    <td><div>${matricula.aluno.ra}</div></td>
                    <td><div>${matricula.aluno.usuario.nome}</div></td>
                    <td>
                        <div>
                            <select name="qtdFaltas">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </td>
                    <td><div>${dia.getDate()}/${dia.getMonth() + 1}/${dia.getFullYear()}</div></td>
                </tr>`
            })
            tbody.innerHTML = html
        })
        .catch(error => { console.log(error) })

    if (dia >= new Date()) {

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

function insert() {
    
}

document.querySelector('.popup i').addEventListener('click', function () {
    let popup = document.getElementById('popup')
    popup.style.display = "none"
})