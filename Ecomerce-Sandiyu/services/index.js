let productos = [];
export async function obtenerProductos() {
  try {
    const response = await fetch(
      "https://api.mockfly.dev/mocks/722c2b1e-dc00-4c4f-bc4f-2f677336ffa2/IsteaSandiyuPrueba"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    productos = await response.json();
    return productos;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export function getProductos() {
  return productos;
}
