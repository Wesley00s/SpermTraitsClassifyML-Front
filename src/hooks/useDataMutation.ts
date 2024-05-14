import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SpermData } from "./interfaces/sperm-data";

const postData = async (data: SpermData) => {
    try {
        const dataToSend = { ...data };

        const response = await axios.post("https://app-cz7upoyahq-uc.a.run.app/api/bulls", dataToSend);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export function useDataMutation() {
    const { mutate: isSuccess, isError } = useMutation({
        
        mutationFn: async (data: SpermData) => {
        
      
            const dataToSend = { ...data };
    
            await postData(dataToSend)
        }
    })

    const handleMutation = async (data: SpermData) => {
        try {
            const dataToSend = { ...data };

            const response = await postData(dataToSend);
            console.log("Resposta da requisição:", response);
            return response;
        } catch (error) {
            console.error("Erro na requisição:", error);
            throw error
        }
    };

    return {
        mutate: handleMutation, 
        isSuccess,
        isError
    }
}