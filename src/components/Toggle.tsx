export function Toggle({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="toggle">
      <input
        type="checkbox"
        aria-labelledby={id}
        id={`${id}-button`}
        className="peer sr-only"
      />

      {children}

      <label htmlFor={`${id}-button`} className="toggle__label">
        <div className="toggle__input">
          <div aria-hidden="true" className="toggle__background"></div>
          <span aria-hidden="true" className="toggle__handle"></span>

          <span className="toggle__label" id={id}>
            Show after change
          </span>
        </div>
      </label>
    </div>
  );
}

Toggle.On = function ToggleOn({ children }: { children: React.ReactNode }) {
  return <div className="toggle__on">{children}</div>;
};

Toggle.Off = function ToggleOn({ children }: { children: React.ReactNode }) {
  return <div className="toggle__off">{children}</div>;
};
