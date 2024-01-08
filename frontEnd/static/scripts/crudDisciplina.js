function selectCursos() {
    const url = 'http://localhost:8080/AGIS/curso'

    const configuracaoRequisicao = {
        method: 'GET',
    }

    fetch(url, configuracaoRequisicao)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            let select = document.querySelector('#selectCurso')
            for (let a = 0; a < data.length; a++) {
                let option = document.createElement('option')
                let text = '';
                for (let key in data[a]) {
                    if (key == 'cod') {
                        option.setAttribute('value', data[a][key])
                    }
                    if (key == 'nome') {
                        text = data[a][key] + ' - '
                    }
                    if (key == 'turno') {
                        text += data[a][key]
                    }
                    option.textContent = text
                }
                select.insertAdjacentElement('beforeend', option)
            }
        })
        .catch(error => {
            console.error('Erro:', error)
        });
}

function selectAll() {
    const url = 'http://localhost:8080/AGIS/disciplina';

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    selectCursos()

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            let tbody = document.querySelector("tbody")

            for (let a = 0; a < data.length; a++) {
                let tr = document.createElement('tr')

                for (let key in data[a]) {
                    let td = document.createElement('td')
                    let div = document.createElement('div')

                    if (key != 'curso') {
                        div.textContent = data[a][key]
                    } else {
                        div.textContent = data[a].curso.sigla + " - " + data[a].curso.turno
                    }

                    td.insertAdjacentElement('beforeend', div)
                    tr.insertAdjacentElement('beforeend', td)
                }

                for (let i = 0; i < 2; i++) {
                    let td = document.createElement('td')
                    let div = document.createElement('div')
                    let button = document.createElement('button')

                    button.setAttribute('class', 'btForm btTable')
                    button.setAttribute('style', 'width: 100%')

                    for (let key in data[a]) {
                        if (key == 'cod') {
                            let icone = document.createElement('i')
                            if (i == 0) {
                                button.setAttribute('onclick', `selectById(${data[a][key]})`)
                                icone.setAttribute('class', 'fa-solid fa-pen-to-square')
                                button.insertAdjacentElement('beforeend', icone)
                            } else {
                                button.setAttribute('onclick', `deleteById('http://localhost:8080/AGIS/disciplina', ${data[a][key]})`)
                                icone.setAttribute('class', 'fa-solid fa-trash')
                                button.insertAdjacentElement('beforeend', icone)
                            }
                        }
                    }

                    div.insertAdjacentElement('beforeend', button)
                    td.insertAdjacentElement('beforeend', div)
                    tr.insertAdjacentElement('beforeend', td)
                }

                tbody.insertAdjacentElement('beforeend', tr)
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
}

function selectById(cod) {
    const url = `http://localhost:8080/AGIS/disciplina/${cod}`

    const configuracaoRequisicao = {
        method: 'GET',
    };

    fetch(url, configuracaoRequisicao)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
            }
            return response.json()
        })
        .then(data => {
            document.querySelector('input[name="cod"]').value = data.cod
            document.querySelector('input[name="nome"]').value = data.nome
            document.querySelector('input[name="semestre"]').value = data.semestre
            let selectQtdAulas = document.querySelector('#selectQtdAulas')
            selectQtdAulas.value = data.qtdAulas

            let selectCurso = document.querySelector('#selectCurso')
            selectCurso.value = data.curso.cod

        })
        .catch(error => {
            console.error('Erro:', error)
        });
}

function insert() {
    fetch('http://localhost:8080/AGIS/disciplina', {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            nome: document.querySelector('input[name="nome"]').value,
            qtdAulas: document.querySelector('[name="qtdAula"]').value,
            semestre: document.querySelector('input[name="semestre"]').value,
            codCurso: document.querySelector('[name="curso"]').value
        }),
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
            }
            return response.json()
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
    let cod = document.querySelector('input[name="cod"]').value
    console.log(cod)
    fetch(`http://localhost:8080/AGIS/disciplina/${cod}`, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify({
            nome: document.querySelector('input[name="nome"]').value,
            qtdAulas: document.querySelector('[name="qtdAula"]').value,
            semestre: document.querySelector('input[name="semestre"]').value,
            codCurso: document.querySelector('[name="curso"]').value
        }),
        headers: {
            'Content-type': 'application/json'
        },
    })
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