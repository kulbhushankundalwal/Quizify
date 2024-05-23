import Poll from "../models/poll.js";
import CrudRepository from "./crud-repository.js";

class PollRepository extends CrudRepository {
  constructor() {
    super(Poll);
  }
}

export default PollRepository;
