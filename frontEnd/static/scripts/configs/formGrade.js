function deletaCampos() {
    let qtdTr = document.querySelectorAll('.lines')
    qtdTr[qtdTr.length - 1].remove()
}

function criaCampos() {
    let qtdTr = document.querySelectorAll('.lines')

    let tr = document.createElement('tr')
    tr.setAttribute('class', 'lines')

    const names = ['codProfessor', 'codDisciplina', 'diaDaSemana', 'horaFim', 'horaIni', '']
    const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const horarios = ['13:00', '14:50', '16:30', '18:20']

    names.forEach((t, i) => {
        let td = document.createElement('td')
        if (i != 5) {
            let select = document.body.appendChild(document.createElement('select'))
            td.insertAdjacentElement("beforeend", select)

            if (i >= 3 && i <= 4) {
                horarios.forEach(h => { criaOptions(select, h) })
            }

            if (i == 2) {
                diasDaSemana.forEach(d => { criaOptions(select, d) })
            }

            td.children[0].setAttribute('name', t)
            td.children[0].setAttribute('class', 'form-control')
        } else {
            let span = document.createElement('span')
            span.innerText = qtdTr.length + 1
            td.insertAdjacentElement("beforeend", span)
        }

        tr.insertAdjacentElement('afterbegin', td)
    })

    document.querySelector('#tbody').insertAdjacentElement('beforeend', tr)
}

function criaOptions(element, text) {
    let op = document.body.appendChild(document.createElement('option'))
    op.text = text
    op.value = text
    element.appendChild(op)
} 