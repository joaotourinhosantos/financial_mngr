import axios, { AxiosPromise } from "axios"
import { useQuery } from "@tanstack/react-query";
import { TransferData } from "../interface/TransferData";

const apiUrl = 'http://localhost:8080'

const fechData = async (): AxiosPromise<TransferData[]> => {
    const response = axios.get(apiUrl + '/transfer')
    return response;
}

export function useTransferData() {
    const query = useQuery({
        queryFn: fechData,
        queryKey: ['transfer-data'],
        retry: 2
    })

    return {...query, data: query.data?.data};
}