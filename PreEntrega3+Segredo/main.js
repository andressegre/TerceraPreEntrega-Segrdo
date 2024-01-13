const storageManager = {
    guardarEnStorage: function (clave, valor) {
        const valorJSON = JSON.stringify(valor);
        localStorage.setItem(clave, valorJSON);
    },
    recuperarDeStorage: function (clave) {
        const valorJSON = localStorage.getItem(clave);
        return valorJSON ? JSON.parse(valorJSON) : null;
    },
};

function capturarEntradas() {
    const monto = parseFloat(document.getElementById("monto").value);
    const tasa = parseFloat(document.getElementById("tasa").value);
    const plazo = parseInt(document.getElementById("plazo").value);

    return { monto, tasa, plazo };
}

function calcularPrestamo() {
    const { monto, tasa, plazo } = capturarEntradas();

    if (isNaN(monto) || isNaN(tasa) || isNaN(plazo) || monto <= 0 || tasa <= 0 || plazo <= 0) {
        alert("Por favor, ingrese valores válidos para el monto, la tasa y el plazo.");
        return;
    }

    const tasaInteresMensual = tasa / 100 / 12;
    const cuotaMensual = (monto * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -plazo));
    const totalPrestamo = cuotaMensual * plazo;

    mostrarResultado(cuotaMensual, totalPrestamo);
}

function mostrarResultado(cuotaMensual, totalPrestamo) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `<p>Cuota Mensual: ${cuotaMensual.toFixed(2)} </p><p>Total a Pagar: ${totalPrestamo.toFixed(2)}</p>`;

    storageManager.guardarEnStorage("ultimaCuota", cuotaMensual);
    storageManager.guardarEnStorage("totalPrestamo", totalPrestamo);
}

window.onload = function () {
    const ultimaCuota = storageManager.recuperarDeStorage("ultimaCuota");
    const totalPrestamo = storageManager.recuperarDeStorage("totalPrestamo");

    if (ultimaCuota && totalPrestamo) {
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = `<p>Última Cuota Mensual: ${ultimaCuota.toFixed(2)}</p><p>Total Pendiente: ${totalPrestamo.toFixed(2)}</p>`;
    }
};
