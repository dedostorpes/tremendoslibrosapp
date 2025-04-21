import React, { useState } from 'react';
import RegistrarVenta from './pages/RegistrarVenta';

const SPREADSHEET_ID = '1ujQDnb0cZvRA3uq_WJGr0R-f7Jn-nW5uqhtAhViHiX8'; // ← reemplazar por el real

function App() {
  const [sheetName, setSheetName] = useState('Stock');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Tremendos Libros</h1>
      <div className="mb-4">
        <label className="mr-2">Seleccionar hoja:</label>
        <select
          className="p-2 border rounded"
          value={sheetName}
          onChange={(e) => setSheetName(e.target.value)}
        >
          <option value="Stock">Stock</option>
          <option value="Pedidos">Pedidos</option>
          <option value="Ventas">Ventas</option>
        </select>
      </div>
      <RegistrarVenta spreadsheetId={SPREADSHEET_ID} sheetName={sheetName} />
    </div>
  );
}

export default App;
