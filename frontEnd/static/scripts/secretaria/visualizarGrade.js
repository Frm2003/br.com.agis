// VISUALIZARGRADE.HTML
function selectAll() {
    selectCursos()

    fetch('http://localhost:8080/AGIS/gradeCurricular', { method: 'GET' })
        .then(response => {
            return response.json()
        })
        .then(data => {
            let grid = document.querySelector('.overflow')

            data.forEach(grade => {
                grid.innerHTML += `
                <div class="cartao">
                    <div class="cardTitle">
                        <h3>${grade.curso.sigla} - ${grade.curso.turno}</h3>
                    </div>
                    <div class="cardContent">
                        <div style="padding: 0.5em">
                            <p>Semestre: ${grade.semestre}</p>
                            <p>Ano: ${grade.ano}</p>
                        </div>
                    </div>
                    <div class="cardFooter" style="border-top: 1px solid gray; padding: 0.5em">
                        <button class="btForm" onclick="selectById(${grade.cod})">Editar</button>
                    </div>
                </div>`
            })
        })
        .catch(error => {
            console.error('Erro:', error)
        });

}

function selectById(cod) {
    localStorage.setItem('codGrade', cod)
    window.location.href = "editarGrade.html"
}

function criar() {
    let codCurso = document.querySelector('#selectCurso').value
    if (codCurso != 'default') {
        localStorage.setItem('codCurso', codCurso)
        window.location.href = "crudGrade.html"
    }
}
