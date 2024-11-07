import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosPromise } from 'axios';

const apiUrl = 'http://localhost:8080'

const updateTransfer = async (id: number, type: string, value: string): AxiosPromise<any> => {
  const response = axios.put(apiUrl + `/transfer/${id}`, {
    type,
    value
  })
    return response;
};

export function useUpdateTransfer() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: ({ id, type, value }: { id: number; type: string; value: string }) =>
      updateTransfer(id, type, value),
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transfer-data'] });
    },
  });

  return mutate
}
