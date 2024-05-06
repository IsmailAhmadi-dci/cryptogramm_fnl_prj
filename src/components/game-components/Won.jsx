import { alphabet } from "./logic"
export default function Won({quote, author, playerKey, isVisible}) {
    return (
        <div className="pause text-center" style={{display: isVisible ? 'block' : 'none'}}>
            <p style={{textAlign: "center"}}>You Won</p>
            <div className="marked-light">
                            <q>
                {quote.split('').map(item => {

                    const letterIndex = alphabet.indexOf(item)

                    if (letterIndex !== -1 && playerKey.indexOf(item) !== -1) {
                        return <span>{alphabet[playerKey.indexOf(item)]}</span>
                    } else {
                        return <span>{item}</span>
                    }
                })}
            </q>

            <q style={{textTransform: "uppercase"}}>
                <span className="serious">
                   {author.split('').map(item => {

                        const letterIndex = alphabet.indexOf(item)

                        if (letterIndex !== -1 && playerKey.indexOf(item) !== -1) {
                            return <span>{alphabet[playerKey.indexOf(item)]}</span>
                        } else {
                            return <span>{item}</span>
                        }
                    })} 
                </span>
                
            </q>
            </div>

            <div className="passed">PASSED</div>
        </div>
    )
}