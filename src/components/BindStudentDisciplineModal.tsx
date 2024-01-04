import React, { useEffect, useState } from "react";
import Modal, { ModalProps } from "./Modal";
import { DisciplineData } from "../interfaces/Discipline";
import { Checkbox } from "./Checkbox";
import DisciplineSelectable from "./DisciplineSelectable";
import Button from "./Button";
import Loading from "./Loading";
import { useQuickToast } from "../hooks/QuickToastContext";

interface BindStudentDisciplineModalProps extends ModalProps {
  classDisciplines: DisciplineData[];
  allCourseDisciplines?: DisciplineData[];
  submitDisciplines: (disciplines: DisciplineData[]) => void;
}

const BindStudentDisciplineModal = ({
  classDisciplines,
  allCourseDisciplines,
  submitDisciplines,
  ...props
}: BindStudentDisciplineModalProps) => {
  const { handleShowToast } = useQuickToast();

  const [selectedDisciplines, setSelectedDisciplines] =
    useState<DisciplineData[]>(classDisciplines);
  const [disciplines, setDisciplines] = useState<DisciplineData[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const totalLength = [...selectedDisciplines, ...disciplines].length;

  useEffect(() => {
    setSelectedDisciplines(classDisciplines);
    if (classDisciplines.length > 0 || !allCourseDisciplines)
      setIsLoading(false);
  }, [classDisciplines]);

  const showAllDisciplines = () => {
    if (!allCourseDisciplines) return;
    const alreadyHasDisciplines = [...selectedDisciplines, ...disciplines];
    const filteredCourseDisciplines = allCourseDisciplines.filter(
      (discipline) =>
        !alreadyHasDisciplines.find(({ id }) => id === discipline.id)
    );
    const newDisciplines = [...disciplines, ...filteredCourseDisciplines];
    setDisciplines(newDisciplines);
  };

  const handleAddDisciplines = (discipline: DisciplineData) => {
    const alreadyInList = selectedDisciplines.findIndex(
      ({ id }) => id === discipline.id
    );

    const newSelectedDisciplines = [...selectedDisciplines];
    const newDisciplines = [...disciplines];

    if (alreadyInList < 0) {
      newSelectedDisciplines.push(discipline);
      const disciplineIndex = disciplines.findIndex(
        ({ id }) => id === discipline.id
      );
      newDisciplines.splice(disciplineIndex, 1);
    } else {
      newSelectedDisciplines.splice(alreadyInList, 1);
      newDisciplines.push(discipline);
    }

    setSelectedDisciplines(newSelectedDisciplines);
    setDisciplines(newDisciplines);
  };

  return (
    <Modal
      {...props}
      onConfirm={() =>
        selectedDisciplines.length !== 0
          ? submitDisciplines(selectedDisciplines)
          : () => handleShowToast("error", "Selecione pelo menos 1 disciplina")
      }
    >
      <h4 className="mt-4 mb-1 font-semibold text-black text-lg">
        Disciplinas selecionadas
      </h4>
      <section className="flex flex-col gap-2 mb-6">
        {isLoading ? (
          <Loading />
        ) : (
          selectedDisciplines.length === 0 && (
            <span className="text-gray text-center py-2">
              Nenhuma disciplina selecionada
            </span>
          )
        )}
        {selectedDisciplines.map((discipline) => (
          <DisciplineSelectable
            key={discipline.id}
            checked
            name={discipline.id}
            onChange={() => handleAddDisciplines(discipline)}
            title={`${discipline.name} (${discipline.referencePeriod}° ano/período)`}
          />
        ))}
      </section>
      <h4 className="mb-1 font-semibold text-black text-lg">
        Disciplinas disponíveis
      </h4>
      <section className="flex flex-col gap-2 mb-6">
        {isLoading ? (
          <Loading />
        ) : (
          disciplines.length === 0 && (
            <span className="text-gray text-center py-2">
              Você já selecionou todas as disciplinas
            </span>
          )
        )}
        {disciplines.map((discipline) => (
          <DisciplineSelectable
            key={discipline.id}
            checked={false}
            onChange={() => handleAddDisciplines(discipline)}
            title={`${discipline.name} (${discipline.referencePeriod}° ano/período)`}
          />
        ))}
      </section>

      <Button onClick={() => showAllDisciplines()}>
        Exibir todas as disciplinas
      </Button>
      <Button onClick={() => showAllDisciplines()}>
        Exibir todas as disciplinas
      </Button>
    </Modal>
  );
};

export default BindStudentDisciplineModal;
