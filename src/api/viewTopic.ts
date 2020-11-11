import client from "./httpClient";

interface TopicResponse {
  topic_id: number;
  topic_user: string;
  topic_header: string;
  topic_body: string;
  topic_createdtime: string;
  topic_lastmodified?: string;
}

interface CommentsResponse {
  comment_id: number;
  comment_user: string;
  comment_text: string;
  comment_createdtime: string;
  comment_topic: number;
}

const getTopicById = async (topicId: string): Promise<TopicResponse> => {
  return await client
    .get(`api/topic/${topicId}/`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      throw Error(response.toString());
    })
    .catch((error) => {
      throw error;
    });
};

const getCommentsByTopicId = async (
  topicId: string
): Promise<Array<CommentsResponse>> => {
  const params = { topic: topicId };
  return await client
    .get(`api/comment/`, { params })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      throw Error(response.toString());
    })
    .catch((error) => {
      throw error;
    });
};

export { getTopicById, getCommentsByTopicId };
