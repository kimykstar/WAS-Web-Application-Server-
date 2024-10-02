import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

type User = {
  email: string;
  nickName: string;
  password: string;
};

type TableSchema = {
  records: Array<User>;
};

class LowdbDao {
  async #connectTable(tableName: string) {
    const table = new Low<TableSchema>(new JSONFile(`DB/${tableName}.json`), { records: [] });

    await table.read();

    return table;
  }

  async insertRecord(tableName: string, record: User) {
    const table = await this.#connectTable(tableName);
    const data = table.data;

    data.records.push(record);
    await table.write();

    return record;
  }

  async getRecord(tableName: string, email: string) {
    const table = await this.#connectTable(tableName);
    const records: Array<User> = table.data["records"];
    return records.find((record: User) => record["email"] === email);
  }
}

export const lowdbDao = new LowdbDao();
