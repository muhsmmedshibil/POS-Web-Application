import './NavBar.css'

export function NavBar({head,text,button}){
    return(
         <div className="NavBar">
                    <div className="header-title">
                        <h1>{head}</h1>
                        <p>{text}</p>
                    </div>
                    <button className="btn-primary">{button}</button>
                </div>
    )
}