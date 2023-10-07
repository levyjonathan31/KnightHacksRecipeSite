function NavBar() {
  return (
    <div className="navbar bg-slate-100 flex justify-between">
      <a href="/" className="btn btn-ghost normal-case text-yellow-500 text-xl">
        KnightBites
      </a>
      <a
        href="/Fridge"
        className="btn btn-ghost normal-case text-black text-xl"
      >
        Add Ingredient
      </a>
    </div>
  );
}

export { NavBar };
