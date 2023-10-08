import { TableRow } from "./RowIngredient";
import { InputIngredient } from "./InputIngredient";
function Table({ header, inputs, onAdd, onRemove }) {
  return (
    <div className="overflow-x-auto bg-slate-900">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            {header.map((h, index) => (
              <th key={index}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <InputIngredient onAdd={onAdd} index={inputs.length} />
          {inputs.map((input, index) => (
            <TableRow onRemove={onRemove} key={index} ingredient={input} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Table };
