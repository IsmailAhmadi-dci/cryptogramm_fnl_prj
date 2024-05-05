export default function Pause({isVisible}) {
    return <div className="pause" style={{display: isVisible ? 'block' : 'none'}}>Game Paused</div>
}