
export default function InputBar({field,setData}){
    console.log(field)
   return <input type="text" placeholder={field} onChange={(e)=>setData(e.target.value)}></input>
}