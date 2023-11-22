import React from 'react'

const SelectInput = ({ options = [], onChange, name, id, labelDefault, title, errors, touched, ...props }) => {
  return (
    <div className='mb-4'>
      <label className=' block tetx-gray-700 font-bold mb-2' htmlFor={id}>
        {title}
      </label>
      {errors && touched ? (<div className='text-sm text-red-700 mb-1'>{errors}</div>) :
        (<div className='mb-3'></div>)
      }
      <select {...props} id={id} name={name} onChange={onChange}>
        <option value="">{labelDefault}</option>
        {options.map(item => {
          if (item.default) {
            return <option key={item.value} value={item.value} default>{item.label}</option>
          }
          return (

            <option key={item.value} value={item.value} >{item.label}</option>


          )
        })}
      </select>
    </div>
  )
}

export default SelectInput
