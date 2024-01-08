function selectAll() {
    const url = 'http://localhost:8080/AGIS/curso'

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

            for (let i = 0; i < data.length; i++) {
                let tr = document.createElement('tr')

                for (let key in data[i]) {
                    let td = document.createElement('td')
                    let div = document.createElement('div')

                    div.textContent = data[i][key]

                    td.insertAdjacentElement('beforeend', div)
                    tr.insertAdjacentElement('beforeend', td)
                }

                for (let a = 0; a < 2; a++) {
                    let td = document.createElement('td')
                    let div = document.createElement('div')
                    let button = document.createElement('button')

                    button.setAttribute('class', 'btForm btTable')
                    button.setAttribute('style', 'width: 100%')

                    for (let key in data[i]) {
                        if (key == 'cod') {
                            let icone = document.createElement('i')
                            if (a == 0) {
                                button.setAttribute('onclick', `selectById(${data[i][key]})`)
                                icone.setAttribute('class', 'fa-solid fa-pen-to-square')
                                button.insertAdjacentElement('beforeend', icone)
                            } else {
                                button.setAttribute('onclick', `deleteById('http://localhost:8080/AGIS/curso',${data[i][key]})`)
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
            console.error('Erro:', error)
        });
}

function selectById(cod) {
    const url = `http://localhost:8080/AGIS/curso/${cod}`

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
            document.querySelector('input[name="cargaHoraria"]').value = data.cargaHorario
            document.querySelector('input[name="sigla"]').value = data.sigla
            document.querySelector('input[name="enade"]').value = data.enade
            document.querySelector('#select').value = data.turno
        })
        .catch(error => {
            console.error('Erro:', error)
        });
}

function insert() {
    const url = `http://localhost:8080/AGIS/curso`

    const configuracaoRequisicao = {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            nome: document.querySelector('input[name="nome"]').value,
            cargaHorario: document.querySelector('input[name="cargaHoraria"]').value,
            sigla: document.querySelector('input[name="sigla"]').value,
            enade: document.querySelector('input[name="enade"]').value,
            turno: document.querySelector('[name="turno"]').value
        }),
        headers: {
            'Content-type': 'application/json',
        }
    }
    fetch(url, configuracaoRequisicao)
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
        })
}

function update() {
    let cod = document.querySelector('input[name="cod"]').value
    const url = `http://localhost:8080/AGIS/curso/${cod}`

    const configuracaoRequisicao = {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify({
            nome: document.querySelector('input[name="nome"]').value,
            cargaHorario: document.querySelector('input[name="cargaHoraria"]').value,
            sigla: document.querySelector('input[name="sigla"]').value,
            enade: document.querySelector('input[name="enade"]').value,
            turno: document.querySelector('[name="turno"]').value
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