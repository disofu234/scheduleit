import React from "react"
import { Checkbox } from "ui-components"

const CheckboxGroup = ({
  labels,
  values,
  selected,
  onSelectedChange
}) => {
  const onCheckboxChange = value => e => {
    const newSelectedState = e.target.checked ? [...selected, value] : selected.filter(x => x !== value)
    onSelectedChange(newSelectedState)
  }

  return (
    <div>
      {labels.map((label, ind) => <Checkbox label={label} checked={selected.includes(values[ind])} onChange={onCheckboxChange(values[ind])}/>)}
    </div>
  )
}

export default CheckboxGroup