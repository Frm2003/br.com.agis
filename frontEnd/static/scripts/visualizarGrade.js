// VISUALIZARGRADE.HTML
function selectAll() {
    selectCursos()

    const url = 'http://localhost:8080/AGIS/gradeCurricular'

    const configuracaoRequisicao = {
        method: 'GET',
    }

    fetch(url, configuracaoRequisicao)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
        return response.json()
    })
    .then(data => {
        data.forEach(grade => {
            let section = document.createElement('section')
            section.setAttribute('class', 'card')

            let h3 = document.createElement('h3')
            h3.textContent = grade.curso.sigla + ' - ' + grade.curso.turno
            section.insertAdjacentElement('afterbegin', h3)

            let article = document.createElement('article')
            
            let p = document.createElement('p')
            p.textContent = 'Semestre: ' + grade.semestre
            article.insertAdjacentElement('afterbegin', p)
            p = document.createElement('p')
            p.textContent = 'Ano: ' + grade.ano
            article.insertAdjacentElement('afterbegin', p)

            let div = document.createElement('div')
            div.setAttribute('class', 'alingBt')
            let button = document.createElement('button')
            button.setAttribute('class', 'btForm')
            button.setAttribute('onclick', `selectById(${grade.cod})`)
            button.textContent = 'Editar'
            div.insertAdjacentElement('afterbegin', button)

            section.insertAdjacentElement('beforeend', article)
            section.insertAdjacentElement('beforeend', div)
            document.getElementsByClassName('grid')[0].insertAdjacentElement('beforeend', section)
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

function selectCursos() {
    const url = 'http://localhost:8080/AGIS/curso'

    const configuracaoRequisicao = {
        method: 'GET',
    }

    fetch(url, configuracaoRequisicao)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json()
        })
        .then(data => {
            let select = document.querySelector('#selectCurso')
            for (let a = 0; a < data.length; a++) {
                let option = document.createElement('option')
                let text = '';
                for (let key in data[a]) {
                    if (key == 'cod') {
                        option.setAttribute('value', data[a][key])
                    }
                    if (key == 'nome') {
                        text = data[a][key] + ' - '
                    }
                    if (key == 'turno') {
                        text += data[a][key]
                    }
                    option.textContent = text
                }
                select.insertAdjacentElement('beforeend', option)
            }
        })
        .catch(error => {
            console.error('Erro:', error)
        });
}

function criar() {
    let codCurso = document.querySelector('#selectCurso').value
    if (codCurso != 'default') {
        localStorage.setItem('codCurso', codCurso)
        window.location.href = "crudGrade.html"
    }
}
 