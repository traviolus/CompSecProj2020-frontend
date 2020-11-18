import client from "./httpClient";

interface CommentsResponse {
  comment_id: number;
  comment_user: string;
  comment_text: string;
  comment_createdtime: string;
  comment_topic: number;
}

const getCommentById = (commentId: string): Promise<CommentsResponse> => {
  return client.get(`/api/comment/${commentId}/`).then((response) => {
    if (response.status === 200) {
      return response.data;
    }

    throw Error(response.toString());
  });
};

const editComment = (
  commentId: string,
  comment_text: string
): Promise<boolean> => {
  return client
    .patch(`/api/comment/${commentId}/`, { comment_text })
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

export { editComment, getCommentById };
