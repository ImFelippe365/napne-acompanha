import BindStudentModal from "../../../components/BindStudentModal";
import TCell from "../../../components/TCell";
import THeader from "../../../components/THeader";
import TRow from "../../../components/TRow";
import Table from "../../../components/Table";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "../../../components/Checkbox";
import { useEffect, useState } from "react";
import { StudentData } from "../../../interfaces/Student";
import { api } from "../../../services/api";
import Loading from "../../../components/Loading";
import { Avatar } from "flowbite-react";
import { useQuickToast } from "../../../hooks/QuickToastContext";
import { EventParticipations } from "../../../interfaces/Event";

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
  const [eventsParticipations, setEventsParticipations] = useState<EventParticipations[]>([])
  const [studentsLoading, setStudentsLoading] = useState(true)

  const schema = yup.object().shape({
    selectedIds: yup.array().of(yup.string()).min(1, 'Selecione pelo menos um ID'),
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { handleShowToast } = useQuickToast();

  const getAllStudents = async () => {
    const { data } = await api.get(`${process.env.VITE_MS_STUDENT_URL}/students/all`)
    setStudents(data);
    // console.log(data)
    setStudentsLoading(false);
  }

  const getAllEventsParticipations = async () => {
    const { data } = await api.get(`${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/events/${eventToBind}/students/all`)

    console.log(data)
    setEventsParticipations(data);
  }

  const onSubmit = async () => {
    console.log(data)

    const selectedIdsTrue = Object.entries(data)
      .filter(([_, value]) => value === true)
      .map(([key]) => key);

    const formattedData = selectedIdsTrue.map((value) => {
      console.log('values', value)
      if (value !== eventToBind) {
        return {
          studentId: value,
          eventId: eventToBind
        };
      }
    });

    const response = await api.post(
      `${process.env.VITE_MS_STUDENT_URL}/students/events/link`, formattedData
    )

    if (response.status === 201) {
      // getAllClasses();
      setOpenModal();
      // reset({});
      handleShowToast("success", "Turma criada com sucesso!");
    }
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    console.log(id, checked)
    setData(prevData => ({
      ...prevData,
      [id]: checked
    }));
  };

  const studentOptions = students?.map((student) => ({
    id: student.id,
    name: student.name,
    registration: student.registration,
    picture: student.picture
  })
  )
  console.log(studentOptions)

  useEffect(() => {
    getAllEventsParticipations();
    getAllStudents();
  }, [])

  return (
    <BindStudentModal
      title={`${eventsParticipations.length < 0 ? "Vincular estudantes" : "Estudantes vinculados"}`}
      description="Selecione os estudantes que deseja vincular"
      onClose={() => setOpenModal()}
      onConfirm={handleSubmit(onSubmit)}
    >
      <Table className="mt-8">
        <thead>
          <TRow>
            {eventsParticipations.length <= 0 && <THeader> </THeader>}
            <THeader>Nome</THeader>
            <THeader>Matrícula</THeader>
          </TRow>
        </thead>
        <tbody>
          {studentsLoading && <Loading />}
          {eventsParticipations.map(({id, student, studentId}) => (
            <TRow key={id}>
              <TCell>
                <div className="flex flex-row items-center gap-3">
                  {/* <Avatar
                    image={`${process.env.VITE_MS_STUDENT_PICTURES}/${picture}`}
                    size={40}
                    className="w-[50px] h-[50px]"
                  /> */}
                  <span>{student.name}</span>
                </div>
              </TCell>
              <TCell>{student.registration}</TCell>
            </TRow>
          ))}
          {eventsParticipations.length <= 0 && (studentOptions?.map(({ id, name, registration, picture }) => (
            <TRow key={id}>
              <TCell>
                <Checkbox
                  checkboxClassName="mr-2"
                  checked={data[id] || false}
                  onChange={(e) => handleCheckboxChange(id, e.target.checked)}
                />
              </TCell>
              <TCell>
                <div className="flex flex-row items-center gap-3">
                  <Avatar
                    image={`${process.env.VITE_MS_STUDENT_PICTURES}/${picture}`}
                    size={40}
                    className="w-[50px] h-[50px]"
                  />
                  <span>{name}</span>
                </div>
              </TCell>
              <TCell>{registration}</TCell>
            </TRow>
          )))}
        </tbody>
      </Table>
    </BindStudentModal>
  );
};

export default LinkStudentToEventFormModal;
