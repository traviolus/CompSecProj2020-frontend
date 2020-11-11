import client from "./httpClient"

interface Response {
  topic_id: number;
  topic_user: string;
  topic_header: string;
  topic_body: string;
  topic_createdtime: string;
  topic_lastmodified?: string;
}

const allTopics = async (): Promise<Array<Response>> => {
  return await client
  .get("api/topic/")
  .then((response) => {
    if (response.status === 200) {
      return response.data;
    }
    throw Error(response.toString());
  })
  .catch((error) => {
    if (error.response) {
      return false;
    }
    throw error;
  });
};

export default allTopics;