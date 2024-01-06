function selectAll() {
    const url = 'http://localhost:8080/AGIS/professor'

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

                    if (key != 'usuario') {
                        div.textContent = data[i][key]
                    } else {
                        for (let keyu in data[i].usuario) {
                            td = document.createElement('td')
                            div = document.createElement('div')
                            div.textContent = data[i].usuario[keyu]
                            td.insertAdjacentElement('beforeend', div)
                            tr.insertAdjacentElement('beforeend', td)
                        }
                    }

                    td.insertAdjacentElement('beforeend', div)
                    tr.insertAdjacentElement('beforeend', td)
                }

                let td = document.createElement('td')
                let div = document.createElement('div')
                let button = document.createElement('button')

                button.setAttribute('class', 'btForm btTable')
                button.setAttribute('style', 'width: 100%')

                for (let key in data[i]) {
                    if (key == 'cod') {
                        let icone = document.createElement('i')
                        button.setAttribute('onclick', `deleteById('http://localhost:8080/AGIS/curso',${data[i][key]})`)
                        icone.setAttribute('class', 'fa-solid fa-trash')
                        button.insertAdjacentElement('beforeend', icone)
                    }
                }

                div.insertAdjacentElement('beforeend', button)
                td.insertAdjacentElement('beforeend', div)
                tr.insertAdjacentElement('beforeend', td)

                tbody.insertAdjacentElement('beforeend', tr)
            }
        })
        .catch(error => {
            console.error('Erro:', error)
        });
}

function insert() {
    fetch('http://localhost:8080/AGIS/professor', {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            cpf: document.querySelector('input[name="cpf"]').value,
            nome: document.querySelector('input[name="nome"]').value,
            dataNasc: document.querySelector('input[name="dataNasc"]').value,
            emailPessoal: document.querySelector('input[name="emailPessoal"]').value,
            titulacao: document.querySelector('input[name="titulacao"]').value
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