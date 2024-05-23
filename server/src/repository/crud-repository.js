class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (e) {
      console.log("from crud repo", e.message);
      throw e;
    }
  }
  async destory(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result;
    } catch (e) {
      console.log("from crud repo", e.message);
      throw e;
    }
  }
  async get(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (e) {
      console.log("from crud repo", e.message);
      throw e;
    }
  }

  async update(id, data) {
    try {
      const result = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return result;
    } catch (e) {
      console.log("from crud repo", e.message);
      throw e;
    }
  }
}

export default CrudRepository;
