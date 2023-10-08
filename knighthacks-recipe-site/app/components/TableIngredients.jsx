import { TableRow } from "./RowIngredient";
import { InputIngredient } from "./InputIngredient";
import { v4 as uuidv4 } from "uuid";
function Table({ header, inputs, onAdd, onRemove }) {
  return (
    <div className="overflow-x-auto bg-slate-900">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            {header.map((h) => (
              <th key={uuidv4()}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <InputIngredient onAdd={onAdd} key={uuidv4()} />
          {inputs.map((input) => (
            <TableRow onRemove={onRemove} key={uuidv4()} ingredient={input} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Table };
