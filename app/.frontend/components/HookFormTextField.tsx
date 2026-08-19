import type { Theme } from "@emotion/react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import type { SxProps } from "@mui/system";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { NumericFormat } from 'react-number-format';

interface HookFormTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
    name: Path<T>;
    control: Control<T>;
    sx?: SxProps<Theme> | undefined;
    children?: React.ReactNode;
}

interface HookFormCurrencyFieldProps<T extends FieldValues> extends Omit<HookFormTextFieldProps<T>, 'onChange' | 'value' | 'type'> {
    prefix?: string;
    decimalScale?: number;
    thousandSeparator?: boolean | string;
    allowNegative?: boolean;
    type?: 'text' | 'password' | 'tel';
}

export const HookFormCurrencyField = <T extends FieldValues>({
    name,
    control,
    prefix = 'HKD ',
    decimalScale = 2,
    thousandSeparator = ',',
    allowNegative = false,
    type = 'text',
    sx,
    ...props
}: HookFormCurrencyFieldProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                const textFieldProps = props as any;
                return (
                    <NumericFormat
                        {...textFieldProps}
                        value={field.value == null || field.value === '' ? '' : String(field.value)}
                        type={type}
                        onValueChange={(values) => {
                            field.onChange(values.value ?? '');
                        }}
                        customInput={TextField}
                        thousandSeparator={thousandSeparator}
                        decimalScale={decimalScale}
                        fixedDecimalScale
                        allowNegative={allowNegative}
                        prefix={prefix}
                        fullWidth
                        sx={sx}
                        error={!!error}
                        helperText={error ? error.message : props.helperText}
                        inputProps={{ inputMode: 'decimal', ...props.inputProps }}
                    />
                );
            }}
        />
    );
};

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