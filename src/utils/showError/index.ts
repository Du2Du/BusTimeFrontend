import { toast } from "react-hot-toast";
/**
 * Essa função serve para retornar os erros de alguma requisição
 *
 * @param errors Esse param recebe o objeto de error.
 *
 * @author Du2Du
 */
export const showError = (error: any) => {
  if (error?.isCanceled || !error) toast.error("Não foi possível fazer isso no momento");
  const {
    response: {
      data: { message, errors },
    },
  } = error;
  if (!errors) return toast.error("Não foi possível fazer isso no momento");
  if (errors.length > 0) return toast.error(errors[0]);
  if (message) {
    return toast.error(message);
  }
  toast.error("Não foi possível fazer isso no momento");
};
