function Header() {
  return (
    <header className="border-gray-100 p-4 text-center text-2xl flex flex-wrap justify-between items-center static border-b-4 shadow-xl">
      <div class="absolute top-3 left-3 ...">
        <img src="public/ed-fringe-logo.svg" className="h-30 row-span-1" />
      </div>
      <h1 className="row-span-1 w-30"></h1>
      <h1 className="row-span-1">Ed Fringe Scheduling</h1>
      <h1 className="row-span-1">Menu</h1>
    </header>
  );
}

export default Header;
