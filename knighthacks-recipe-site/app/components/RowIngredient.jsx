function TableRow({ ingredient, onRemove, index }) {
  console.log("key: " + index);
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
      {/* {ingredient.map((input, index) => (
        <td key={index}>{input}</td>
      ))} */}
      <td> {ingredient}</td>
      <th>
        <button
          onClick={() => onRemove(index)}
          className="btn btn-ghost btn-xs text-red-400"
        >
          Remove
        </button>
      </th>
    </tr>
  );
}

export { TableRow };
