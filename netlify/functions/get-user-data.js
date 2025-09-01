export default async (req, context) => {
  const { user } = context.netlify;

  if (!user) {
    return new Response("Acceso no autorizado.", { statusCode: 401 });
  }

  // Lista maestra de todas las unidades de servicio
  const todasLasUnidades = [
      "AMALINA", "KAISHAIPA", "MULAMANA", "OULECHI", 
      "UNIDAD_5", "UNIDAD_6", "UNIDAD_7", "UNIDAD_8", "UNIDAD_9", "UNIDAD_10" 
      
  ];

  // **NUEVA LÓGICA DE ADMIN**
  // Si el usuario tiene el rol 'admin', devolver todas las unidades.
  if (user.app_metadata.roles?.includes('admin')) {
    return Response.json(todasLasUnidades);
  }

  // Si no es admin, buscar sus permisos como antes.
  try {
    const store = await context.blobs.getStore("permissions");
    const leadersData = await store.get("leaders", { type: "json" });
    const assignedUnits = leadersData[user.id] || [];
    return Response.json(assignedUnits);
  } catch (error) {
    return new Response(`Error interno: ${error.message}`, { statusCode: 500 });
  }
};