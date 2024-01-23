function selectsDisciplinasEprofessores() {
    let codCurso = localStorage.getItem('codCurso')

    //DADOS DAS DISCIPLINAS DE UM CURSO ESPECÍFICO
    fetch(`http://localhost:8080/AGIS/disciplina/curso/${codCurso}`, { method: 'GET' })
        .then(response => {
            return response.json()
        })
        .then(data => {
            let select = document.querySelectorAll('[name="Disciplina"]')

            select.forEach(s => {
                let temFilho = s.querySelector('option')
                if (temFilho == null) {
                    data.forEach(disciplina => {
                        s.innerHTML += `<option value="${disciplina.cod}">${disciplina.nome}</option>`
                    })
                }
            })
        })
        .catch(error => {
            console.error(error)
        })

    //DADOS DOS PROFESSORES
    fetch(`http://localhost:8080/AGIS/professor`, { method: 'GET' })
        .then(response => {
            return response.json()
        })
        .then(data => {
            let select = document.querySelectorAll('[name="Professor"]')

            select.forEach(s => {
                let temFilho = s.querySelector('option')
                if (temFilho == null) {
                    data.forEach(professor => {
                        s.innerHTML += `<option value="${professor.cod}">${professor.usuario.nome}</option>`
                    })
                }
            })
        })
        .catch(error => {
            console.error(error)
        })
}

function selectCursos() {
    const url = 'http://localhost:8080/AGIS/curso'

    const configuracaoRequisicao = {
        method: 'GET',
    }

    fetch(url, configuracaoRequisicao)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let select = document.querySelector('#selectCurso')
            data.forEach(curso => {
                select.innerHTML += `
                    <option value="${curso.cod}">${curso.nome} - ${curso.turno}</option>
                `
            }) 
        })
        .catch(error => {
            console.error('Erro:', error)
        })
}

function deleteById(url, cod) {
    const configuracaoRequisicao = {
        method: 'DELETE'
    };

    fetch(`${url}/${cod}`, configuracaoRequisicao)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            removeTable()
            removeSelects()
            selectAll()
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function removeSelects() {
    let select = document.querySelector("#selectCurso")
    select.childNodes.forEach((op, i) => {
        if (i != 1) {
            op.remove()
        }
    })
}

function removeTable() {
    let trs = document.querySelectorAll("tbody tr")
    trs.forEach(tr => { tr.remove() })
}

function limpaCampos() {
    let campos = document.querySelectorAll('input[name]')
    campos.forEach(t => { t.value = '' })

    let selects = document.querySelectorAll('select')
    selects.forEach(s => { s.value = 'default' })
}