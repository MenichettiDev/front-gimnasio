export interface Rutina { 

    id_rutina: number;
    id_creador: number; // Identificador del creador de la rutina (probablemente el id de un entrenador)
    nombre: string; // Nombre de la rutina (por ejemplo, "Rutina de Musculación Básica")
    cantidad_dias: string; // Cantidad de días de la rutina (por ejemplo, "3")
    nivel_atleta: 'Principiante' | 'Intermedio' | 'Avanzado' ; // Nivel del atleta para la rutina
    objetivo: string; // Objetivo de la rutina (por ejemplo, "Musculación")
    descripcion: string; // Descripción de la rutina

}
