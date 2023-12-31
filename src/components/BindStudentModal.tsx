import { ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";
interface ModalProps {
  title: string;
  description?: string;
  children?: ReactNode;
  contentClassName?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const BindStudentModal = ({
  title,
  description,
  contentClassName,
  children,
  onClose,
  onConfirm,
}: ModalProps) => {
  return (
    <div className="absolute flex items-center justify-center inset-0 bg-background-black-transparent z-10">
      <div
        className={`bg-white px-9 py-10 rounded-3xl max-h-[85%] overflow-auto ${
          contentClassName ? contentClassName : ""
        }`}
      >
        <header className="flex items-start flex-row justify-between mb-4">
          <section>
            <h4 className="text-black font-semibold text-2xl">{title}</h4>
            {description && (
              <p className="text-gray font-base">{description}</p>
            )}
          </section>
          <button onClick={() => onClose()}>
            <AiOutlineClose className="text-black text-2xl" />
          </button>
        </header>

        {children}

        <footer className="flex flex-row justify-end items-center gap-4 mt-8">
          <Button onClick={() => onClose()} color="error">
            Cancelar
          </Button>
          <Button onClick={() => onConfirm()}>Confirmar</Button>
        </footer>
      </div>
    </div>
  );
};

export default BindStudentModal;
