import { Field } from "react-final-form"
import { BaseFieldProps } from "./types"
import { default as MUICheckbox } from "@mui/material/Checkbox"
import { FormControlLabel } from "@mui/material"

export const Checkbox = ({ label, name, onChangeFunction, value }: BaseFieldProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeFunction) {
      onChangeFunction(!value);
    }
  };

  return (
    <Field<boolean>
      name={name}
      render={({ input }) => (
        <FormControlLabel
          control={
            // muiCheckbox component with an onchange function
            <MUICheckbox
              checked={input.checked}
              onChange={handleChange}
            />
          }
          label={label}
        />
      )}
    />
  )
}