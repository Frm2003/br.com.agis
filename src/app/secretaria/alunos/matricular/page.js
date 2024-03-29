'use client'

import loginStyle from '@/styles/login.module.css'
import url from '@/components/utils'
import { formCrud } from "@/components/layoutsComponents";
import { useEffect, useState, useRef } from 'react';
import { Button } from "react-bootstrap";
import axios from 'axios';

function limpaCampos() {
    let inputs = document.querySelectorAll('input[name]')
    inputs.forEach(input => {
        input.value = ''
    })

    document.querySelector('select').value = 1
}

export default function () {
    const myElementRef = useRef(null);

    const [listaGrades, setListaGrades] = useState([]);

    useEffect(() => {
        async function selectCursos() {
            try {
                const response = await axios.get(url.grades);
                const dados = response.data;

                const listaGrades = dados.map(item => (
                    { text: `${item.curso.nome} - ${item.curso.turno}`, value: `${item.cod}` }
                ));

                setListaGrades(listaGrades);
            } catch (error) {
                console.log(error);
            }
        }

        selectCursos()
    }, [])

    const insert = () => {
        const data = {
            cpf: document.querySelector('[name="CPF"]').value,
            nome: document.querySelector('[name="Nome"]').value,
            nomeSocial: document.querySelector('[name="Nome Social"]').value,
            dataNasc: document.querySelector('[name="Data Nasc."]').value,
            dataConc2grau: document.querySelector('[name="Data de Conclusão do 2°"]').value,
            instConc2grau: document.querySelector('[name="Instituição de Conclusão do 2°"]').value,
            emailPessoal: document.querySelector('[name="Email Pessoal"]').value,
            ptVestibular: document.querySelector('[name="Pontuação no vestibular"]').value,
            posVestibular: document.querySelector('[name="Posição no Vestibular"]').value,
            codCurso: document.querySelector('select').value,
        }

        axios.post(url.alunos, data)
            .then(response => console.log(response.data), limpaCampos())
            .catch(error => console.log(error))
    }

    return (
        <div className={loginStyle.display} ref={myElementRef}>
            <div className={loginStyle.layout}>
                {formCrud(
                    {
                        layout: [
                            { tag: "input", nome: "Nome", tipo: "text" },
                            { tag: "input", nome: "Nome Social", tipo: "text" },
                            { tag: "input", nome: "CPF", tipo: "text" },
                            { tag: "input", nome: "Data Nasc.", tipo: "date" },
                            { tag: "input", nome: "Instituição de Conclusão do 2°", tipo: "text" },
                            { tag: "input", nome: "Data de Conclusão do 2°", tipo: "date" },
                            { tag: "input", nome: "Email Pessoal", tipo: "text" },
                            { tag: "input", nome: "Pontuação no vestibular", tipo: "number" },
                            { tag: "input", nome: "Posição no Vestibular", tipo: "number" },
                            { tag: "select", nome: "Cursos", lista: listaGrades }
                        ]
                    }
                )}

                <Button variant="outline-primary" onClick={insert}>Matricular</Button>

            </div>

        </div>
    )
}