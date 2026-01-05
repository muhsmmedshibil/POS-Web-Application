import './NavBar.css'

export function NavBar({ head, text, button, buttonAction,iconAction }) {
    return (
        <div className="NavBar">
            <div className="header-title">
                <i class="bi bi-arrow-left" onClick={(iconAction)}></i>
                <div>
                    <h1>{head}</h1>
                    <p>{text}</p>
                </div>
            </div>
            <button onClick={buttonAction} className="btn-primary">{button}</button>
        </div>
    )
}