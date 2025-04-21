
import React, { useState } from 'react';
import { findFirstAvailableRow, markAsSold } from '../../services/googleSheets';

interface Props {
  spreadsheetId: string;
  sheetName: string;
  keyFilePath: string;
}

export default function RegistrarVenta({ spreadsheetId, sheetName, keyFilePath }: Props) {
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleVenta = async () => {
    if (!titulo || !precio) {
      setMensaje('Completa todos los campos');
      return;
    }

    try {
      const ejemplar = await findFirstAvailableRow(spreadsheetId, sheetName, titulo, keyFilePath);
      if (!ejemplar) {
        setMensaje('No hay ejemplares disponibles para este título');
        return;
      }

      await markAsSold(spreadsheetId, sheetName, ejemplar.rowIndex, parseFloat(precio), keyFilePath);
      setMensaje(`Venta registrada. Fila ${ejemplar.rowIndex} marcada como VENDIDO.`);
    } catch (err) {
      console.error(err);
      setMensaje('Error al registrar la venta');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Registrar venta ({sheetName})</h2>
      <input
        type="text"
        placeholder="Título del libro"
        className="border p-2 mb-2 w-full"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio de venta"
        className="border p-2 mb-2 w-full"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <button
        onClick={handleVenta}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Registrar venta
      </button>
      {mensaje && <p className="mt-4 text-sm text-center">{mensaje}</p>}
    </div>
  );
}
