import client from "./httpClient"

interface props {
    topic_header: string;
    topic_body: string;
}

const post = async (postData: props) : Promise<boolean> => {
    const body = postData;
    return await client
    .post("api/post/", body)
    .then((response) => {
        console.log(response);
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

export default post;