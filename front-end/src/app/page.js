import style from '../styles/generic.module.css';
import longinStyle from '../styles/login.module.css';

export default function Home() {

  return (
    <div class={longinStyle.site}>
      <div class={style.aling}>
        <a href="/secretaria/login">Secretaria</a>
        <a href="/professor/login">Professor</a>
      </div>
    </div>
  )
}
