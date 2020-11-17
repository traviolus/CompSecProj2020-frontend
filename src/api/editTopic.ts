import client from "./httpClient";

interface EditData {
  topic_header: string;
  topic_body: string;
}

interface InputData {
  topic_header: string;
  topic_body: string;
  topic_id: string;
}

const editTopic = async (inputData: InputData): Promise<boolean> => {
  const body: EditData = {
    topic_header: inputData.topic_header,
    topic_body: inputData.topic_body,
  };
  return await client
    .patch(`/api/topic/${inputData.topic_id}`, body)
    .then((response) => {
      if (response.status === 200) {
        return true;
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

const deleteTopic = async (topicId: number): Promise<boolean> => {
  return await client
    .delete(`/api/topic/${topicId}`)
    .then((response) => {
      if (response.status === 200) {
        return true;
      }
      throw Error(response.toString());
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 403) {
          alert("You are not admin!");
        }
        return false;
      }
      throw error;
    });
};

export { editTopic, deleteTopic };
