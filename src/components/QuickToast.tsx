import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { useQuickToast } from "../hooks/QuickToastContext";

const QuickToast = () => {
  const { toastType, showToast, setShowToast, toastMessage } = useQuickToast();

  if (!showToast) return;

  // switch (toastType) {
  //   case "success":
  //     return (
  //       <Toast>
  //         <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
  //           <HiCheck className="h-5 w-5" />
  //         </div>
  //         <div className="ml-3 text-sm font-normal">{toastMessage}</div>
  //         <Toast.Toggle />
  //       </Toast>
  //     );
  //   case "error":
  //     return (
  //       <Toast>
  //         <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
  //           <HiX className="h-5 w-5" />
  //         </div>
  //         <div className="ml-3 text-sm font-normal">{toastMessage}</div>
  //         <Toast.Toggle />
  //       </Toast>
  //     );
  //   default:
  //     return (
  //       <Toast>
  //         <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
  //           <HiExclamation className="h-5 w-5" />
  //         </div>
  //         <div className="ml-3 text-sm font-normal">{toastMessage}</div>
  //         <Toast.Toggle />
  //       </Toast>
  //     );
  // }

  return (
    <div className="absolute z-50 top-6 left-0 right-0">
      <Toast className="m-auto z-10">
        {toastType === "success" ? (
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
        ) : toastType === "error" ? (
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
        ) : (
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
            <HiExclamation className="h-5 w-5" />
          </div>
        )}
        <div className="ml-3 text-sm font-normal">{toastMessage}</div>
        <Toast.Toggle onDismiss={() => setShowToast(false)} />
      </Toast>
    </div>
  );
};

export default QuickToast;
