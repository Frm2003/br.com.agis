function loadNav() {
    fetch("../../templates/secretaria/navSecretaria.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.querySelector("nav").innerHTML = data;
        })
}

function loadNavProf() {
    fetch("../../templates/professor/navProfessor.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.querySelector("nav").innerHTML = data;
        })
}