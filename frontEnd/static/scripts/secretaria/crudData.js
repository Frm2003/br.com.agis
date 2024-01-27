function selectAll() {
    const url = 'http://localhost:8080/AGIS/datas'

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
                                button.setAttribute('onclick', `deleteById('http://localhost:8080/AGIS/datas', ${data[i][key]})`)
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
    const url = `http://localhost:8080/AGIS/datas/${cod}`

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
            document.querySelector('input[name="data"]').value = data.data
            document.querySelector('input[name="descricao"]').value = data.descricao
            document.querySelector('input[name="ehFeriado"]').checked = data.ehFeriado
        })
        .catch(error => {
            console.error('Erro:', error)
        });
}

function insert() {
    fetch('http://localhost:8080/AGIS/datas', {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            data : document.querySelector('input[name="data"]').value,
            descricao : document.querySelector('[name="descricao"]').value,
            ehFeriado : document.querySelector('input[name="ehFeriado"]').checked
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
        })
}

function update() {
    let cod = document.querySelector('input[name="cod"]').value
    console.log(cod)
    fetch(`http://localhost:8080/AGIS/datas/${cod}`, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify({
            data : document.querySelector('input[name="data"]').value,
            descricao : document.querySelector('input[name="descricao"]').value,
            ehFeriado : document.querySelector('input[name="ehFeriado"]').checked
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
        })
}
