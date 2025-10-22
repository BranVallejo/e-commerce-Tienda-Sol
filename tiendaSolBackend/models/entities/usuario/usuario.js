export class Usuario {
  nombre;
  email;
  telefono;
  fechaAlta;

  constructor(nombre, email, telefono) {
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.fechaAlta = new Date();
  }

  getNombre() {
    return this.nombre;
  }

  getId() {
    return this.id;
  }

  setId(new_id) {
    this.id = new_id;
  }
}
