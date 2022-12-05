export class ProductRequest {
    id: number | null = null;
    name: string;
    category: string;
    quantity: number;

    constructor(
        id: number | null,
        name: string,
        category: string,
        quantity: number
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
    }
}
