"use client";
import { useState } from "react";
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

      <th>
        <button className="btn btn-ghost btn-xs">Instructions</button>
      </th>
    </tr>
  );
}

export { TableRow };
