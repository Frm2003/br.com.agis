document.querySelector('.site').addEventListener('load', selectAll())

function selectAll() {
    let codGrade = localStorage.getItem('codGrade')

    fetch(`http://localhost:8080/AGIS/turma/grade/${codGrade}`, { method: 'GET' })
        .then(response => {
            return response.json()
        })
        .then(data => {
            let tbody = document.querySelector("tbody")
            data.forEach(turma => {
                tbody.innerHTML += `
                    <tr>
                        <td><div>${turma.horarioInicio}</div></td>
                        <td><div>${turma.horarioFim}</div></td>
                        <td><div>${turma.diaDaSemana}</div></td>
                        <td><div>${turma.disciplina.nome}</div></td>
                        <td><div>${turma.disciplina.qtdAulas}</div></td>
                        <td><div>${turma.professor.usuario.nome}</div></td>
                        <td>
                            <div>
                                <button onclick="selectById(${turma.cod})" style="width: 100%" class="btForm btTable">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <button onclick="deleteById(http://localhost:8080/AGIS/turma, ${turma.cod})" style="width: 100%" class="btForm btTable">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`
            })
        })
        .catch(error => {
            console.error(error)
        })
}

function selectById(cod) {
    localStorage.setItem('codTurma', cod)

    const url = `http://localhost:8080/AGIS/turma/${cod}`

    const configuracaoRequisicao = {
        method: 'GET',
    };

    fetch(url, configuracaoRequisicao)
        .then(response => {
            return response.json()
        })
        .then(data => {
            document.querySelector('[name="Professor"]').value = data.professor.cod
            document.querySelector('[name="Disciplina"]').value = data.disciplina.cod
            document.querySelector('[name="Dia da Semana"]').value = data.diaDaSemana
            document.querySelector('[name="Horario Início"]').value = data.horarioInicio
            document.querySelector('[name="Horario Fim"]').value = data.horarioFim
        })
        .catch(error => {
            console.error(error)
        })
}

function insert() {
    const url = `http://localhost:8080/AGIS/turma`

    const configuracaoRequisicao = {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            codProfessor: document.querySelector('[name="Professor"]').value,
            codDisciplina: document.querySelector('[name="Disciplina"]').value,
            diaDaSemana: document.querySelector('[name="Dia da Semana"]').value,
            horarioInicio: document.querySelector('[name="Horario Início"]').value,
            horarioFim: document.querySelector('[name="Horario Fim"]').value,
            codGradeCurricular: localStorage.getItem('codGrade')
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }

    fetch(url, configuracaoRequisicao)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            limpaCampos()
            removeTable()
            selectAll()
        })
        .catch(error => {
            console.error(error)
        })
}

function update() {
    let cod = localStorage.getItem('codTurma')
    const url = `http://localhost:8080/AGIS/turma/${cod}`

    const configuracaoRequisicao = {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify({
            codProfessor: document.querySelector('[name="Professor"]').value,
            codDisciplina: document.querySelector('[name="Disciplina"]').value,
            diaDaSemana: document.querySelector('[name="Dia da Semana"]').value,
            horarioInicio: document.querySelector('[name="Horario Início"]').value,
            horarioFim: document.querySelector('[name="Horario Fim"]').value,
            codGradeCurricular: localStorage.getItem('codGrade')
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }

    fetch(url, configuracaoRequisicao)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            limpaCampos()
            removeTable()
            selectAll()
        })
        .catch(error => {
            console.error('Erro:', error)
        });
}

document.querySelector('.site').addEventListener('load', criaSelects())

function criaSelects() {
    let campos = document.querySelector('.campos')

    const names = ['Horario Início', 'Horario Fim', 'Dia da Semana', 'Disciplina', 'Professor']
    const horarios = ['13:00', '14:50', '16:30', '18:20']
    const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

    let html = ''

    names.forEach((text) => {
        html += ` <div class="campo"><label>${text}</label>`

        if (text == 'Horario Início' || text == 'Horario Fim') {

            html += `<select name="${text}">`
            horarios.forEach(hora => { html += `<option value="${hora}">${hora}</option>` })

        } else if (text == 'Dia da Semana') {

            html += `<select name="${text}">`
            diasDaSemana.forEach(dia => { html += `<option value="${dia}">${dia}</option>` })

        } else {
            html += `<select name="${text}">`
        }

        html += `</select></div>`
    })

    campos.innerHTML = html

    selectsDisciplinasEprofessores()
}