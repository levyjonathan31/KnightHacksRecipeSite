import { TableRow } from "./RowRecipe";
import { v4 as uuidv4 } from "uuid";
function Table({ header, inputs }) {
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
          {inputs.map((input) => (
            <TableRow key={uuidv4()} inputs={input} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Table };
