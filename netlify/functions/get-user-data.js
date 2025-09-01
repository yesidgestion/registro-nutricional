export default async (req, context) => {
  // VERIFICACIÓN AÑADIDA: Asegurarse de que el visitante está autenticado.
  // Si context.netlify no existe, significa que no hay sesión.
  if (!context.netlify?.user) {
    return new Response("Acceso no autorizado: se requiere autenticación.", {
      statusCode: 401,
    });
  }

  // Esta línea ahora es segura porque ya verificamos que user existe.
  const { user } = context.netlify;

  // Lista maestra de todas las unidades de servicio
  const todasLasUnidades = [
    "AMALINA", "KAISHAIPA", "MULAMANA", "OULECHI",
    "UNIDAD_5", "UNIDAD_6", "UNIDAD_7", "UNIDAD_8", "UNIDAD_9", "UNIDAD_10"
  ];

  // Si el usuario tiene el rol 'admin', devolver todas las unidades.
  if (user.app_metadata.roles?.includes('admin')) {
    return Response.json(todasLasUnidades);
  }

  // Si no es admin, buscar sus permisos.
  try {
    const store = await context.blobs.getStore("permissions");
    const leadersData = await store.get("leaders", { type: "json" });
    const assignedUnits = leadersData[user.id] || [];
    return Response.json(assignedUnits);
  } catch (error) {
    return new Response(`Error interno: ${error.message}`, { statusCode: 500 });
  }
};