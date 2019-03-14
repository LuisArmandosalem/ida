MVC.Model = class Persona {
	constructor(endpoint) {
		this.endpoint = endpoint;
		this.modelData = {};
	}

	getDataAllContacts () {
		return fetch(`${this.endpoint}/contactos`)
		.then(resp => {
			if (resp.ok) {
				return resp.json();
			}
			
			return Error("No se pudieron obtener los datos");
		})
	}

	getPersona () {
		return fetch(`${this.endpoint}/contactos`)
		.then(resp => {
			if (resp.ok) {
				return resp.json();
			}
			
			return Error("No se pudieron obtener los datos");
		})
		.then(data => {
			this.setModelo(data);
			return data;
		})
	}

	setModelo(data) {
		for (let key in data) {
			this.modelData[key] = data[key];
		}
	}

	savePersona (data) {
		return fetch(`${this.endpoint}/guardar`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers:{ 'Content-Type': 'application/json' }
		});
	}
};


/** @TODO: Almacenar las personas que enviamos desde el formuario e imprimirlo en la consola
class Envios {
	constructor() {
		this.people = []
	}
} */