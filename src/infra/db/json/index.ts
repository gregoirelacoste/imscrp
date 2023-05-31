import * as fs from "fs";

const DB_PATH = `src/infra/db/json/data/`
export type Entity = { id: number; data: string }

const createEntity = (entity: Pick<Entity, "data">, entityArray: Entity[]): Entity => {
    return {
        id: entityArray?.length + 1,
        ...entity
    }
}

class DBJson {
    private readonly collection: string;

    constructor(collection: string) {
        this.collection = collection
        this.init().then(r => console.log(collection, " : initialized"))
    }

    private async init() {
        if (!fs.existsSync(this.collection)) {
            console.log("create : ", this.collection)

            await fs.writeFile(this.collection, "[]", (err) => console.error(err))
        }
    }

    load(): { data: any, id: number }[] {
        return JSON.parse(fs.readFileSync(this.collection, 'utf8'));
    }

    async save(data) {
        fs.writeFileSync(this.collection, JSON.stringify(data, null, 2));
    }

    async insert(newData: Pick<Entity, "data">) {
        const data = this.load();
        data.push(createEntity(newData, data));
        await this.save(data);
        console.log("inserted")
        return data;
    }

    async get(id: number) {
        const data = this.load();
        return data.find(d => d.id === id)
    }


    async delete(index) {
        const data = this.load();
        if (index >= 0 && index < data.length) {
            data.splice(index, 1);
            await this.save(data);
        }
    }

    async update(index, newData) {
        const data = this.load();
        if (index >= 0 && index < data.length) {
            data[index] = newData;
            await this.save(data);
        }
    }
}

export class Prompt extends DBJson {
    constructor() {
        super(`${DB_PATH}prompt.json`);
    }
}

export class SearchCriteria extends DBJson {
    constructor() {
        super(`${DB_PATH}search_criteria.json`);
    }
}

export class Result extends DBJson {
    constructor() {
        super(`${DB_PATH}result.json`);
    }
}