import server from "../../config/server";

export async function getPosts(callback: (data: any) => void) {
  const response = await server.get("/post");
  const data = response.data;
  callback(data);
}

export async function createPost(
  content: string,
  images: string[],
  token: string,
  callback: (data: { message: string }) => void
) {
  const data = await server.post(
    "/post/create-post",
    {
      content,
      images,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  callback(data.data);
}

export async function deletePost(
  id: number,
  token: string,
  callback: () => void
) {
  await server.post(
    "/post/delete-post",
    {
      id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  callback();
}

export async function editPost(
  id: number,
  content: string,
  images: string[],
  token: string,
  callback: (data: { message: string }) => void
) {
  const data = await server.post(
    "/post/update-post",
    { id, content, images },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  callback(data.data);
}

export async function likePost(
  id: number,
  token: string,
  callback: (data: { message: string }) => void
) {
  const data = await server.post(
    "/post/like-post",
    { id, token },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  callback(data.data);
}
