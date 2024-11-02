
export default function InputBar({field,onChange}){

   return <input type="text" placeholder={field} onChange={(e)=>onChange(e.target.value)}></input>
}