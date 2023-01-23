import server from "../../config/server";

export async function login(
  email: string,
  password: string,
  callback: (data: any) => void
) {
  const response = await server.post("/auth/login", {
    email,
    password,
  });
  const data = response.data;
  callback(data);
}

export async function signin(
  email: string,
  password: string,
  callback: (data: any) => void
) {
  const response = await server.post("/auth/signin", {
    email,
    password,
  });
  const data = response.data;
  callback(data);
}

export async function logout(callback: () => void) {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("rank");
  localStorage.removeItem("id");
  localStorage.removeItem("email");
  callback();
}

export async function setProfilPicture(
  email: string,
  picture: string,
  token: string
) {
  const response = await server.post(
    "/auth/setProfilPicture",
    {
      email,
      picture,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = response.data;
  return data;
}
