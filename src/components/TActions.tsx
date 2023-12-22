import { IoMdTrash } from "react-icons/io";
import { MdModeEdit, MdFormatListBulleted } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";

interface TActionsProps {
  showList?: boolean;
  showEdit?: boolean;
  showRemove?: boolean;
  showBindStudent?: boolean;
  onListClick?: () => void;
  onEditClick?: () => void;
  onRemoveClick?: () => void;
  onBindClick?: () => void;
  iconClassName?: string;
}

const TActions = ({
  showList = true,
  showEdit = true,
  showRemove = true,
  showBindStudent = false,
  onListClick = () => { },
  onEditClick = () => { },
  onRemoveClick = () => { },
  onBindClick = () => { },
  iconClassName,
}: TActionsProps) => {
  const iconStyle = iconClassName ? iconClassName : "text-2xl text-primary";

  return (
    <section className="flex flex-row items-center gap-2">
      {showBindStudent && (
        <button onClick={() => onBindClick()}>
          <IoPersonAdd className={iconStyle} />
        </button>
      )}
      {showList && (
        <button onClick={() => onListClick()}>
          <MdFormatListBulleted className={iconStyle} />
        </button>
      )}
      {showEdit && (
        <button onClick={() => onEditClick()}>
          <MdModeEdit className={iconStyle} />
        </button>
      )}
      {showRemove && (
        <button onClick={() => onRemoveClick()}>
          <IoMdTrash className={iconStyle} />
        </button>
      )}
    </section>
  );
};

export default TActions;
