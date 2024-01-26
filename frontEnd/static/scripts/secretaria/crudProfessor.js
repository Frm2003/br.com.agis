function selectAll() {
    const url = 'http://localhost:8080/AGIS/professor'

    const configuracaoRequisicao = {
        method: 'GET',
    };

    fetch(url, configuracaoRequisicao)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let tbody = document.querySelector("tbody")

            data.forEach(professor => {
                tbody.innerHTML += `
                    <tr>
                        <td><div>${professor.cod}</div></td>
                        <td><div>${professor.titulacao}</div></td>
                        <td><div>${professor.usuario.cpf}</div></td>
                        <td><div>${professor.usuario.nome}</div></td>
                        <td><div>${professor.usuario.dataNasc}</div></td>
                        <td><div>${professor.usuario.emailPessoal}</div></td>
                        <td><div>${professor.usuario.emailCorp}</div></td>
                        <td><div>${professor.usuario.situacao}</div></td>
                        <td>
                            <div>
                                <button onclick="selectById(${professor.cod})" style="width: 100%" class="btForm btTable">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <button onclick="deleteById(http://localhost:8080/AGIS/professor, ${professor.cod})" style="width: 100%" class="btForm btTable">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `
            })
        })
        .catch(error => {
            console.error(error)
        })
}

function insert() {
    fetch('http://localhost:8080/AGIS/professor', {
        method: "POST",
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
            return response.json()
        })
        .then(data => {
            console.log('Resposta:', data)
            limpaCampos()
            removeTable()
            selectAll()
        })
        .catch(error => {
            console.error(error)
        });
}