import { Avatar } from './Avatar'
import styles from './Sidebar.module.css'
import { PencilLine } from '@phosphor-icons/react'
export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
        <img className={styles.cover} 
            src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className={styles.profile}>
            <Avatar src='https://github.com/gabrielamenezes.png' hasBorder />
            <strong>Gabriela Menezes</strong>
            <span>Web developer</span>
        </div>

        <footer>
            <a href='#'>
              <PencilLine />
              Editar seu perfil
            </a>
        </footer>
    </aside>
  )
}
