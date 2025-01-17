export interface Gimnasio {

    id_gimnasio: number;
    nombre: string;
    direccion: string;
    telefono: string;
    correo_electronico: string;
    horario_apertura: string; // Se puede usar 'string' si el formato es hora, pero también podrías considerar usar 'Date' o 'Time'
    horario_cierre: string;   // Igual que horario_apertura, depende de cómo quieras tratar las horas
    estado: 'activo' | 'inactivo'; // Puede ser un tipo de cadena con valores limitados
    descripcion: string;
    fecha_registro: string; // Fecha en formato ISO 8601

}
