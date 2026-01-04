import './NavBar.css'

export function NavBar({head,text,button,buttonAction}){
    return(
         <div className="NavBar">
                    <div className="header-title">
                        <h1>{head}</h1>
                        <p>{text}</p>
                    </div>
                    <button onClick={buttonAction} className="btn-primary">{button}</button>
                </div>
    )
}