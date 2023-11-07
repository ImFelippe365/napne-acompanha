import React from "react";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { ControlledInputArea } from "../components/InputArea";
import { ControlledInput } from "../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const StudentNotes: React.FC = () => {
  const schema = yup.object().shape({
    title: yup.number().required("Campo obrigatório"),
    description: yup.number().required("Campo obrigatório"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitNote = () => {};

  return (
    <>
      <Heading title="Anotações" />

      <form className="flex flex-col gap-3 mt-2">
        <ControlledInput
          control={control}
          name="title"
          type="text"
          label="Título"
          placeholder="Insira um título para a anotação"
        />

        <ControlledInputArea
          control={control}
          name="description"
          type="text"
          label="Descrição"
          placeholder="Insira uma descrição"
        />

        <section className="flex flex-row justify-end mt-1">
          <Button
            onClick={handleSubmit(onSubmitNote)}
            className="flex flex-row items-center gap-2 py-3"
          >
            <IoMdAdd className="text-xl  text-white" />
            <span>Adicionar nota</span>
          </Button>
        </section>
      </form>

      <hr className="text-light-gray my-8" />

      <section>
        <div className="flex flex-row items-center gap-3 mb-2">
          <image href="" className="w-8 h-8 bg-black rounded-full" />
          <div>
            <span className="text-black font-semibold">
              Felippe Rian de Oliveira{" "}
              <span className="text-gray text-xs font-normal">
                07 de novembro de 2023, 11:00{" "}
              </span>
            </span>
            <p className="text-xs font-semibold text-gray">Professor(a)</p>
          </div>
        </div>

        <article className="text-black font-normal text-sm ml-11">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut
          maximus eros. Praesent aliquet accumsan bibendum. Vestibulum nec
          suscipit eros. Donec sagittis sed tortor at iaculis. Donec porta
          vulputate quam at consectetur. Sed justo ante, vulputate sed odio
          semper, luctus faucibus nulla. Ut blandit lectus sed lectus maximus,
          non tincidunt ex pharetra. Quisque euismod nibh eu luctus egestas.
          Vivamus rutrum, leo eget gravida sagittis, eros ex tempor arcu, sed
          sollicitudin turpis mi a ligula. Ut eget massa purus.
        </article>
      </section>
    </>
  );
};

export default StudentNotes;
