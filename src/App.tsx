import { useState } from 'react'
import './App.css'
import Inputs from './components/input'
import { Button, Stack } from '@chakra-ui/react'
import { useDataMutation } from './hooks/useDataMutation'
import { useForm } from 'react-hook-form'

const App = () => {
  const { mutate }= useDataMutation()
  const [responseMessage, setResponseMessage] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSending, setIsSending] = useState<boolean>(false);


  const onSubmit = async (data: any) => {
    try {
      
      const def_mai_percent: number = parseFloat(data.def_mai_percent);
        const normais_percent: number = parseFloat(data.normais_percent);

      let def_men_percent = 100;
      def_men_percent -=  (def_mai_percent + normais_percent)

      const def_mai = 200 * (def_mai_percent / 100);
      const normais = 200 * (normais_percent / 100);
      const def_men = 200 - (def_mai + normais);

      const zptz_totais = data.zptz_106 * data.volume;

      const dataToSend = { ...data,
          def_men_percent: def_men_percent,
          zptz_totais: zptz_totais,
          def_men: def_men
      };

      setIsSending(true);
      const response = await mutate(dataToSend);
      
      if (response && response.message) {
        setResponseMessage(response.message);
      } else {
        setResponseMessage('Resposta recebida com sucesso.');
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setResponseMessage('Erro ao processar a requisição.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    
    <div className="container">

      <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className='title'>Avaliar aptidão reprodutiva de touros Guzerá</h1>


        <div className="inputs">
        <div className="param-amb box">
          <div className="div-title">
            <h2 className="title-box">
              Parâmetros ambientais
            </h2>
          </div>
 
          <Inputs
              label="Temp. amb. (°C) "
              name="temp_amb"
              placeholder="0.0"
              register={register}
              required
              error={errors.temp_amb && "Temp. Amb. obrigatória*"}
            />

            <Inputs
              label="Umidade (%)"
              name="umidade"
              placeholder="0.0"
              register={register}
              required
              error={errors.umidade && "Umidade obrigatória*"}
            />

        </div>

        <div className="param-fisio box">
          <div className="div-title">
            <h2 className="title-box">
              Parâmetros fisiológicos
            </h2>
          </div>
       
          <Inputs
              label="Temp. ret. (°C)"
              name="temp_retal"
              placeholder="0.0"
              register={register}
              required
              error={errors.temp_retal && "Temp. Ret. obrigatória*"}
          />

          <Inputs
            label="Mov. flanco (min)"
            name="mov_flanco"
            placeholder="0.0"
            register={register}
            required
            error={errors.mov_flanco && "Mov. Flanco obrigatório*"}
          />
        </div>

        <div className="para-sem box">
          <div className="div-title">
            <h2 className="title-box">
              Parâmetros seminais
            </h2>
          </div>

          <Inputs
              label="CE"
              name="ce"
              placeholder="0.0"
              register={register}
              required
              error={errors.ce && "CE obrigatório*"}
            />

          <Inputs
            label="Volume (ml)"
            name="volume"
            placeholder="0.0"
            register={register}
            required
            error={errors.volume && "Volume obrigatório*"}
          />

          <Inputs
            label="Mot. (% Moveis)"
            name="mot_moveis"
            placeholder="0.0"
            register={register}
            required
            error={errors.mot_moveis && "Mot. Moveis obrigatória*"}
          />

          <Inputs
            label="Vigor (MIP)"
            name="vigor"
            placeholder="0.0"
            register={register}
            required
            error={errors.vigor && "Vigor obrigatório*"}
          />

          <Inputs
            label="Zptz 10⁶"
            name="zptz_106"
            placeholder="0.0"
            register={register}
            required
            error={errors.zptz_106 && "Zptz 10⁶ obrigatório*"}
          />


          <Inputs
            label="Normais (%)"
            name="normais_percent"
            placeholder="0.0"
            register={register}
            required
            error={errors.normais_percent && "Normais% obrigatório*"}

          />

        <Inputs
            label="Normais"
            name="normais"
            placeholder="0.0"
            register={register}
            required
            error={errors.normais && "Normais obrigatório*"}

          />

          <Inputs
            label="Def. Mai. (%)"
            name="def_mai_percent"
            placeholder="0.0"
            register={register}
            required
            error={errors.def_mai_percent && "Def. Mai.% obrigatório*"}
          />


          <Inputs
            label="Def. Mai."
            name="def_mai"
            placeholder="0.0"
            register={register}
            required
            error={errors.def_mai && "Def. Mai. obrigatório*"}
          />
          
         
          <Inputs
            label="Turbilão"
            name="turbilhao"
            placeholder="0.0"
            register={register}
            required
            error={errors.idade && "Turbulão obrigatório*"}
          />

        </div>



        <div className="outros box">
          <div className="div-title">
            <h2 className="title-box">
              Outros parâmetros
            </h2>
          </div>
        
          <Inputs
              label="Idade (Meses)"
              name="idade"
              placeholder="0.0"
              register={register}
              required
              error={errors.idade && "Idade obrigatória*"}
            />

            <Inputs
              label="Peso (Kg)"
              name="peso"
              placeholder="0.0"
              register={register}
              required
              error={errors.peso && "Peso obrigatório*"}
            />

            <Inputs
              label="EC"
              name="ec"
              placeholder="0.0"
              register={register}
              required
              error={errors.ec && "EC obrigatório*"}
            />

          </div>
        </div>
      
          
          <div className="response-box">
         

            <div className="box-response">
            {isSending ? (
                <Stack direction='row' margin={5}>
                  <Button
                    isLoading
                    loadingText='Enviando dados'
                    colorScheme='teal'
                    variant='outline'
                  >
                    Enviando dados
                  </Button>
                </Stack>
              ) : (
                <Button
                  type="submit"
                  size='md'
                  height='48px'
                  width='auto'
                  border='2px'
                  borderColor='green.500'
                  margin={5}
                >
                  Enviar dados
                </Button>
              )}
            </div>

            <div className="div-title">
              <h2 className='waiting'>Aguardando resposta...</h2>
            </div>
           
              <div className="response-container">
                
                  <p className="response">
                    {responseMessage}
                  </p>
              </div>
          </div>
      </form>
    </div>
  )
}

export default App


