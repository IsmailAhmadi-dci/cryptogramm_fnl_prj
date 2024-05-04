import { alphabet } from "./logic"
export default function Key({letter, call, playerKey}) {
    const label = playerKey[alphabet.indexOf(letter)] !== -1 ? playerKey[alphabet.indexOf(letter)] : ' '
    return (
        <div className="Key" key={letter}>
            <button onClick={() => call(alphabet.indexOf(letter))}>{letter}</button>
            <p>{label === '.' ? '' : label}</p>
        </div>
    )
}