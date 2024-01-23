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

            data.forEach(curso => {
                tbody.innerHTML += `
                    <tr>
                        <td><div>${curso.cod}</div></td>
                        <td><div>${curso.nome}</div></td>
                        <td><div>${curso.cargaHorario}</div></td>
                        <td><div>${curso.sigla}</div></td>
                        <td><div>${curso.enade}</div></td>
                        <td><div>${curso.turno}</div></td>
                        <td>
                            <div>
                                <button onclick="selectById(${curso.cod})" style="width: 100%" class="btForm btTable">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <button onclick="deleteById(http://localhost:8080/AGIS/curso, ${curso.cod})" style="width: 100%" class="btForm btTable">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `
            })
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