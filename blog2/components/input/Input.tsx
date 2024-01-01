
'use client'

interface InputProps{
  type:any,
  value:any ,
  onChange?:(event:React.ChangeEvent<HTMLInputElement>)=> void;
  name:string ,
  textarea?:boolean,
  id:string,
  placeholder?:string,
  big?:boolean
  label?:string

}
function Input({type ,value ,onChange,name,textarea,id,placeholder,big ,label}:InputProps) {
  return (
    <div>
        <label  className="p-4 ">
            {label}
        </label>
        <input type={type} value={value} onChange={onChange} name={name}  id={id} placeholder={placeholder}
            className={`
                w-full
                p-4 pt-6 font-light bg-white border-2 outline-none text-black ${big ? 'w-[400px] pb-[6rem]':''}
            `}
        />
    </div>
  )
}

export default Input