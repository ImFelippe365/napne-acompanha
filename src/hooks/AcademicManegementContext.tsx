import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { CourseData } from "../interfaces/Course";
import { DiaryData } from "../interfaces/Diary";

interface AcademicManagementProviderProps {
  children: React.ReactNode;
}

interface AcademicManagementContextValues {
  courses: CourseData[];
  setCourses: React.Dispatch<React.SetStateAction<CourseData[]>>;
  diaries: DiaryData[];
  setDiaries: React.Dispatch<React.SetStateAction<DiaryData[]>>;

  isLoadingCourses: boolean;
  isLoadingDiaries: boolean;

  setIsLoadingCourses: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoadingDiaries: React.Dispatch<React.SetStateAction<boolean>>;

  getAllCourses: () => Promise<void>;
  getAllDiaries: () => Promise<void>;
}

const AcademicManagementContext = createContext({} as AcademicManagementContextValues);

const AcademicManegementProvider = ({ children }: AcademicManagementProviderProps) => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [diaries, setDiaries] = useState<CourseData[]>([]);

  const [isLoadingCourses, setIsLoadingCourses] = useState<boolean>(true);
  const [isLoadingDiaries, setIsLoadingDiaries] = useState<boolean>(true);

  const getAllCourses = useCallback(async () => {
    const { data } = await api.get(
      `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/courses/all`
    );

    setCourses(data);
    setIsLoadingCourses(false);
  },
    []
  );

  const getAllDiaries = useCallback(async () => {
    const { data } = await api.get(
      `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/diaries/all`
    );
    setDiaries(data);
    setIsLoadingDiaries(false);
  },
    []
  );

  const contextValues = {
    courses,
    setCourses,
    diaries,
    setDiaries,

    isLoadingCourses,
    isLoadingDiaries,

    setIsLoadingCourses,
    setIsLoadingDiaries,

    getAllCourses,
    getAllDiaries,
  };

  useEffect(() => {
    // getAllCourses();
  }, []);

  return (
    <AcademicManagementContext.Provider value={contextValues}>
      {children}
    </AcademicManagementContext.Provider>
  );
};

const useAcademicManagement = () => {
  const context = useContext(AcademicManagementContext);

  return context;
}

export { AcademicManegementProvider, useAcademicManagement }