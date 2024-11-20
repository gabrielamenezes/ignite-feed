import styles from './Avatar.module.css'
export const Avatar = ({src, hasBorder = false}) => {
  return (
    <img src={src} alt="" className={hasBorder ? styles.avatarWithBorder : styles.avatar} />
  )
}
