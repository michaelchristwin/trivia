import { useCallback, useEffect, useRef, useState } from "react";

function Dialog() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      setIsOpen(true);
    }
  }, [dialogRef]);
  const closeDialog = useCallback(() => {
    if (dialogRef.current) {
      setIsOpen(false);
    }
  }, [dialogRef]);
  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.addEventListener("close", closeDialog);
    }
    return () => {
      if (dialogRef.current) {
        dialogRef.current.removeEventListener("close", closeDialog);
      }
    };
  }, [dialogRef]);
  return (
    <div className={`relative w-[100vw] h-[100vh]`}>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 transition-all duration-300"></div>
      )}

      <dialog
        ref={dialogRef}
        className={`fixed top-[50%] max-w-lg left-[50%] h-[300px] transform translate-x-[-50%] translate-y-[-50%] w-96 p-6 bg-background text-white rounded-lg shadow-lg z-20 pointer-events-auto transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      >
        This is a fucking dialog ni**a
      </dialog>
      <button
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
        onClick={openDialog}
      >
        Open Dialog
      </button>
    </div>
  );
}

export default Dialog;
