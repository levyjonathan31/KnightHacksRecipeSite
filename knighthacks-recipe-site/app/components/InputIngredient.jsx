function InputIngredient() {
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
      <td>
        {
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-1/4 h-3/4 text-s"
          />
        }
      </td>
      <th>
        <button className="btn btn-ghost btn-xs text-green-400">Add</button>
      </th>
    </tr>
  );
}
export { InputIngredient };
