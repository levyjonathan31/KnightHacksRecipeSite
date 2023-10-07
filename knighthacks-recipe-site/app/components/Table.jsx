import { TableRow } from "./TableRow";
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
          {inputs.map((input) => (
            <TableRow inputs={input} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Table };
