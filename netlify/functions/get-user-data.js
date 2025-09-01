export default async (req, context) => {
  // Log de diagnóstico #1: El objeto de contexto completo
  console.log("--- Objeto context ---");
  console.log(context);

  // Log de diagnóstico #2: Las cabeceras (headers) de la solicitud
  // Aquí veremos si la cabecera "Authorization" está llegando.
  console.log("--- Cabeceras (headers) de la solicitud ---");
  console.log(req.headers);

  // Verificamos si el usuario fue decodificado por Netlify
  if (context.netlify?.user) {
    console.log("--- ¡ÉXITO! Usuario decodificado correctamente ---");
    console.log(context.netlify.user);
    
    // Si el usuario existe, devolvemos un mensaje de éxito para la prueba
    return Response.json({
      message: "¡Autenticación exitosa!",
      user: context.netlify.user
    });

  } else {
    console.log("--- ¡FALLO! context.netlify.user no existe ---");
    
    // Si el usuario no existe, devolvemos un mensaje de error claro
    return new Response("Falló la autenticación. El objeto context.netlify.user no fue encontrado en el servidor.", {
      status: 401
    });
  }
};