import type { Theme } from "@emotion/react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import type { SxProps } from "@mui/system";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

interface HookFormTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
    name: Path<T>;
    control: Control<T>;
    sx?: SxProps<Theme> | undefined;
    children?: React.ReactNode;
}

export const HookFormTextField = <T extends FieldValues>({
    name,
    control,
    children,
    sx,
    ...props
}: HookFormTextFieldProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    {...props}
                    sx={sx} 
                    error={!!error}
                    helperText={error ? error.message : props.helperText}
                >
                    {children}
                </TextField>
            )}
        />
    );
};