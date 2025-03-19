const fs = require('fs');
const path = require('path');

// Función para obtener los archivos de una carpeta
function listFiles(dir) {
  return fs.readdirSync(dir).filter(file => fs.statSync(path.join(dir, file)).isFile());
}

// Función para crear un listado de archivos
function generateFileList() {
  const folders = ['sierra', 'calasparra']; // Las carpetas que quieres listar

  folders.forEach(folder => {
    const files = listFiles(path.join(__dirname, folder)); // Obtener archivos en la carpeta
    let html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Archivos de ${folder}</title>
    </head>
    <body>
        <h1>Archivos de ${folder}</h1>
        <ul>
    `;

    files.forEach(file => {
      html += `<li><a href="${folder}/${file}">${file}</a></li>`;
    });

    html += `
        </ul>
        <a href="index.html">Volver al inicio</a>
    </body>
    </html>
    `;

    // Guardar el archivo HTML generado en la carpeta correspondiente
    fs.writeFileSync(path.join(__dirname, folder, 'index.html'), html);
  });
}

// Ejecutar la generación del listado
generateFileList();
