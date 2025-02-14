"use client"

import { Modal } from '@/components/custom/modal';
import { useStoreModal } from '@/hooks/use-store-modal';
import { UserButton } from '@clerk/nextjs';
import React, { useEffect } from 'react'

type Props = {}

const SetupPage = (props: Props) => {

    const onOpen = useStoreModal((state) => state.onOpen)
    const isOpen = useStoreModal((state) => state.isOpen)

    useEffect(()=>{
        if(!isOpen){
            onOpen()
        }
    },[isOpen,onOpen])

  return null
}

export default SetupPage;