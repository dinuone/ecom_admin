"use client"

import { StoreModal } from "@/components/modals/store-modals";
import { useEffect, useState } from "react"


type Props = {}

const ModalProvider = (props: Props) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }

  return (
    <>
        <StoreModal/>
    </>
  )
}

export default ModalProvider;