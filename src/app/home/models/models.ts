export interface Datos {
    informacionUsuario: {
        nombre: string;
        cedula: string;
        telefono: number;
    }
    informacionCensado: {
        nombre: string;
        cedula: string;
        miembros: number;
        fotos: string;
        latitud: any;
        longitud: any;        
        id: string
    }
}