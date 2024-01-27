document.querySelector('button').addEventListener('click', function () {
    cpf = document.querySelector('[name="CPF"]').value
    senha = document.querySelector('[name="senha"]').value

    fetch(`http://localhost:8080/AGIS/professor/login?cpf=${cpf}&senha=${senha}`, { method: 'GET' })
        .then(response => {
            return response.json()
        })
        .then(prof => {

            fetch(`http://localhost:8080/AGIS/datas/1`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    localStorage.setItem('codProf', prof.cod)
                    localStorage.setItem('dataInicioAula', data.data)
                    window.location.href = "visualizarTurmas.html"
                })
                .catch(error => {
                    console.log(error)
                })
                
        })
        .catch(error => {
            alert("teste")
            console.log(error)
        })

}) 