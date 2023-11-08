import { useForm } from "react-hook-form";
import { Player } from "@lottiefiles/react-lottie-player";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { ControlledInput } from "../components/Input";
import loginAnimation from "./../assets/lottie-files/login-animation.json"
interface SignInData {
  registration: string;
  password: string;
}

export const SignIn = () => {
  const signInSchema = yup.object({
    registration: yup.string().required("Campo e-mail é obrigatório"),
    password: yup.string().required("Campo senha é obrigatório"),
  });

  const {
    control,
    handleSubmit,
    setError,
  } = useForm<SignInData>({
    resolver: yupResolver(signInSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignInData) => {
    try {
      console.log(data)
      
      navigate("/visao-geral");
    } catch (err) {
      console.log(err);
      setError("password", { message: "Matrícula ou senha incorreto(s)" });
    }
  };

  return (
    <main className="grid grid-cols-2 bg-background-color">
      <section className="m-auto mt-12">
        <Player
          autoplay
          controls={false}
          loop
          speed={0.5}
          src={loginAnimation}
          style={{ height: "60%", width: "60%" }}
        />
        <article className="max-w-xl text-center m-auto">
          <h1 className="text-black text-lg leading-6">
            <span className="font-bold">NAPNE Acompanha</span>
          </h1>
          <p className="mt-2 text-gray ">
            A autenticação é feita por meio do SUAP. Por mais que a matrícula
            esteja ativa, apenas o público com permissão poderá acessar o
            sistema, ou seja, apenas para funcionários do NAPNE e
            professores.
          </p>
        </article>
      </section>
      <section className="w-full bg-white flex flex-col h-[100vh] justify-center items-center">
        <form className="max-w-md m-auto p-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl text-black font-bold">Entre com sua conta</h2>
          <p className="text-base text-gray mb-4">
            Utilize suas credenciais do SUAP para se autenticar
          </p>

          <ControlledInput
            name="registration"
            control={control}
            label="Matrícula"
            placeholder="Digite sua matrícula"
            type="text"
          />
          <ControlledInput
            name="password"
            control={control}
            label="Senha"
            containerClassName="mt-2"
            placeholder="Digite sua senha"
            type="password"
          />

          <Button
            // isProcessing={isSubmitting}
            className="w-full mt-6"
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
