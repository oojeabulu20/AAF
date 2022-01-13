import http from "../http-common";

class AnimalDataService {
  getAll() {
    return http.get("/pets");
  }

  get(id) {
    return http.get(`/pets/${id}`);
  }

  create(data) {
    return http.post("/pets", data);
  }

  update(id, data) {
    return http.put(`/pets/${id}`, data);
  }

  delete(id) {
    return http.delete(`/pets/${id}`);
  }

  deleteAll() {
    return http.delete(`/pets`);
  }

  findByName(name) {
    return http.get(`/pets?name=${name}`);
  }
}

export default new AnimalDataService();