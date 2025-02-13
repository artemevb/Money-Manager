import Image from 'next/image';
import React, { FormEvent } from 'react';
import pen from '@/public/svg/income/pensel.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceUtils } from '@/src/app/utils/service.utils';
import toast from 'react-hot-toast';


interface ModalProps {
    open: boolean;
    handleClose: () => void;
}

const AddService = ({handleClose,open}:ModalProps) => {
    const queryClient = useQueryClient()
    const addServiceFn = useMutation({
        mutationFn: serviceUtils.postService,
        onSuccess:() => {
            toast.success("Success new service")
            queryClient.invalidateQueries({queryKey: ['services']})
            handleClose()
        },
        onError: (err) => {
            console.log(err);
            toast.error('Something went wrong')
        }
    })
    const hamdleAddService = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const name = form.serviceName.value
        addServiceFn.mutate({
            name
        })
    }
    return open && (
    <div className="fixed inset-0 flex items-center h-screen justify-center bg-black/50 backdrop-blur-sm z-20"  onClick={handleClose}>
            <form onSubmit={hamdleAddService} className="bg-white rounded-2xl p-6 w-[95%] max-w-md shadow-xl transform transition-all scale-95" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-3">Другое yслуг</h2>
                <div className="relative w-full">
                        <input
                            type="text"
                            name='serviceName'
                            placeholder="Другое "
                            className="w-full rounded-md font-medium px-2 py-[16px] bg-[#F5F2FF] text-sm focus:ring-1 focus:ring-purple-500 pr-10"
                        />
                        <Image
                            src={pen}
                            width={16}
                            height={16}
                            alt="Редактировать"
                            className="absolute right-3 top-[20px] cursor-pointer"
                        />
                </div>
                <button type='submit' className='w-full text-center py-2 mt-3 rounded-xl bg-[#7E49FF] text-white'>Сохранять</button>
            </form>
        </div>
    );
};

export default AddService;