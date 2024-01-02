import React from "react";
import Heading from "../components/Heading";
import { useAuth } from "../hooks/AuthContext";

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

  return (
    <>
      <Heading
        title={`${grettingsMessage}, ${user?.name}!`}
        description="Veja as estatísticas do sistema"
      />

      <section className="flex flex-row items-center gap-5 mt-6">
        <div className="bg-background-color p-4 pr-16 gap-2 rounded-lg">
          <label className="text-xs">Alunos cadastrados</label>
          <p className="text-black font-bold text-4xl mt-2">13</p>
        </div>
        <div className="bg-background-color p-4 pr-16 gap-2 rounded-lg">
          <label className="text-xs">Diários cadastrados</label>
          <p className="text-black font-bold text-4xl mt-2">3</p>
        </div>
        <div className="bg-background-color p-4 pr-16 gap-2 rounded-lg">
          <label className="text-xs">Cursos cadastrados</label>
          <p className="text-black font-bold text-4xl mt-2">8</p>
        </div>
        <div className="bg-background-color p-4 pr-16 gap-2 rounded-lg">
          <label className="text-xs">Turmas cadastrados</label>
          <p className="text-black font-bold text-4xl mt-2">23</p>
        </div>
        <div className="bg-background-color p-4 pr-16 gap-2 rounded-lg">
          <label className="text-xs">Disciplinas cadastrados</label>
          <p className="text-black font-bold text-4xl mt-2">200</p>
        </div>
      </section>

      <h3 className="text-xl font-semibold text-black mt-16 mb-3">
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
      </section>
    </>
  );
};

export default Overview;
