import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { StudentData, StudentGrade, StudentNote } from "../interfaces/Student";

interface StudentProviderProps {
  children: React.ReactNode;
}

interface StudentContextValues {
  student: StudentData | undefined;
  setStudent: React.Dispatch<React.SetStateAction<StudentData | undefined>>;
  grades: StudentGrade[];
  setGrades: React.Dispatch<React.SetStateAction<StudentGrade[]>>;
  notes: StudentNote[];
  setNotes: React.Dispatch<React.SetStateAction<StudentNote[]>>;
  eventParticipations: any[];
  setEventParticipations: React.Dispatch<React.SetStateAction<any[]>>;
  selectedDiaryToGrades: string;
  setSelectedDiaryToGrades: React.Dispatch<React.SetStateAction<string>>;
  selectedDiaryToGraph: string;
  setSelectedDiaryToGraph: React.Dispatch<React.SetStateAction<string>>;

  getStudentDetails: (studentId: string) => Promise<void>;
  getStudentGrades: (diary_id?: string) => Promise<void>;
  getStudentNotes: () => Promise<void>;
  getStudentEventParticipations: () => Promise<void>;
}

const StudentContext = createContext({} as StudentContextValues);

const StudentProvider = ({ children }: StudentProviderProps) => {
  const [student, setStudent] = useState<StudentData | undefined>();
  const [grades, setGrades] = useState<StudentGrade[]>([]);
  const [notes, setNotes] = useState<StudentNote[]>([]);
  const [eventParticipations, setEventParticipations] = useState<any[]>([]);

  const [selectedDiaryToGrades, setSelectedDiaryToGrades] =
    useState<string>("");
  const [selectedDiaryToGraph, setSelectedDiaryToGraph] = useState<string>("");

  const getStudentGrades = useCallback(
    async (diary_id?: string) => {
      const { data } = await api.get(
        diary_id
          ? `${process.env.VITE_MS_STUDENT_URL}/grades/${student?.id}?diary_id=${diary_id}`
          : `${process.env.VITE_MS_STUDENT_URL}/grades/${student?.id}`
      );

      setGrades(data ?? []);
    },
    [student?.id]
  );

  const getStudentNotes = useCallback(async () => {
    const { data } = await api.get(
      `${process.env.VITE_MS_STUDENT_URL}/notes/${student?.id}`
    );

    setNotes(data ?? []);
  }, [student?.id]);

  const getStudentEventParticipations = useCallback(async () => {
    const { data } = await api.get(
      `${process.env.VITE_MS_STUDENT_URL}/students/${student?.id}/events/all`
    );

    setEventParticipations(data ?? []);
  }, [student?.id]);

  const getStudentDetails = useCallback(async (studentId: string) => {
    const { data } = await api.get(
      `${process.env.VITE_MS_STUDENT_URL}/students/${studentId}/details`
    );

    setStudent(data);
  }, []);

  useEffect(() => {
    getStudentGrades(selectedDiaryToGrades);
  }, [selectedDiaryToGrades, selectedDiaryToGraph]);

  const contextValues = {
    student,
    setStudent,
    grades,
    setGrades,
    notes,
    setNotes,
    eventParticipations,
    setEventParticipations,
    selectedDiaryToGrades,
    setSelectedDiaryToGrades,
    selectedDiaryToGraph,
    setSelectedDiaryToGraph,

    getStudentDetails,
    getStudentGrades,
    getStudentNotes,
    getStudentEventParticipations,
  };

  return (
    <StudentContext.Provider value={contextValues}>
      {children}
    </StudentContext.Provider>
  );
};

const useStudent = () => {
  const context = useContext(StudentContext);

  return context;
};

export { StudentProvider, useStudent };
