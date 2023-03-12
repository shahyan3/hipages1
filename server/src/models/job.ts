export class Job {
    id: number;
    status: string;
    suburb: Suburb;
    category: Category;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    price: number;
    description: string;
    created_at: Date;
    updated_at: Date;
    postcode: string;

    constructor(
        id: number,
        status: string,
        suburb: Suburb,
        category: Category,
        contact_name: string,
        contact_phone: string,
        contact_email: string,
        price: number,
        description: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.id = id;
        this.status = status;
        this.suburb = suburb;
        this.category = category;
        this.contact_name = contact_name;
        this.contact_phone = contact_phone;
        this.contact_email = contact_email;
        this.price = price;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

export class Suburb {
    name: string;
    postcode: string;

    constructor(name: string, postcode: string) {
        this.name = name;
        this.postcode = postcode;
    }
}

export class Category {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
