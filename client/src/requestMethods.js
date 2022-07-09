import axios from "axios";

const BASE_URL = "http://localhost:4444/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
/* const TOKEN = currentUser?.accessToken; */
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzU0ODdlZDE2MzcwZDNjYmExZDljMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzI2ODc3NywiZXhwIjoxNjU3NTI3OTc3fQ.O4FaeY597dL78GXvw5ENZiPJKtLF_bMIwPW75TEI_sc";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `${TOKEN}` },
});