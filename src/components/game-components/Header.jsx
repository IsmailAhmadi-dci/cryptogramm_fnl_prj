import { useState } from "react"

export default function Header({userData}) {

    const [openMenu, setOpenMenu] = useState(false)
    const click3 = new Audio('../audio/sounds/click3.wav')
    const handleMenu = () => {
        click3.play()
        setOpenMenu(!openMenu)
    }

    return (
        <nav>
            <div className="name-container">{userData.playerName}</div>
            <button className="menu" onClick={handleMenu}>
                MENU &Xi;
            </button>
            <div className="menu-content" style={{display: openMenu ? 'flex' : 'none'}}>
                <button>Help</button>
                <button>About Me</button>
                <button>Statistics</button>
                <button>Reset All</button>
                <button>Change Name</button>
            </div>
        </nav>
    )
}