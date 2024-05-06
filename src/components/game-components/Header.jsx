import { alphabet } from "./logic"
export default function Header({userData, handleModal , openMenu, setOpenMenu}) {

    

    const click3 = new Audio('../audio/sounds/click3.wav')
    const handleMenu = () => {
        click3.play()
        setOpenMenu(!openMenu)
    }

    const cheat = () => {
        try {
            let gk = userData.currentGame.gameKey
            let pk = userData.currentGame.playerKey
const tp = `
${gk.split('').join('|')}
${alphabet.split('').join('|')}
${pk.split('').join('|')}
        `
        console.log(tp)
        } catch (error) {
            console.log('You have not an active game')
        }

    }

    return (
        <nav>
            <div className="name-container" title="This is your Name on your desk">{userData.playerName}</div>
            <button className="menu" onClick={handleMenu} title="Open Menu to see its containing options!">
                MENU &Xi;
            </button>
            <div className="menu-content" style={{display: openMenu ? 'flex' : 'none'}}>
                <button onClick={() => {handleModal('help') ; cheat()}}>Help ...</button>
                <button onClick={() => handleModal('aboutme')}>About Me ...</button>
                <button onClick={() => handleModal('statistics')}>Statistics ...</button>
                <button onClick={() => handleModal('changename')}>Change Name ...</button>
            </div>
        </nav>
    )
}