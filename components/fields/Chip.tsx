import { Field } from "react-final-form"
import { BaseFieldProps } from "./types"
import { default as MUIChip } from "@mui/material/Chip"
import { FormControlLabel } from "@mui/material"

export const Chip = ({ label, name, required }: BaseFieldProps) => {
  return (
    <Field<boolean>
      name={name}
      render={({ input }) => (
        <FormControlLabel
          control={
            <MUIChip label={label} />
          }
          label={label}
        />
      )}
    />
  )
}
