import axios from "axios";

export const createMail = (obj) => {
  return axios
    .post("/api/talent/template/", obj)
};

export const editMail = (updateMail, id) => {
  return axios
    .put("/api/talent/template/" + id, updateMail)
};

export const deleteMail = (id) => {
  return axios
    .delete("/api/talent/template/" + id)
};

export const createAccount = (obj) => {
  return axios.post("/api/talent/email/", obj)
};

export const editAccount = (updateAccount, id) => {
  return axios.put("/api/talent/email/" + id, updateAccount)
};

export const deleteAccount = (id) => {
  return axios
    .delete("/api/talent/email/" + id)
};

export const createPublisher = (obj) => {
  return axios
    .post("/api/talent/publisher", obj)
};

export const editPublisher = (updatePublisher, id) => {
  return axios
    .put("/api/talent/publisher/" + id, updatePublisher)
};

export const deletePublisher = (id) => {
  axios
    .delete("/api/talent/publisher/" + id)
};

export const createParticipant = (obj) => {
  return axios
    .post("/api/talent/participant/add", obj)
};

export const createParticipantExcel = (obj) => {
  return axios
    .post("/api/talent/participant/", obj)
};

export const editParticipant = (updateParticipant, id) => {
  return axios
    .put("/api/talent/participant/" + id, updateParticipant)
};

export const deleteParticipant = (id) => {
  return axios
    .delete("/api/talent/participant/" + id)
};

export const login = (user) => {
  return axios.post("/api/talent/login", user)
};

export const emailSend = (obj) => {
  return axios
    .post("api/talent/send-email/", obj)

};

