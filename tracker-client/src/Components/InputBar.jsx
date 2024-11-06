export default function InputBar({ field, onChange }) {
   return (
       <input
           type="text"
           placeholder={field}
           onChange={(e) => onChange(e.target.value)}
           className="rounded w-full h-10 px-3 border border-none bg-zinc-700 text-white placeholder-gray-400 text-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all duration-500"
       />
   );
}
