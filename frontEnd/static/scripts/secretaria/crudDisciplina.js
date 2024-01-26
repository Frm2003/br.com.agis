function selectAll() {
    const url = 'http://localhost:8080/AGIS/disciplina';

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    selectCursos()

    fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let tbody = document.querySelector("tbody")

            data.forEach(disciplina => {
                tbody.innerHTML += `
                    <tr>
                        <td><div>${disciplina.cod}</div></td>
                        <td><div>${disciplina.nome}</div></td>
                        <td><div>${disciplina.qtdAulas}</div></td>
                        <td><div>${disciplina.semestre}</div></td>
                        <td><div>${disciplina.curso.sigla} - ${disciplina.curso.turno}</div></td>
                        <td>
                            <div>
                                <button onclick="selectById(${disciplina.cod})" style="width: 100%" class="btForm btTable">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <button onclick="deleteById(http://localhost:8080/AGIS/disciplina, ${disciplina.cod})" style="width: 100%" class="btForm btTable">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `
            })
            //tbody.innerHTML = html
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
            return response.json()
        })
        .then(data => {
            console.log('Resposta:', data)
            limpaCampos()
            removeTable()
            removeSelects()
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
            removeSelects()
            selectAll()
        })
        .catch(error => {
            console.error('Erro:', error)
        });
}