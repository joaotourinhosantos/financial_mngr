import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TransferData } from "../interface/TransferData";

const apiUrl = 'http://localhost:8080'

const postData = async (data: TransferData): AxiosPromise<any> => {
    const response = axios.post(apiUrl + '/transfer', data)
    return response;
}

export function useTransferDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transfer-data'] })
        }
    })

    return mutate;
}