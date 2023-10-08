function TableRow({ inputs }) {
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          {/* <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src="/tailwind-css-component-profile-2@56w.png"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div> */}
        </div>
      </td>
      {inputs.map((input) => (
        <td>{input}</td>
      ))}

      <th>
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
    </tr>
  );
}

export { TableRow };
