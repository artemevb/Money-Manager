import { useEffect, useState } from "react";
interface modalProps{
    open: boolean,
    handleClose: () => void
}


export default function IncomePayModal({handleClose,open}:modalProps) {
    const [moreAdd, setMoreAdd] = useState(false);
    useEffect(() => {
        if (open) {
          document.body.style.overflow = "hidden"; // Scrollni o‘chirish
        } else {
          document.body.style.overflow = "auto"; // Scrollni tiklash
        }
    
        return () => {
          document.body.style.overflow = "auto"; // Komponent unmount bo‘lganda scrollni tiklash
        };
      }, [open]);
    return (
        <div className="">
            {open && (
                <div className="fixed inset-0 flex items-center h-screen justify-center bg-black/50 backdrop-blur-sm z-20">
                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl transform transition-all scale-95">
                        <h2 className="text-xl font-semibold">Modal Title</h2>
                        <p className="text-gray-500 mt-2">
                            This is a simple modal example styled like ShadCN.
                        </p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition">
                                Cancel
                            </button>
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
