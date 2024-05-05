import { alphabet } from "./logic"
export default function Won({quote, author, playerKey, isVisible}) {
    return (
        <div className="pause" style={{display: isVisible ? 'block' : 'none'}}>
            <p style={{textAlign: "center"}}>You Won</p>
            <q>
                {quote.split('').map(item => {

                    const letterIndex = alphabet.indexOf(item)

                    if (letterIndex !== -1 && playerKey[letterIndex] !== '.') {
                        return <span>{playerKey[letterIndex] ? playerKey[letterIndex] : item}</span>
                    } else {
                        return <span>{item}</span>
                    }
                })}
            </q>

            <q>
                {author.split('').map(item => {

                    const letterIndex = alphabet.indexOf(item)

                    if (letterIndex !== -1 && playerKey[letterIndex] !== '.') {
                        return <span>{playerKey[letterIndex] ? playerKey[letterIndex] : item}</span>
                    } else {
                        return <span>{item}</span>
                    }
                })}
            </q>
            <div className="passed">PASSED</div>
        </div>
    )
}