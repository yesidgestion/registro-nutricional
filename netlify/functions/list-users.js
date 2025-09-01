// Archivo: netlify/functions/list-users.js

export default async (req, context) => {
    const { user } = context.netlify;

    // 1. **Verificación de Seguridad:** ¿El usuario tiene el rol de 'admin'?
    if (!user || !user.app_metadata.roles?.includes('admin')) {
        return new Response("Acceso denegado: Se requieren permisos de administrador.", { statusCode: 403 });
    }

    // 2. **Lógica de la Función (si es admin):**
    try {
        // Este token da permiso a la función para hablar con la API de Netlify
        const adminAuthToken = context.netlify.identity.token;

        const response = await fetch(`https://registro-nutricional.netlify.app/.netlify/identity/admin/users`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${adminAuthToken}` }
        });

        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de usuarios.');
        }

        const { users } = await response.json();
        return Response.json(users);

    } catch (error) {
        return new Response(error.message, { statusCode: 500 });
    }
};