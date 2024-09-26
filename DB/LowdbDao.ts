import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

type TableSchema = {
  records: Array<Object>;
};

class LowdbDao {
  async #connectTable(tableName: string) {
    const table = new Low<TableSchema>(new JSONFile(`DB/${tableName}.json`), { records: [] });

    await table.read();

    return table;
  }

  async insertRecord(tableName: string, record: Object) {
    const table = await this.#connectTable(tableName);
    const data = table.data;

    data.records.push(record);
    await table.write();

    return record;
  }
}

export const lowdbDao = new LowdbDao();
