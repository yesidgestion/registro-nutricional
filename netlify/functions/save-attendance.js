//save-attendance.js

export default async (req, context) => {
  const { user } = context.netlify;

  // Proteger la función: solo usuarios logueados pueden guardar datos.
  if (!user) {
    return new Response("Acceso no autorizado.", { statusCode: 401 });
  }

  try {
    const data = await req.json();

    // Usar la fecha y la unidad de servicio para crear un nombre de archivo único.
    const date = new Date(data.submissionDate).toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const fileName = `${data.serviceUnit}-${date}-${user.id}.json`;

    // Guardar los datos en un nuevo almacén llamado "registros"
    await context.blobs.setJSON(`registros/${fileName}`, data);

    return Response.json({ message: "Datos guardados con éxito" });

  } catch (error) {
    return new Response(`Error al guardar los datos: ${error.message}`, { statusCode: 500 });
  }
};