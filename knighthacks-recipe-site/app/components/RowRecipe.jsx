import { v4 as uuidv4 } from "uuid";

function TableRow({ inputs }) {
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3"></div>
      </td>
      {inputs.map((input) => (
        <td key={uuidv4()}>{input}</td>
      ))}
    </tr>
  );
}

export { TableRow };
