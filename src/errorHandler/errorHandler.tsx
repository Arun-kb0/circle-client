import axios from "axios";
import { toast } from "react-toastify";

const errorHandler = (error: any) => {
  let message :string
  if (axios.isAxiosError(error)) {
    if (error.response) {
      message = `Error: ${error.response.data.message || 'Something went wrong'}`
    } else if (error.request) {
      message = 'No response from server'
    } else {
      message = `Error: ${error.message}`
    }
  } else if (error instanceof Error) {
    message = error.message
  } else {
    message = 'unexpected error occurred'
  }
  
  toast.error(message);
  return message
}

export default errorHandler