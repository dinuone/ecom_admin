"use client"

import { Store } from '@prisma/client'
import React, { useState } from 'react'
import Heading from './heading'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/alert-modal'
import { APiAlert } from '@/components/custom/api-alert'

interface SettingsFormProps{
  initialData:Store
}

const formSchema = z.object({
  name:z.string().min(3)
})

type settingFormValues = z.infer<typeof formSchema>

export const SettingsForm  = ({initialData}:SettingsFormProps) => {

  const params = useParams();
  const router = useRouter();

  const [open,setOpen] = useState(false)
  const [loading,setLoading] = useState(false)

  const form = useForm<settingFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData
  });

  const submitForm = async (data:settingFormValues)=>{
    try{

      setLoading(true)

      await axios.patch(`/api/stores/${params.storeid}`,data)
      router.refresh()
      toast.success('Store updated')
    }catch(err){
      setLoading(false)
      toast.error("Make sure you removed all products and categories first!")
    }finally{
      setLoading(false)
    }
  }

  const onDelete = async () =>{

    try{
      
      setLoading(true)

      await axios.delete(`/api/stores/${params.storeid}`)
      router.refresh()
      router.push('/')
      toast.success('Store has been deleted')


    }catch(err){
      setLoading(false)
      toast.error("Something went wrong!")
    }
  }

 
  return (
    <>
    <AlertModal 
        isOpen={open} 
        onClose={()=>setOpen(false)}
        onConfirm={()=>{onDelete()}}
        loading={loading} />

     <div className='flex items-center justify-between'>
        <Heading title='Settings' description='Manage store preferences'/>
        <Button 
            variant="danger" 
            size="icon" 
            onClick={()=>{setOpen(true)}}>
            <Trash className='w-4 h-4'/>
        </Button>
      </div>

      <Separator/>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className='space-y-8 w-full'>
            <div className='grid grid-cols-3 gap-8'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder='Store name' {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
            </div>
            <Button disabled={loading} className='ml-auto' type='submit'>
              Save Chnages
            </Button>
        </form>
      </Form>

      <Separator/>

      <APiAlert title='NEXT_PUBLIC_URL' description='alert' variant='public'/>
    </>
   
  )
}

