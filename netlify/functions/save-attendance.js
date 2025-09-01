export default async (req, context) => {
  // Se eliminó la verificación de usuario para permitir envíos anónimos.
  try {
    const data = await req.json();
    
    // El nombre del archivo ahora es más simple
    const date = new Date(data.submissionDate).toISOString().split('T')[0];
    const fileName = `${data.serviceUnit}-${date}-registro.json`;
    
    // Guardar los datos en el almacén "registros"
    await context.blobs.setJSON(`registros/${fileName}`, data);
    
    return Response.json({ message: "Datos guardados con éxito" });

  } catch (error) {
    return new Response(`Error al guardar los datos: ${error.message}`, { status: 500 });
  }
};