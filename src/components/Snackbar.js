import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

export default function Snackbar({ message, variant, date }) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (message && variant) {
      setTimeout(() => {
        enqueueSnackbar(message, { variant, preventDuplicate: false });
      })
    }
  });

  return null;
}