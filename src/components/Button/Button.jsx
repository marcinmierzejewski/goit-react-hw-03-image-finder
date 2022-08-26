import styles from './Button.module.css'

export const Button = ({ text, func }) => {
  const {Button} = styles

  return(
    <>
      <button className={Button} type="button" onClick={func}>{text}</button>
    </>
    
  )
}