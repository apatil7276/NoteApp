import { useState,useEffect } from "react";
import axios from "axios";
const useRequestData = (method, url, body) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);
  
    useEffect(() => {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const resp = await axios({
            method: method,
            url: url,
            data: body
          });
          const data = await resp?.data;
  
         return (setApiData(data),
          setIsLoading(false))
        } catch (error) {
          setServerError(error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    },[]);
  
    return { isLoading, apiData, serverError };
  };
  export default useRequestData;