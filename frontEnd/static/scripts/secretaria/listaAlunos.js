function selectAll() {
    const url = 'http://localhost:8080/AGIS/aluno'

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
            }
            return response.json()
        })
        .then(data => {
            let tbody = document.querySelector('tbody')

            data.forEach(aluno => {
                tbody.innerHTML += `
                    <tr>
                        <td><div>${aluno.ra}</div></td>
                        <td><div>${aluno.posVestibular}</div></td>
                        <td><div>${aluno.ptVestibular}</div></td>
                        <td><div>${aluno.dataMatricula}</div></td>
                        <td><div>${aluno.dataLimiteMatricula}</div></td>
                        <td><div>${aluno.usuario.nome}</div></td>
                        <td><div>${aluno.usuario.emailCorp}</div></td>
                        <td>
                            <div>
                                <button onclick="selectByRa(${aluno.ra})" style="width: 100%" class="btForm btTable">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                        </td>
                        <td>
                    </tr>
                `
            }) 
        })
        .catch(error => {
            console.error('Erro:', error)
        });
}

function selectByRa(ra) {
    window.location.href = 'visualizarAluno.html'
    localStorage.setItem('ra', ra)
}