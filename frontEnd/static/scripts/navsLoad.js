function loadNav() {
    fetch("../../templates/secretaria/navSecretaria.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.querySelector("nav").innerHTML = data;
        });
}