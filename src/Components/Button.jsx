function Button (props){
    return <button onClick={props.do} className={props.class}>{props.buttonName} 
    <img className='az' src={props.imgSrc} alt = {props.alt}></img>
    </button>
}

export default Button;