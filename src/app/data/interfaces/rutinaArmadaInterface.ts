
export interface plan {
    rutina: rutinaArmada;
    ejercicios: ejerciciosPorDia[];
}

export interface rutinaArmada {
    id_rutina: number;
    id_creador: number;
    nombre: string;
    cantidad_dias: number;
    nivel_atleta: string;
    objetivo: string;
    descripcion: string;
    id_atleta: number;
    fecha_asignacion: string;
}

export interface ejerciciosPorDia {
    dia: number; // Número del día, comenzando desde 1
    ejercicios: ejercicioRutina[]; // Lista de ejercicios para ese día
}

export interface ejercicioRutina {
    id_grupo_muscular: number;
    id_ejercicio: number;
    id_repeticion: number;
}
