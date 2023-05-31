import * as fs from "fs";

const DB_PATH = `src/infra/db/json/data/`
export type Entity = { id: number; data: string }

const createEntity = <T>(entity: Omit<T, "id">, entityArray: T[]): T => {
    return {
        id: entityArray[0]?.id + 1 || 1,
        ...entity
    }
}

class DBJson<T> {
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

    load(): T[] {
        return JSON.parse(fs.readFileSync(this.collection, 'utf8'));
    }

    async save(data) {
        fs.writeFileSync(this.collection, JSON.stringify(data, null, 2));
    }

    async insert(newData: Omit<T, 'id'>) {
        const data = this.load();
        data.unshift(createEntity(newData, data));
        await this.save(data);
        console.log("inserted")
        return data;
    }

    async get(id: number): Promise<T> {
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

export interface CriteriaType extends Entity {
    type: string
}

export class Criteria extends DBJson<CriteriaType> {
    constructor() {
        super(`${DB_PATH}criteria.json`);
    }

    getByType(type: string): CriteriaType | null {
        const datas = this.load()
        return datas.find(d => d.type === type) || null
    }

}

export class Result extends DBJson<Entity> {
    constructor() {
        super(`${DB_PATH}result.json`);
    }
}