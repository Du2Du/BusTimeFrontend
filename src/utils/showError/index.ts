import { toast } from "react-hot-toast";
/**
 * Essa função serve para retornar os erros de alguma requisição
 *
 * @param errors Esse param recebe o objeto de error.
 *
 * @author Du2Du
 */
export const showError = (errors: any) => {
  if (errors?.isCanceled || !errors) return;
  const {
    response: {
      data: { message },
    },
  } = errors;
  if (message) {
    return toast.error(message);
  }
  toast.error("Não foi possível fazer isso no momento");
};
