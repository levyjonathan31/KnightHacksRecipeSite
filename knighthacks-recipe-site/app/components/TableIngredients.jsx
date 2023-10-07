import { TableRow } from "./RowIngredient";
import { InputIngredient } from "./InputIngredient";
function Table({ header, inputs }) {
  return (
    <div className="overflow-x-auto bg-slate-900">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            {header.map((h) => (
              <th>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <InputIngredient />
          {inputs.map((input, index) => (
            <TableRow key={index} inputs={input} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Table };
