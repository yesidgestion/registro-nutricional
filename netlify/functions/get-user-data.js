export default async (req, context) => {
  // Ya no hay verificación de usuario. Se devuelve la lista a todo el mundo.
  const todasLasUnidades = [
    "AMALINA", "KAISHAIPA", "MULAMANA", "OULECHI",
    "UNIDAD_5", "UNIDAD_6", "UNIDAD_7", "UNIDAD_8", "UNIDAD_9", "UNIDAD_10"
  ];

  return Response.json(todasLasUnidades);
};