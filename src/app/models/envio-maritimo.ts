// src/app/models/envio-maritimo.ts
export interface EnvioMaritimo {
    envioMaritimoID: number;
    clienteID: number;
    productoID: number;
    cantidadProducto: number;
    fechaRegistro: Date;
    fechaEntrega: Date;
    puertoID: number;
    precioEnvio: number;
    numeroFlota: string;
    numeroGuia: string;
    // Puedes incluir las relaciones si las necesitas, como Cliente, Producto, Puerto
  }
  