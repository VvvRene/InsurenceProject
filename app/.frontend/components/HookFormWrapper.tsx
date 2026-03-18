import React, { type ReactNode } from "react";
import { 
  useForm, 
  FormProvider,
  Controller, 
  useFormContext,
  type UseFormReturn, 
  type SubmitHandler, 
  type UseFormProps, 
  type FieldPath, 
  type FieldValues
} from "react-hook-form";
 
import { 
  Box, 
  TextField, 
  type TextFieldProps 
} from "@mui/material"; 

type HookFormInputProps<TFieldValues extends FieldValues> = TextFieldProps & {
  name: FieldPath<TFieldValues>;
};

interface HookFormWrapperProps<TFormValues extends Record<string, any>> {
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
  onSubmit: SubmitHandler<TFormValues>;
  options?: UseFormProps<TFormValues>;
}

export const HookFormWrapper = <TFormValues extends Record<string, any>>({
  children,
  onSubmit,
  options,
}: HookFormWrapperProps<TFormValues>) => {
  const methods = useForm<TFormValues>(options);

  return (
    <FormProvider {...methods}>
      <Box 
        component="form" 
        onSubmit={methods.handleSubmit(onSubmit)} 
        noValidate 
        sx={{ mt: 1, width: '100%' }}
      >
        {children(methods)}
      </Box>
    </FormProvider>
  );
};

export const HookFormInput = <TFieldValues extends FieldValues>({
  name,
  ...otherProps
}: HookFormInputProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...otherProps}
          error={!!error}
          helperText={error?.message}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      )}
    />
  );
};