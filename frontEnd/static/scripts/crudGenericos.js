function deleteById(url, cod) {
    const configuracaoRequisicao = {
        method: 'DELETE'
    };

    fetch(`${url}/${cod}`, configuracaoRequisicao)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            removeTable()
            selectAll()
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function removeTable() {
    let trs = document.querySelectorAll("tbody tr")
    trs.forEach(tr => { tr.remove() })
}

function limpaCampos() {
    let campos = document.querySelectorAll('input[name]')
    campos.forEach(t => { t.value = '' })

    let selects = document.querySelectorAll('select')
    selects.forEach(s => { s.value = 'default' })
}