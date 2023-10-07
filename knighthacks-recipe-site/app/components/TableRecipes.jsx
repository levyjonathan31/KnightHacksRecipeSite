import { TableRow } from "./RowRecipe";
function Table({ header, inputs }) {
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
          {inputs.map((input, index) => (
            <TableRow key={index} inputs={input} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Table };
