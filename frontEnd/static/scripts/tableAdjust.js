function loadTable() {
    const ths = document.querySelectorAll('th')

    ths.forEach((t, i) => {
        let div = t.children[0]
        div.style.width = `${160}px`
    })
}