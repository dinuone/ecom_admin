import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { SettingsForm } from './components/settings-form'


interface SettingPageProps {
    params:{
        storeid:string
    }
}

const SettingsPage  = async ({params}:SettingPageProps) => {
   
    const { userId} = auth();

    if(!userId){
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({
        where:{
            id:params.storeid,
            userId:userId
        }
    })

    if(!store){
        redirect("/")
    }

    console.log(store);

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SettingsForm initialData={store}/>
        </div>
    </div>
  )
}

export default SettingsPage