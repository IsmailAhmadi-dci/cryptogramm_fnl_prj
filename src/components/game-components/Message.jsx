import { alphabet } from "./logic"
export default function Message({quote, author, playerKey, isVisible}) {
    

    playerKey = playerKey === undefined ? '..........................' : playerKey
    quote = quote === undefined ? '' : quote.toLowerCase()
    author = author === undefined ? '' : author.toLowerCase()
    isVisible = isVisible === undefined ? false : isVisible



    return (
        <div style={{display: isVisible ? 'block' : 'none'}}>
            <p>
                {quote.split('').map(item => {

                    const letterIndex = alphabet.indexOf(item)

                    if (letterIndex !== -1 && playerKey[letterIndex] !== '.') {
                        return <span className={playerKey[letterIndex] ? 'marked' : ''}>{playerKey[letterIndex] ? playerKey[letterIndex].toUpperCase() : item}</span>
                    } else {
                        return <span>{item}</span>
                    }
                })}
            </p>

            <br/><br/>

            <p>
                {author.split('').map(item => {

                    const letterIndex = alphabet.indexOf(item)

                    if (letterIndex !== -1 && playerKey[letterIndex] !== '.') {
                        return <span className={playerKey[letterIndex] ? 'marked' : ''}>{playerKey[letterIndex] ? playerKey[letterIndex].toUpperCase() : item}</span>
                    } else {
                        return <span>{item}</span>
                    }
                })}
            </p>
        </div>
    )
}