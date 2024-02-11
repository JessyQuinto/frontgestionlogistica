export interface EnvioTerrestre {
    envioTerrestreID: number;
    clienteID: number;
    productoID: number;
    cantidadProducto: number;
    fechaRegistro: Date;
    fechaEntrega: Date;
    bodegaID: number;
    precioEnvio: number;
    placaVehiculo: string;
    numeroGuia: string;
    // Si necesitas las relaciones como objetos, añádelas aquí
  }
  