import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useAuth } from "../hooks/AuthContext";
import { api } from "../services/api";
import { ResourcesCount } from "../interfaces/Utils";
import ResourceCard from "../components/ResourceCard";

const Overview: React.FC = () => {
  const { user } = useAuth();
  const today = new Date();
  const todayTime = today.getHours();

  const grettingsMessage =
    todayTime >= 0 && todayTime < 12
      ? "Bom dia"
      : todayTime >= 12 && todayTime < 18
      ? "Boa tarde"
      : "Boa noite";

  const [resourcesCount, setResourcesCount] = useState<ResourcesCount>();
  const [isLoadingResources, setIsLoadingResources] = useState<boolean>(true);

  const getResourcersCount = async () => {
    const { data } = await api.get(
      `${process.env.VITE_MS_ACADEMIC_MANAGEMENT_URL}/utils/count`
    );

    setResourcesCount(data);
    setIsLoadingResources(false);
  };

  useEffect(() => {
    getResourcersCount();
  }, []);

  return (
    <>
      <Heading
        title={`${grettingsMessage}, ${user?.name}!`}
        description="Veja as estatísticas do sistema"
      />

      <section className="flex flex-row items-center gap-5 mt-6">
        {/* <div className="bg-background-color p-4 pr-16 gap-2 rounded-lg">
          <label className="text-xs">Alunos cadastrados</label>
          <p className="text-black font-bold text-4xl mt-2">13</p>
        </div> */}
        <ResourceCard
          title="Diários cadastrados"
          count={resourcesCount?.diaries ?? 0}
          isLoading={isLoadingResources}
        />
        <ResourceCard
          title="Cursos cadastrados"
          count={resourcesCount?.courses ?? 0}
          isLoading={isLoadingResources}
        />
        <ResourceCard
          title="Turmas cadastrados"
          count={resourcesCount?.classes ?? 0}
          isLoading={isLoadingResources}
        />
        <ResourceCard
          title="Disciplinas cadastrados"
          count={resourcesCount?.disciplines ?? 0}
          isLoading={isLoadingResources}
        />
      </section>

      {/* <h3 className="text-xl font-semibold text-black mt-16 mb-3">
        Últimos discentes vistos
      </h3>
      <section className="flex flex-col gap-3">
        <article className="flex flex-row items-center gap-3">
          <image href="" className="w-11 h-11 bg-black rounded-full" />
          <div>
            <span className="font-semibold text-base text-black">
              Felippe Rian de Oliveira
            </span>
            <p className="font-normal text-sm text-gray">
              Visualizado há 10 minutos
            </p>
          </div>
        </article>
        <article className="flex flex-row items-center gap-3">
          <image href="" className="w-11 h-11 bg-black rounded-full" />
          <div>
            <span className="font-semibold text-base text-black">
              Felippe Rian de Oliveira
            </span>
            <p className="font-normal text-sm text-gray">
              Visualizado há 10 minutos
            </p>
          </div>
        </article>
      </section> */}
    </>
  );
};

export default Overview;
