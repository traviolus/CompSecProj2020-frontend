import client from "./httpClient";

interface EditData {
  topic_header: string;
  topic_body: string;
}

const editTopic = async (editData: EditData): Promise<boolean> => {
  const body = editData
  return await client
    .patch(`/api/topic/${editData}`, body)
    .then((response) => {
      if (response.status === 200) {
        return true;
      }
      throw Error(response.toString());
    })
    .catch((error) => {
      if (error.response) {
        return false
      }
      throw error;
    })
};

export default editTopic;