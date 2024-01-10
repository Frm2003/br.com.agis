function selectAll() {
    let codGrade = localStorage.getItem('codGrade')

    const url = `http://localhost:8080/AGIS/turma/grade/${codGrade}`

    const configuracaoRequisicao = {
        method: 'GET',
    };

    fetch(url, configuracaoRequisicao)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            let tbody = document.querySelector("tbody")
            data.forEach(d => {
                let tr = document.createElement('tr')

                for (let key in d) {
                    if (key != 'gradeCurricular' && key != 'cod') {
                        let td = document.createElement('td')
                        let div = document.createElement('div')

                        if (key == 'disciplina') {
                            div.textContent = d.disciplina.nome
                        } else if (key == 'professor') {
                            div.textContent = d.professor.usuario.nome
                        } else {
                            div.textContent = d[key]
                        }

                        td.insertAdjacentElement('beforeend', div)
                        tr.insertAdjacentElement('beforeend', td)
                    }

                }
                for (let a = 0; a < 2; a++) {
                    let td = document.createElement('td')
                    let div = document.createElement('div')
                    let button = document.createElement('button')
                    let icone = document.createElement('i')

                    button.setAttribute('class', 'btForm btTable')
                    button.setAttribute('style', 'width: 100%')

                    if (a == 0) {
                        button.setAttribute('onclick', `selectById(${d.cod})`)
                        icone.setAttribute('class', 'fa-solid fa-pen-to-square')
                        button.insertAdjacentElement('beforeend', icone)
                    } else {
                        button.setAttribute('onclick', `deleteById('http://localhost:8080/AGIS/turma',${d.cod})`)
                        icone.setAttribute('class', 'fa-solid fa-trash')
                        button.insertAdjacentElement('beforeend', icone)
                    }

                    div.insertAdjacentElement('beforeend', button)
                    td.insertAdjacentElement('beforeend', div)
                    tr.insertAdjacentElement('beforeend', td)
                }

                tbody.insertAdjacentElement('beforeend', tr)
            })
        })
        .catch(error => {
            console.error('Erro:', error)
        })
}

function selectById(cod) {
    const url = `http://localhost:8080/AGIS/turma/${cod}`

    const configuracaoRequisicao = {
        method: 'GET',
    };

    fetch(url, configuracaoRequisicao)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            document.querySelector('[name="codTurma"]').value = data.cod
            document.querySelector('[name="Professor"]').value = data.professor.cod
            document.querySelector('[name="Disciplina"]').value = data.disciplina.cod
            document.querySelector('[name="Dia da Semana"]').value = data.diaDaSemana
            document.querySelector('[name="Horario Início"]').value = data.horarioInicio
            document.querySelector('[name="Horaria Fim"]').value = data.horarioFim
        })
        .catch(error => {
            console.error('Erro:', error)
        })
}

function insert() {
    const url = `http://localhost:8080/AGIS/turma`

    const configuracaoRequisicao = {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            codProfessor:  document.querySelector('[name="Professor"]').value,
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
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta:', data)
            limpaCampos()
            removeTable()
            selectAll()
        })
        .catch(error => {
            console.error('Erro:', error)
        });
}

function update() {
    let cod = document.querySelector('input[name="codTurma"]').value
    const url = `http://localhost:8080/AGIS/turma/${cod}`

    const configuracaoRequisicao = {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify({
            codProfessor:  document.querySelector('[name="Professor"]').value,
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
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta:', data)
            limpaCampos()
            removeTable()
            selectAll()
        })
        .catch(error => {
            console.error('Erro:', error)
        });
}

function criaSelects() {
    const names = ['Professor', 'Disciplina', 'Dia da Semana', 'Horario Fim', 'Horario Início']
    const horarios = ['13:00', '14:50', '16:30', '18:20']
    const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

    names.forEach((text) => {
        let div = document.createElement('div')
        let select = document.createElement('select')
        let label = document.createElement('label')

        label.textContent = text

        select.setAttribute('name', text)

        if (text == 'Horario Início' || text == 'Horario Fim') {
            horarios.forEach(h => {
                select.insertAdjacentElement('beforeend', criaOptions(h))
            })
        }

        if (text == 'Dia da Semana') {
            diasDaSemana.forEach(d => {
                select.insertAdjacentElement('beforeend', criaOptions(d))
            })
        }

        div.setAttribute('class', 'campo')

        div.insertAdjacentElement('afterbegin', select)
        div.insertAdjacentElement('afterbegin', label)

        document.querySelector('.campos').insertAdjacentElement('afterbegin', div)
    })

    selectProfessores(), selectDisciplinasCurso()
}

function selectDisciplinasCurso() {
    let cod = localStorage.getItem('codCurso')

    const url = `http://localhost:8080/AGIS/disciplina/curso/${cod}`
    const configuracaoRequisicao = { method: 'GET' };

    fetch(url, configuracaoRequisicao)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
            }
            return response.json()
        })
        .then(data => {
            let select = document.querySelectorAll('[name="Disciplina"]')
            data.forEach(p => {
                let option = document.createElement('option')
                option.setAttribute('value', p.cod)
                option.textContent = p.nome
                select.forEach(s => {
                    s.insertAdjacentElement('afterbegin', option)
                })
            })
        })
        .catch(error => {
            console.error('Erro:', error)
        });
}

function selectProfessores() {
    const url = `http://localhost:8080/AGIS/professor`
    const configuracaoRequisicao = { method: 'GET' };

    fetch(url, configuracaoRequisicao)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
            }
            return response.json()
        })
        .then(data => {
            let select = document.querySelectorAll('[name="Professor"]')
            data.forEach(p => {
                let option = document.createElement('option')
                option.setAttribute('value', p.cod)
                option.textContent = p.usuario.nome
                select.forEach(s => {
                    s.insertAdjacentElement('afterbegin', option)
                })
            })
        })
        .catch(error => {
            console.error('Erro:', error)
        });
}

function criaOptions(text) {
    let op = document.createElement('option')
    op.text = text
    op.value = text
    return op
}