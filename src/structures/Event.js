module.exports = class Event {
  cunstructor(name, options) {
    this.client = null;

    this.name = name;
    this.emmiter = options.emmiter;
    this.event = options.event;
    this.type = options.type;
  }

  exec() {}
};
