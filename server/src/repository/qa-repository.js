import QA from "../models/qa.js";
import CrudRepository from "./crud-repository.js";

class QaRepository extends CrudRepository {
  constructor() {
    super(QA);
  }
}

export default QaRepository;
