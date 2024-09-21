import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

const loginSchema = z.object({
  email: z.string().min(2, {
    message: '2글자 이상의 아이디를 입력해 주세요.',
  }),
  password: z.string().min(2, {
    message: '2글자 이상의 비밀번호를 입력해 주세요',
  }),
});

const LoginForm = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (values: z.infer<typeof loginSchema>) =>
      axios.post('https://g6-server.dainreview.kr/api/login', values, {
        withCredentials: true,
      }),
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values, {
      onSuccess: () => {
        sessionStorage.setItem(
          'login',
          (new Date().valueOf() + 1000 * 60 * 30).toString()
        );
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>아이디</FormLabel>
              <FormControl>
                <Input placeholder="아이디를 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          로그인
        </Button>
        {isError && <p className="text-red-500">로그인에 실패했습니다.</p>}
      </form>
    </Form>
  );
};

export default LoginForm;
