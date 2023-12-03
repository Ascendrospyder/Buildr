'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { TbBulb } from 'react-icons/tb';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Textarea } from './ui/textarea';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from './ui/use-toast';
import { formSchema, formSchemaType } from '@/schemas/form';
import { CreateForm } from '@/actions/form';
import { BsFilePlusFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';

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

  const handleSubmit = async (values: formSchemaType) => {
    try {
      const formId = await CreateForm(values);
      console.log(formId);
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
          className={`group border border-primary/20 h-[190px] w-[400px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 bg-background ${
            isDarkTheme ? 'text-white' : 'text-black'
          }`}
        >
          <BsFilePlusFill
            className={`h-8 w-8 group-hover:text-grey-100 ${
              isDarkTheme ? 'text-white' : 'text-black'
            }`}
          />
          <p
            className={`font-bold text-xl group-hover:text-grey-500 ${
              isDarkTheme ? 'text-white' : 'text-black'
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
