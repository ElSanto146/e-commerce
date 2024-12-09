export interface IProducto {
    id:          number;
    name:        string;
    description: string;
    price:       number;
    stock:       number;
    img:         string;
    isSale:      boolean;
    isNew:       boolean;
    message:     string | null;
    cantidad:    number;
}

export enum Img {
    AlgunaURL = "alguna url",
    SrcLdkfj = "src:ldkfj",
}