import React, { useEffect, useState } from 'react'
import { Modal } from '../custom/modal'
import { Button } from '../ui/button'

interface AlertModalProps {
    isOpen:boolean,
    onClose:() => void,
    onConfirm:() => void,
    loading:boolean,

}

const AlertModal = ({isOpen,onClose,onConfirm,loading}:AlertModalProps) => {

    const [isMounted,setIsmounted] = useState(false)

    useEffect(()=>{
        setIsmounted(true)
    },[])

    if(!isMounted){
        return null;
    }

  return (
    <Modal  title='Are you sure' 
            description='This action cannot be undone'
            isOpen={isOpen}
            >
        <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
            <Button disabled={loading} variant="outline" onClick={onClose}>
                Cancel
            </Button>
            <Button disabled={loading} variant="danger" onClick={onConfirm}>
                Confirm
            </Button>
        </div>
    </Modal>
  )
}

export default AlertModal