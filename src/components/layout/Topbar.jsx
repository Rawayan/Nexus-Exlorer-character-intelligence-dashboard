import ThemeToggle from "../ui/ThemeToggle";

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <h1>Nexus Explorer</h1>

        <p>
          Character Intelligence Dashboard
        </p>
      </div>

      <div className="topbar-actions">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Topbar;