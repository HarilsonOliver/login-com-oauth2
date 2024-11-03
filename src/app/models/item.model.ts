import internal from "node:stream";

export interface Item {
  id: number;
  name: string;
  imageFile: File | null;  // Agora é um arquivo
  price: number;
  description: string;
  imagePreview: string;    // Previsualização da imagem
  quantity: number;

}
