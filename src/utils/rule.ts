import type { RegisterOptions, UseFormGetValues } from "react-hook-form"
import * as yup from "yup"

export type FormData = {
    email: string;
    password: string;
    confirm_password: string
};

export type Rules = {
    email?: RegisterOptions<FormData, "email">;
    password?: RegisterOptions<FormData, "password">;
    confirm_password?: RegisterOptions<FormData, "confirm_password">;
};

export const getRules = (getValues?: UseFormGetValues<FormData>): Rules => ({
    email: {
        required: {
            value: true,
            message: 'Email là bắt buộc',
        },
        pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Email không đúng định dạng',
        },
        maxLength: {
            value: 160,
            message: "Độ dài từ 5 - 160 ký tự"
        },
        minLength: {
            value: 5,
            message: "Độ dài từ 5 - 160 ký tự"
        }
    },
    password: {
        required: {
            value: true,
            message: 'Password là bắt buộc',
        },
        maxLength: {
            value: 160,
            message: "Độ dài từ 8 - 160 ký tự"
        },
        minLength: {
            value: 8,
            message: "Độ dài từ 8 - 160 ký tự"
        }
    },
    confirm_password: {
        required: {
            value: true,
            message: 'Confirm password là bắt buộc',
        },
        maxLength: {
            value: 160,
            message: "Độ dài từ 8 - 160 ký tự"
        },
        minLength: {
            value: 8,
            message: "Độ dài từ 8 - 160 ký tự"
        },
        validate: typeof getValues === 'function'
            ? (value) => value === getValues('password') || 'Nhập lại password không khớp'
            : undefined
    }
})

export const schema = yup
    .object({
        email: yup
            .string()
            .required('Email là bắt buộc')
            .email('Email không đúng định dạng')
            .min(5, 'Độ dàu từ 5 - 160 ký tự')
            .max(160, "Độ dài từ 5 - 160 ký tự"),
        password: yup
            .string()
            .required('Password là bắt buộc')
            .min(8, "Độ dài từ 8 - 160 ký tự")
            .max(160, "Độ dài từ 8 - 160 ký tự"),
        confirm_password: yup
            .string()
            .required('Password là bắt buộc')
            .min(8, "Độ dài từ 8 - 160 ký tự")
            .max(160, "Độ dài từ 8 - 160 ký tự")
            .oneOf([yup.ref('password')], 'Nhập lại password không khớp')

    })
    .required()

export const loginSchema = schema.omit(['confirm_password'])
export type Schema = yup.InferType<typeof schema>