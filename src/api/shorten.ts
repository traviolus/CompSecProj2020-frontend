import client from "./httpClient"

interface props {
  link_original: string,
}

const shorten = async ( url: props) : Promise<string> => {
  const body = url;
  return await client
  .post("api/link/", body)
  .then((response) => {
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    throw Error(response.toString());
  })
  .catch((error) => {
    if (error.response.status === 400) {
      return "incorrect" ;
    } else if (error.response) {
      return "";
    }
    throw error;
  });
};

export default shorten;