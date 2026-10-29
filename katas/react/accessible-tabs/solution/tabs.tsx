import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const selected = tabs[selectedIndex];

  const select = (index: number) => {
    setSelectedIndex(index);
    buttons.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const last = tabs.length - 1;
    const next: Record<string, number> = {
      ArrowRight: selectedIndex === last ? 0 : selectedIndex + 1,
      ArrowLeft: selectedIndex === 0 ? last : selectedIndex - 1,
      Home: 0,
      End: last,
    };
    const index = next[event.key];
    if (index === undefined) return;
    event.preventDefault();
    select(index);
  };

  const tabId = (tab: Tab) => `${baseId}-tab-${tab.id}`;
  const panelId = (tab: Tab) => `${baseId}-panel-${tab.id}`;

  return (
    <div>
      <div role="tablist" onKeyDown={onKeyDown}>
        {tabs.map((tab, index) => {
          const isSelected = index === selectedIndex;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                buttons.current[index] = node;
              }}
              type="button"
              role="tab"
              id={tabId(tab)}
              aria-selected={isSelected}
              aria-controls={panelId(tab)}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => {
                select(index);
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {selected && (
        <div role="tabpanel" id={panelId(selected)} aria-labelledby={tabId(selected)} tabIndex={0}>
          {selected.content}
        </div>
      )}
    </div>
  );
}
