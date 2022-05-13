function Button (props){
    return <button className={props.class}>{props.buttonName} <img className='az' src={props.imgSrc} alt = {props.alt}></img></button>
}

export default Button;