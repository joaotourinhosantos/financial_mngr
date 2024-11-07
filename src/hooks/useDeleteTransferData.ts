import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosPromise } from 'axios';

const apiUrl = 'http://localhost:8080'

const deleteTransfer = async (id: number): AxiosPromise<any> => {
  const response = axios.delete(apiUrl + `/transfer/${id}`)
    return response;
};

export function useDeleteTransfer() {
  const queryClient = useQueryClient();

  const mutate = useMutation( {
    mutationFn: deleteTransfer,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['transfer-data']});
    }
  });

  return mutate
}
