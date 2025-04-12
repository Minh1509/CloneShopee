import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Schema, schema } from '../../utils/rule';
import Input from '../../components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { registerAccount } from '../../apis/auth.api';
import { Omit, omit } from 'lodash';
import { isAxiosUnprocessableEntityError } from '../../utils/utils';
import { ResponseApi } from '../../types/utils.type';

type FormData = Schema;
export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) =>
      registerAccount(body),
  });

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password']);
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<
            ResponseApi<Omit<FormData, 'confirm_password'>>
          >(error)
        ) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message:
                  formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server',
              });
            });
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server',
          //   });
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server',
          //   });
          // }
        }
      },
    });
  });

  return (
    <div className="bg-orange">
      <div className="container">
        <div className="grid gird-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              className="p-10 rounded bg-white shadow-sm"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="text-2xl">Đăng ký</div>
              <Input
                name="email"
                register={register}
                className="mt-8"
                type="email"
                placeholder="Email"
                errorMessage={errors.email?.message}
                autoComplete="on"
              />
              <Input
                name="password"
                register={register}
                className="mt-2"
                type="password"
                placeholder="Password"
                errorMessage={errors.password?.message}
                autoComplete="on"
              />

              <Input
                name="confirm_password"
                register={register}
                className="mt-2"
                type="password"
                placeholder="Confirm password"
                errorMessage={errors.confirm_password?.message}
                autoComplete="on"
              />

              <div className="mt-2">
                <button
                  type="submit"
                  className="w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600"
                >
                  Đăng ký
                </button>
              </div>

              <div className="flex items-center justify-center mt-8">
                <span className="text-gray-400">Bạn đã có tài khoản?</span>
                <Link className="text-red-400 ml-1" to="/login">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
