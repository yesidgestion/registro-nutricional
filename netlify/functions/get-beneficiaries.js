export default async (req, context) => {
  // 1. Obtiene el nombre de la unidad de la URL.
  // Ejemplo de URL: /.netlify/functions/get-beneficiaries?unit=amalina
  const unitName = new URL(req.url).searchParams.get("unit");

  if (!unitName) {
    return new Response("Falta el parámetro 'unit' en la solicitud.", { statusCode: 400 });
  }

  try {
    // 2. Accede al almacén de blobs llamado "beneficiaries".
    const store = await context.blobs.getStore("beneficiaries");

    // 3. Lee el archivo JSON correspondiente a la unidad solicitada (ej: "amalina.json").
    // Se convierte el nombre a minúsculas para coincidir con el nombre del archivo.
    const beneficiaries = await store.get(`${unitName.toLowerCase()}.json`, { type: "json" });

    if (!beneficiaries) {
         return new Response(`No se encontraron datos para la unidad: ${unitName}`, { statusCode: 404 });
    }
    
    // 4. Devuelve la lista de beneficiarios en formato JSON.
    return Response.json(beneficiaries);

  } catch (error) {
    // Esto podría ocurrir si el archivo no existe.
    return new Response(`No se pudieron cargar los datos para la unidad: ${unitName}.`, { statusCode: 404 });
  }
};