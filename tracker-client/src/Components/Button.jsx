export default function Button({field,onClick}){
    return <button className="w-full py-2 mt-4 bg-green-600 text-white rounded hover:bg-blue-700 transition-colors duration-300" onClick={onClick}>{field}</button>
}