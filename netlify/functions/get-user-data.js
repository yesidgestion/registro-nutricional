export default async (req, context) => {
  // 1. Obtiene el usuario que está haciendo la solicitud.
  const { user } = context.netlify;

  // 2. Si no hay un usuario autenticado, devuelve un error.
  if (!user) {
    return new Response("Acceso no autorizado.", { statusCode: 401 });
  }

  try {
    // 3. Accede al almacén de blobs llamado "permissions".
    const store = await context.blobs.getStore("permissions");

    // 4. Lee el archivo "leaders.json" del almacén.
    const leadersData = await store.get("leaders", { type: "json" });

    // 5. Busca en los datos las unidades asignadas al ID del usuario actual.
    // En producción, usarías user.id que Netlify Identity te proporciona.
    // Para la prueba, usamos el ID de marcador de posición.
    const assignedUnits = leadersData[user.id] || leadersData["yeinis-rico-placeholder-id"] || [];

    // 6. Devuelve la lista de unidades de servicio en formato JSON.
    return Response.json(assignedUnits);

  } catch (error) {
    return new Response(`Error interno del servidor: ${error.message}`, { statusCode: 500 });
  }
};