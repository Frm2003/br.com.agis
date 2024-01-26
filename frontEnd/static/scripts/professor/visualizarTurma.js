document.querySelector('.site').addEventListener('load', selectTurmasFromProf())

function selectTurmasFromProf() {
    let codProf = localStorage.getItem('codProf')

    fetch(`http://localhost:8080/AGIS/turma/professor/${codProf}`, { method: 'GET' })
        .then(response => {
            return response.json()
        })
        .then(data => {
            let overflow = document.querySelector('.overflow')
            let html = ''
            
            data.forEach(turma => {
                html += `
                    <div class="cartao">
                        <div class="cardTitle">
                            <h3>${turma.disciplina.nome}</h3>
                            <p>${turma.disciplina.qtdAulas}</p>
                        </div>
                        <div class="cardContent">
                            <div style="padding: 0.5em;">
                                <p>Curso: ${turma.disciplina.curso.sigla} - ${turma.disciplina.curso.turno}</p>
                                <p>Dia: ${turma.diaDaSemana}</p>
                                <p>Horario: das ${turma.horarioInicio} até ${turma.horarioFim}</p>
                            </div>
                        </div>`
                if (turma.situacao != 'aberta') {
                    html += `
                        <div class="cardFooter" style="text-align: right; margin: .5em 0">
                            <button class="btForm" disabled>Fechado</button>
                        </div>
                    </div>`
                } else {
                    html += `
                        <div class="cardFooter" style="text-align: right; margin: .5em 0">
                            <button class="btForm" onclick="selectChamadaById(${turma.cod})">Notas</button>
                            <button class="btForm" onclick="selectChamadaById(${turma.cod})">Chamada</button>
                        </div>
                    </div>`
                }
            })

            overflow.innerHTML = html
        })
        .catch(error => {
            console.log(error)
        })
}

function selectChamadaById(cod) {
    localStorage.setItem('codTurma', cod)
    window.location.href = "chamadaTurma.html"
}