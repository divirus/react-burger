export const checkResponse = async (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };