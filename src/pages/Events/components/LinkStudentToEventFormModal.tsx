import BindStudentModal from "../../../components/BindStudentModal";
import TCell from "../../../components/TCell";
import THeader from "../../../components/THeader";
import TRow from "../../../components/TRow";
import Table from "../../../components/Table";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "../../../components/Checkbox";
import { useState } from "react";
import { StudentData } from "../../../interfaces/Students";

interface LinkStudentToEventFormModalProps {
  setOpenModal: () => void;
  eventToBind: string;
}

interface StudentsIdsList {
  [id: string]: boolean;
}

interface StudentsToBind {
  [id: string]: string;
}

const LinkStudentToEventFormModal = ({
  eventToBind,
  setOpenModal
}: LinkStudentToEventFormModalProps) => {
  const [data, setData] = useState<StudentsIdsList>({});
  const [students, setStudents] = useState<StudentData[]>([])

  const schema = yup.object().shape({
    selectedIds: yup.array().of(yup.string()).min(1, 'Selecione pelo menos um ID'),
  });

  const { handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const getAllStudents = async () => {
    // Request to get all students
  }

  const onSubmit = () => {
    console.log(data)

    const selectedIdsTrue = Object.entries(data)
      .filter(([_, value]) => value === true)
      .map(([key]) => key);

    const formattedData: StudentsToBind = {}

    selectedIdsTrue.map((value) => {
      formattedData[value] = eventToBind
    })
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    console.log(id, checked)
    setData(prevData => ({
      ...prevData,
      [id]: checked
    }));
  };

  const studentOptions = [
    { id: "1", name: "Bruna Maria Pinto", registration: "20211094040009" },
    { id: "2", name: "Bruna Maria Pinto", registration: "20211094040009" },
    { id: "3", name: "Bruna Maria Pinto", registration: "20211094040009" },
    { id: "4", name: "Bruna Maria Pinto", registration: "20211094040009" },
    { id: "5", name: "Bruna Maria Pinto", registration: "20211094040009" }
  ];

  return (
    <BindStudentModal
      title="Vincular estudantes"
      description="Selecione os estudantes que deseja vincular"
      onClose={() => setOpenModal()}
      onConfirm={handleSubmit(onSubmit)}
    >
      <Table className="mt-8">
        <thead>
          <TRow>
            <THeader> </THeader>
            <THeader>Nome</THeader>
            <THeader>Matrícula</THeader>
          </TRow>
        </thead>
        <tbody>
          {studentOptions.map(({ id, name, registration }) => (
            <TRow key={id}>
              <TCell>
                <Checkbox
                  checkboxClassName="mr-2"
                  checked={data[id] || false}
                  onChange={(e) => handleCheckboxChange(id, e.target.checked)}
                />
              </TCell>
              <TCell>
                <div className="flex flex-row items-center gap-3 mr-2">
                  <img src="#" className="w-8 h-8 bg-black rounded-full" />
                  <span>{name}</span>
                </div>
              </TCell>
              <TCell>{registration}</TCell>
            </TRow>
          ))}
        </tbody>
      </Table>
    </BindStudentModal>
  );
};

export default LinkStudentToEventFormModal;
