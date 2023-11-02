import { IoMdTrash } from "react-icons/io";
import { MdModeEdit, MdFormatListBulleted } from "react-icons/md";

interface TActionsProps {
  showList?: boolean;
  showEdit?: boolean;
  showRemove?: boolean;
  onListClick?: () => void;
  onEditClick?: () => void;
  onRemoveClick?: () => void;
  iconClassName?: string;
}

const TActions = ({
  showList = true,
  showEdit = true,
  showRemove = true,
  onListClick = () => {},
  onEditClick = () => {},
  onRemoveClick = () => {},
  iconClassName,
}: TActionsProps) => {
  const iconStyle = iconClassName ? iconClassName : "text-2xl text-primary";

  return (
    <section className="flex flex-row items-center gap-2">
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
