const form = document.getElementById('frmPropina');
const inputF = document.getElementById('inputFactura');
const selectInput = document.getElementById('selectForm');

const errorInput = document.getElementById('error');

let small = document.querySelector('.invalid-feedback small');

inputF.addEventListener('input', function() {
	let value = parseFloat(inputF.value.trim());
	if (isNaN(value)) {
		small.innerText = 'El Total de la Factura es requerido.';
	} else if (value <= 0) {
		small.innerText = 'El Valor debe ser mayor a cero.';
	} else {
		small.innerText = '';
	}
});

form.addEventListener('submit', function(e) {
	e.preventDefault();
	if (validateFrm()) {
		calcularPropina();
		
		form.reset();
	}
	
});

function validateFrm() {
	let valid = true;

	const numComensales = document.getElementById('inputPeople');
	const totalCuenta = document.getElementById('inputFactura');
	const calificacion = document.getElementById('selectForm');

	let small = document.querySelector('.invalid-feedback small');

	// --- Validate Num Comensales ---

	if (numComensales.value === '') {
		alert('No haz introducido ningun comensal, se asumira el nro de personas igual a 1.')
		numComensales.value = 1;
		valid = false;
	} else if (numComensales.value < 0) {
		alert('El número de Comensales debe ser mayor a cero.')
		valid = false;
	}  else {
		showSuccess(numComensales);
	}

	// --- Validate Total Factura ---

	if (totalCuenta.value <= 0) {
		alert('La Factura debe ser mayor que cero.');
		document.getElementById('inputFactura').focus();
		valid = false;
	} else {
		showSuccess(totalCuenta);
		totalCuenta.classList.remove('border-danger');
	}

	// --- Validate Calificacion ---

	if (calificacion.value === '') {
		showError(calificacion, 'Debe seleccionar una Calificación.')
		document.getElementById('selectForm').focus();
		valid = false;
	} else {
		showSuccess(calificacion);
	}

	return valid;
}

function calcularPropina() {

	const numComensales = parseInt(document.getElementById('inputPeople').value);
	const totalCuenta = parseFloat(document.getElementById('inputFactura').value);
	const calificacion = document.getElementById('selectForm').value;

	let porcentajePropina;

	if (calificacion === 'horrible') {
		porcentajePropina = 0;
	} else if (calificacion === 'aceptable') {
		porcentajePropina = 0.05;
	} else if (calificacion === 'genial') {
		porcentajePropina = 0.1;
	}

	let propinaPersona = (totalCuenta * porcentajePropina) / numComensales;

	if (propinaPersona < 0.5) {
		propinaPersona = 0.5;
	}

	alert('La propina por Comensal es: ' + propinaPersona.toFixed(2) + ' €');
}

function showError(input, mensaje) {
	const inputFrm = input.parentElement;
	inputFrm.classList.add('error');

	const small = inputFrm.querySelector('small');
	small.innerText = mensaje;

}

function showSuccess(input) {
	const inputFrm = input.parentElement;
	inputFrm.classList.remove('error');
	inputFrm.classList.add('success');

	input.classList.remove('text-danger', 'border-bottom', 'border-danger'); // , 'input-danger'
}

function isPositiveInteger(value) {
	return /^\d+$/.test(value);
}

function isPositiveNumber(value) {
	return /^\d*\.?\d+$/.test(value);
}