function insert() {
    const url = 'http://localhost:8080/AGIS/aluno'
    
    const configuracaoRequisicao = {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            cpf: document.querySelector('[name="cpf"]').value,
            nome: document.querySelector('[name="nome"]').value,
            nomeSocial: document.querySelector('[name="nomeSocial"]').value,
            dataNasc: document.querySelector('[name="dataNasc"]').value,
            dataConc2grau: document.querySelector('[name="dataConc2grau"]').value,
            instConc2grau: document.querySelector('[name="instConc2grau"]').value,
            emailPessoal: document.querySelector('[name="emailPessoal"]').value,
            ptVestibular: document.querySelector('[name="ptVestibular"]').value,
            posVestibular: document.querySelector('[name="posVestibular"]').value,
            codCurso: document.querySelector('[name="curso"]').value
        }),
        headers: {
            'Content-type': 'application/json',
        }
    }

    fetch(url, configuracaoRequisicao)
        .then(response => {
            return response.json()
        })
        .then(data => {
            limpaCampos()
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
}