import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { TextField, type TextFieldProps, Checkbox, FormControlLabel } from '@mui/material';


interface HookFormCheckBoxFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
}

export const HookFormCheckBoxField = <T extends FieldValues>({
  name,
  control,
  label,
  ...props
}: HookFormCheckBoxFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              checked={!!value}
              onChange={e => onChange(e.target.checked)}
              size="small"
            />
          }
        />
      )}
    />
  );
};