function selectByRa() {
    let ra = localStorage.getItem('ra')

    fetch(`http://localhost:8080/AGIS/aluno/${ra}`, { method: 'GET' })
        .then(response => { return response.json() })
        .then(data => {
            document.querySelector('#nomeCurso').innerHTML = `
                <h2>Curso: ${data.curso.nome} - ${data.curso.turno}</h2>
            `
            document.querySelector('#infoFacul').innerHTML = `
                <h3 id="h3">Dados da Instituição</h3>
                <p>Ra: ${data.ra}</p>
                <p>Email Corp.: ${data.usuario.emailCorp}</p>
                <p>Data Matricula: ${data.dataMatricula}</p>
                <p>Data Limite: ${data.dataLimiteMatricula}</p>
                <p>Situação: ${data.usuario.situacao}</p>
            `

            document.querySelector('[name="cpf"]').value = data.usuario.cpf
            document.querySelector('[name="nome"]').value = data.usuario.nome
            document.querySelector('[name="nomeSocial"]').value = data.nomeSocial
            document.querySelector('[name="dataNasc"]').value = data.usuario.dataNasc
            document.querySelector('[name="dataConc2grau"]').value = data.dataConc2grau
            document.querySelector('[name="instConc2grau"]').value = data.instConc2grau
            document.querySelector('[name="emailPessoal"]').value = data.usuario.emailPessoal
            document.querySelector('[name="ptVestibular"]').value = data.ptVestibular
            document.querySelector('[name="posVestibular"]').value = data. posVestibular
        })
        .catch(error => { console.log(error) })

    fetch(`http://localhost:8080/AGIS/matricula/${ra}`, { method: 'GET' })
        .then(response => { return response.json() })
        .then(data => { 
            let overflow = document.querySelector('.s2 section .overflow')
            let html = ""

            data.forEach(matricula => {
                html += `
                    <div class="cartao">
                        <div class="cardTitle">
                            <h3>${matricula.turma.disciplina.nome}</h3>
                            <p>${matricula.turma.professor.usuario.nome}</p>
                        </div>
                        <div class="cardContent">
                            <div>
                                <p>Nota Final: ${matricula.notaFinal}</p>
                                <p>Situação: ${matricula.situacao}</p>
                            </div>
                        </div>
                        
                `
                if (matricula.situacao == 'dispensado') {
                    html += `
                        <div class="cardFooter" style="text-align: right; margin: .5em 0">
                            <button class="btEdit" disabled>Dispensado</button>
                        </div>
                    </div>
                    `
                } else {
                    html += `
                        <div class="cardFooter" style="text-align: right; margin: .5em 0">
                            <button class="btEdit" onclick="dispensar(${matricula.aluno.ra}, ${matricula.turma.cod}, ${matricula.ano}, ${matricula.semestre})">Dispensar</button>
                        </div>
                    </div>
                    `
                }

            })
            overflow.innerHTML = html
         })
        .catch(error => { console.log(error) })
}

function dispensar(ra, cod, ano, semestre) {
    console.log(ra, cod, ano, semestre)
}