export default function RefreshButton() {
  return (
    <button
      className="Refresh-Button"
      onClick={() => {
        window.location.reload(true);
      }}
      type="submit"
    >
      Refresh
    </button>
  );
}
