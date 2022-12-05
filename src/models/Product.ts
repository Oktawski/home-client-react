export class Product {
    id: number | null = null;
    name: string = "";
    category: string = "";
    quantity: number = 0;

    constructor (
        id: number | null = null,
        name: string = "",
        category: string = "",
        quantity: number = 0
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
    }
}
