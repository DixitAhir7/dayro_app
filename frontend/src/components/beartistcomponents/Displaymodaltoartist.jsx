import { Dialog, DialogPanel } from '@headlessui/react'
import { useEffect, useState } from 'react'

export default function Displaymodaltoartist() {
    let [isOpen, setIsOpen] = useState(false)

    const open = () => {
        setIsOpen(true)
    };
    const close = () => setIsOpen(false);

    // when user enter first time
    const [isFirstTime, setFirstTime] = useState(false);

    const userFirstvisit = () => {
        setFirstTime(true)
        localStorage.setItem('uservisit', isFirstTime)
    }

    useEffect(() => {
        window.addEventListener('load', userFirstvisit)

        return () => {
            window.removeEventListener('load', userFirstvisit)
        }
    }, [])

    return (
        <>
            <button className='mt-2' onClick={open}>Open</button>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-black p-6 backdrop-blur-2xl 
                            duration-100 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <h1>
                                what is takes to be an artist
                            </h1>

                            <div className="mt-4">
                                <button onClick={close}>
                                    Got it, thanks!
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
};