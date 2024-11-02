export default function Button({field,onClick}){
    return <button className="text-white bg-zinc-300"onClick={onClick}>{field}</button>
}