"use client"

import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    children?: React.ReactNode;
}

export const Modal = ({ title, description, isOpen, children }: ModalProps) => {
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    const onChange = (newOpen: boolean) => {
        if (!newOpen) {
            onClose();
        }
    };

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    return (
        <Dialog open={open} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    );
};
