'use client';

import { CreateForm } from '@/actions/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema, formSchemaType } from '@/schemas/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsFilePlusFill } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

function CreateFormBtn() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (values: formSchemaType) => {
    try {
      const formId = await CreateForm(values);
      router.push(`/buildr/${formId}`);
      toast({
        title: 'Congrats',
        description: 'Form successfully created!',
      });
    } catch (e) {
      toast({
        title: 'Error',
        description:
          'Something went wrong while creating your form, please try again!',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 bg-background ${
            isDarkTheme && isMounted ? 'text-white' : 'text-black'
          }`}
        >
          <BsFilePlusFill
            className={`h-8 w-8 group-hover:text-grey-100 ${
              isDarkTheme && isMounted ? 'text-white' : 'text-black'
            }`}
          />
          <p
            className={`font-bold text-xl group-hover:text-grey-500 ${
              isDarkTheme && isMounted ? 'text-white' : 'text-black'
            }`}
          >
            Create New Form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-3xl font-bold'>
            <span className='bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text'>
              Build
            </span>{' '}
            Your Form
          </DialogTitle>
          <DialogDescription className='text-lg'>
            Create a new form to start collecting responses for your next big
            idea💡
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-2'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            className='w-full mt-4'
            onClick={form.handleSubmit(handleSubmit)}
          >
            {!form.formState.isSubmitting && <span>Create Form</span>}
            {form.formState.isSubmitting && (
              <ImSpinner2 className='animate-spin' />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormBtn;
