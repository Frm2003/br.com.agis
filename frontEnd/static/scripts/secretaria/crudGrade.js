document.querySelector('.site').addEventListener('load', selectAll())

function selectAll() {
    let codCurso = localStorage.getItem('codCurso')

    fetch(`http://localhost:8080/AGIS/curso/${codCurso}`, { method: 'GET' })
        .then(response => {
            return response.json()
        })
        .then(data => {
            let dataAtual = new Date()
            let semestre = 0

            if (dataAtual.getMonth() > 6) { semestre = 2 } else { semestre = 1 }

            document.querySelector('.section').innerHTML = `
                <p>${data.nome}</p>
                <p>${semestre}</p>
                <p>${dataAtual.getFullYear()}</p>
            `
        })
        .catch(error => {
            console.error(error)
        })
}

function insert() {
    fetch('http://localhost:8080/AGIS/gradeCurricular', {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            codCurso: document.querySelector('#codCurso').value,
            semestre: document.querySelector('#semestre').textContent,
            ano: document.querySelector('#ano').textContent
        }),
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            localStorage.setItem('codGrade', data.cod)
            insertTurmas()
        })
        .catch(error => {
            console.error('Erro:', error)
        });
}

function insertTurmas() {
    let horaIni = document.querySelectorAll('[name="horaIni"]')
    let horaFim = document.querySelectorAll('[name="horaFim"]')
    let diaDaSemana = document.querySelectorAll('[name="diaDaSemana"]')
    let codDisciplina = document.querySelectorAll('[name="Disciplina"]')
    let codProfessor = document.querySelectorAll('[name="Professor"]')

    const listaDados = []
    for (let i = 0; i < horaIni.length; i++) {
        const objetoDados = {
            horarioInicio: horaIni[i].value,
            horarioFim: horaFim[i].value,
            diaDaSemana: diaDaSemana[i].value,
            codDisciplina: codDisciplina[i].value,
            codProfessor: codProfessor[i].value,
            codGradeCurricular: localStorage.getItem('codGrade')
        };
        listaDados.push(objetoDados)
    }

    listaDados.forEach(dados => {
        fetch('http://localhost:8080/AGIS/turma', {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(dados),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log('Resposta:', data)
                window.location.href = "visualizarGrade.html"
            })
            .catch(error => {
                console.error('Erro:', error)
            })
    })
}

document.getElementById('criaCampos').addEventListener('click', function criarCampos() {
    const names = ['horaIni', 'horaFim', 'diaDaSemana', 'Disciplina', 'Professor']
    const horarios = ['13:00', '14:50', '16:30', '18:20']
    const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

    let html = ''

    names.forEach((text) => {
        html += ` <td><div class="campo">`

        if (text == 'horaIni' || text == 'horaFim') {

            html += `<select name="${text}">`
            horarios.forEach(hora => { html += `<option value="${hora}">${hora}</option>` })

        } else if (text == 'diaDaSemana') {

            html += `<select name="${text}">`
            diasDaSemana.forEach(dia => { html += `<option value="${dia}">${dia}</option>` })

        } else {
            html += `<select name="${text}">`
        }

        html += `</select></div></td>`
    })

    document.querySelector('#tbody').innerHTML += `<tr>${html}</tr>`

    selectsDisciplinasEprofessores()
})

document.getElementById('deletaCampos').addEventListener('click', function () {
    let trs = document.querySelectorAll('tbody tr')

    trs.forEach((tr, i) => {
        if (i == trs.length - 1) { tr.remove() }
    })
})