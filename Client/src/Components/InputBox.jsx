function InputBox(props){
    return(
        <input 
        className='border-2 p-4 rounded-md my-2' 
        type={props.type} 
        placeholder={props.placeholder} 
        name={props.name} 
        value={props.value} 
        onChange={props.handleChange}
        />
    )
}
export default InputBox

// options=[volvo,saab,fiat]

// let options =props.option;
// let optionValue=options.map((option)=>{
//     return <option value={option}>option</option>
// })
// <select>
//     {optionValue}
// </select>


// <Select options={}/>