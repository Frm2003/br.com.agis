import formStyle from '../styles/form.module.css';
import longinStyle from '../styles/login.module.css';
import style from '../styles/generic.module.css';

export default function loginLayout(props) {
    return (
        <div className={longinStyle.site}>
            <div>
                <div className={style.aling}>
                    <div className={style.title}>
                        <img className={style.img}></img>
                        <h2>Login {props.nome}</h2>
                    </div>
                    <div>
                        <div className={formStyle.campos}>
                            <div className={formStyle.campo}>
                                <label>CPF</label>
                                <input type="text" name="CPF" />
                            </div>
                            <div className={formStyle.campo}>
                                <label>Senha</label>
                                <input type="password" name="senha" />
                            </div>
                        </div>
                        <button className={style.btForm} type="submit">Logar</button>
                    </div>
                </div>
                <a href="#">Esqueceu a senha?</a>
            </div>
        </div>
    );
}