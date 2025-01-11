import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrasesService {


  private frases: string[] = [
    "Desarrolla el super poder de hacer un poco cada día",
    "Cuando tu cuerpo está sano, tienes miles de problemas. Cuando enfermas, tienes un solo problema.",
    "Lo que no estás cambiando, lo estás eligiendo",
    "Si crees que es cara la factura de haber fallado, espera a que te llegue la factura de ni siquiera haberlo intentado",
    "No podemos controlar las dificultades, pero sí cómo respondemos ante ellas",
    "Enfoca tu energía en lo que puedes cambiar, en vez de desperdiciarla en lo que está fuera de tu control",
    "¿Acaso no dijiste... Libranos de todo mal..?",
    "Si se te nota el gym, ¡y te está quedando rico!",
    "El pensamiento condiciona la acción. La acción determina el comportamiento. El comportamiento repetido crea hábitos. El hábito estructura el carácter (la manera de pensar, ser y actuar de un individuo). El carácter marca el destino.",
    "Tu actitud es la vela de tu barco",
    "El fracaso no es cuando caemos, es cuando nos rehusamos a levantarnos",
    "No bajes tus sueños a la capacidad de tus habilidades aparentes, haz que estas suban a la altura de tus sueños",
    "¿Quién decide si eres N°1 o no? Tú",
    "Quiza, luego sea hoy",
    "Ganar depende exclusivamente de vos",
    "Te han jodido, pero esto no ha terminado",
    "Disciplina, el valor más fuerte",
    "Si quieres rendirte, puedes rendirte. Es tu elección... Pero si eliges no rendirte, eso es algo de lo que estar orgulloso",
    "Sé realista, sal a buscarlo, si no sabes hacerlo, busca el ejemplo... Haz tu plan",
    "Sueña en grande, actúa en pequeño",
    "La única razón por la que no estás viviendo la vida que quieres vivir, es porque TU día a día sigues alimentando la vida que no quieres vivir",
    "La excelencia no aparece sin exigencia, eres tú vs tú",
    "Los resultados en la vida son consecuencia de lo que hemos hecho, es decir, que estás sembrando tu futuro",
    "No hay truco, eres tú vs tú",
    "Si no te gusta lo que cosechas, cambia lo que siembras",
    "Disciplina tus pensamientos, deja de sobrepensar, no vayas al pasado, no vayas al futuro, quédate en el presente",
    "No temas una tormenta, aprende a bailar bajo la lluvia",
    "Apaga el celular",
    "¿Por qué ser normal, si puedes ser mejor?",
    "Si puedes verlo, y tienes el coraje de manifestarlo, sucederá",
    "Nunca digas que no puedes hacerlo, di que aún no lo has hecho",
    "Disciplina es hacer lo que odias hacer, pero haciéndolo como si te encantara",
    "La magia que buscas, está en el trabajo que estás evitando",
    "Algunas cosas tienen que terminar, para que vengan cosas mejores",
    "¿Qué tan grande soñarías, si supieras que no puedes fracasar?",
    "Eres tú, en tu forma de tratarte cuando te caes, el que determina si has caído en un bache o en una tumba",
    "Es mejor ser un guerrero en un jardín, que un jardinero en una guerra",
    "Pregúntate al final de cada día si lo hiciste bien. Si la respuesta es sí, dentro de 5 o 10 años, ¿hasta qué punto habrás mejorado?"
  ];

  constructor() { }

  // Método para devolver una frase aleatoria
  getFraseAleatoria(): string {
    const indiceAleatorio = Math.floor(Math.random() * this.frases.length);
    return this.frases[indiceAleatorio];
  }

}
