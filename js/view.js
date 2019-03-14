MVC.View = class View {
	constructor(elem) {
		this.eventHandler();
		this.elem = elem;
	}

	allContacts(data) {
		const onLoadDataContacts = new CustomEvent("onLoadDataContacts", { detail: data , bubbles: true });
		this.elem.dispatchEvent(onLoadDataContacts);
		
	}
	
	eventHandler () {
		document.body.addEventListener('onLoadData', (event) => {
			this.updateView(event.detail);
		});
	}

	notify (data) {
		const onLoadData = new CustomEvent("onLoadData", { detail: data , bubbles: true });
		this.elem.dispatchEvent(onLoadData);
	}

	updateView (datos) {
		for (let key in datos) {
			this.runCurrentIteration(key, datos, function (value, elem, prop) {
				elem[prop] = value;
			}, 'key');
		}
	}

	getViewData(model) {
		const updatedModel = {};

		for (let key in model) {
			this.runCurrentIteration(key, model, function (value) {
				updatedModel[key] = value;
			});
		}

		return updatedModel;
	}

	runCurrentIteration (key, model, callbackResult, valueField) {
		const nodeFields = this.elem.querySelectorAll(`[name='${key}']`);

		if (nodeFields.length > 1) {
			const fields = Array.from(nodeFields)

			const correctField = fields.find(elem => {
				return elem.value === model[key];
			});

			let value = correctField.value
			if(valueField === 'key') {
				value = model[key]
			}

			callbackResult(value, correctField, "checked");
		} else if (nodeFields.length > 0) {

			let value = nodeFields[0].value
			if(valueField === 'key') {
				value = model[key]
			}

			callbackResult(value, nodeFields[0], "value");
		}
	}

	showMessage (msg) {
		alert(msg);
	}
};