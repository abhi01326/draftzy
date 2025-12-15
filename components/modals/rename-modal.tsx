"use client"
import { FormEventHandler, useEffect, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogTitle,
    DialogFooter
 } from '@/components/ui/dialog';
import { useRenameModal } from '@/store/use-rename-modal';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';



 export const RenameModal = ()=>{

    const {mutate,pending} = useApiMutation(api.board.update);
    const {
        isOpen,
        onClose,
        initialValues,
    } = useRenameModal();


    const [title, setTitle] = useState(initialValues?.title || "");
    useEffect(()=>{
        setTitle(initialValues?.title );
    },[initialValues]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e,)=>{
        e.preventDefault();
        mutate({
            id: initialValues!.id,
            title,
        })
        .then(()=>{
            toast.success(`Board renamed to "${title}"`);
            onClose();
        })
        .catch(()=>{
            toast.error("Failed to rename board. Please try again.");
        });

    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit board title</DialogTitle>
            <DialogDescription>
              Enter a new title for this board.
            </DialogDescription>
            <form onSubmit={onSubmit} className='space-y-4' >
                <Input
                disabled={pending}
                required
                maxLength={60}
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                placeholder='Board Title'
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" disabled={pending}>
                        Save
                    </Button>
                </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
        </Dialog>
    )
 }