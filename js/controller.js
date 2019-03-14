MVC.Controller = class Controller {
	constructor(props) {
		this.model = new props.model(props.endpoint);
		this.view = new props.view(props.contentElem);
	}

	//Lista de Contactos
	getAllContacts(){
		this.model.getDataAllContacts()
		.then(data => {
			this.view.allContacts(data);
		})
		.catch(console.log);
	}

	getData () {
		this.model.getPersona()
		.then(data => {
			this.view.notify(data);
		})
		.catch(console.log);
	}

	// TODO: Este metodo debe guardar la informacion enviado del formulario y agregarlo al objeto envios en la propiedad people
	saveData (e) {
		const datos = this.view.getViewData(this.model.modelData);
		
		this.model.savePersona(datos)
		.then(res => {
			if (res.ok) {
				this.view.showMessage("Se guardó tu información, gracias");
				this.view.elem.reset();
				return;
			}
			this.view.showMessage("Algo sucedio, no se guardó correctamente");
		})
		.catch(error => {
			this.view.showMessage(error);
		});
	}
};