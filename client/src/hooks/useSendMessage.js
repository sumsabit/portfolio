import { useMutation } from '@tanstack/react-query';
import api from '../api/client';

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (data) => api.post('/messages', data),
  });
};
