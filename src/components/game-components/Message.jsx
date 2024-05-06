import { alphabet } from "./logic"
export default function Message({quote, author, playerKey, isVisible}) {
    

    playerKey = playerKey === undefined ? '..........................' : playerKey
    quote = quote === undefined ? '' : quote.toLowerCase()
    author = author === undefined ? '' : author.toLowerCase()
    isVisible = isVisible === undefined ? false : isVisible



    return (
        <div style={{display: isVisible ? 'block' : 'none'}} className="message">
            <p>
                {quote.split('').map(item => {

                    const letterIndex = alphabet.indexOf(item)

                    if (letterIndex !== -1 && playerKey.indexOf(item) !== -1) {
                        return <span className="marked">{alphabet[playerKey.indexOf(item)]}</span>
                    } else {
                        return <span>{item}</span>
                    }
                })}
            </p>

            <br/>

            <p>
                {author.split('').map(item => {

                    const letterIndex = alphabet.indexOf(item)

                    if (letterIndex !== -1 && playerKey.indexOf(item) !== -1) {
                        return <span className="marked">{alphabet[playerKey.indexOf(item)]}</span>
                    } else {
                        return <span>{item}</span>
                    }
                })}
            </p>
        </div>
    )
}