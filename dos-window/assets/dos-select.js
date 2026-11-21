/* DOS Window 1.1.1 — themed <select data-dw-select>. Load with defer after the stylesheet. */
function enhanceDosSelect(select) {
  if (!select.id || select.multiple || select.closest(".dos-select")) return;
  const label = select.labels[0]?.textContent.trim() || select.getAttribute("aria-label") || select.name;
  function element(tag, text) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    return node;
  }

  if (typeof HTMLElement.prototype.showPopover !== "function") return;

  const field = element("div");
  field.className = "dos-select";
  const trigger = element("button");
  trigger.type = "button";
  trigger.className = "dos-select-trigger";
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");
  const list = element("div");
  list.id = select.id + "-options";
  list.className = "dw-win teal dw-list dos-select-list";
  list.setAttribute("popover", "auto");
  list.setAttribute("role", "listbox");
  list.setAttribute("aria-label", label);
  trigger.setAttribute("aria-controls", list.id);
  select.before(field);
  field.append(select, trigger, list);
  select.tabIndex = -1;
  select.setAttribute("aria-hidden", "true");

  function sync() {
    trigger.disabled = select.disabled;
    if (select.disabled && list.matches(":popover-open")) list.hidePopover();
    const title = select.selectedOptions[0]?.label || "Selecione";
    trigger.textContent = title;
    trigger.setAttribute("aria-label", label + ": " + title);
  }

  function options() {
    return [...list.querySelectorAll("button:not(:disabled)")];
  }

  function open(preferLast = false) {
    if (trigger.disabled) return;
    list.replaceChildren(...[...select.options].map((option, index) => {
      const item = element("button", option.label);
      item.type = "button";
      item.tabIndex = -1;
      item.disabled = option.disabled || option.parentElement.disabled === true;
      item.className = "dw-list-item";
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", String(option.selected));
      item.addEventListener("click", () => {
        list.hidePopover();
        select.selectedIndex = index;
        select.dispatchEvent(new Event("input", { bubbles: true }));
        select.dispatchEvent(new Event("change", { bubbles: true }));
        trigger.focus();
      });
      return item;
    }));
    const rect = trigger.getBoundingClientRect();
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    const below = viewportHeight - rect.bottom - 8;
    const above = rect.top - 8;
    const opensUp = below < 160 && above > below;
    list.style.left = rect.left + "px";
    list.style.width = rect.width + "px";
    list.style.maxHeight = Math.max(40, opensUp ? above : below) + "px";
    list.style.top = opensUp ? "auto" : rect.bottom + "px";
    list.style.bottom = opensUp ? window.innerHeight - rect.top + "px" : "auto";
    list.showPopover();
    const items = options();
    (items.find((item) => item.getAttribute("aria-selected") === "true")
      || items[preferLast ? items.length - 1 : 0])?.focus();
  }

  trigger.addEventListener("click", () => {
    if (list.matches(":popover-open")) list.hidePopover();
    else open();
  });
  trigger.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
    event.preventDefault();
    open(event.key === "ArrowUp");
  });
  // The list is positioned once when it opens: close it if the page scrolls or resizes.
  function closeOnMove(event) {
    if (event.type === "scroll" && list.contains(event.target)) return;
    if (list.matches(":popover-open")) list.hidePopover();
  }
  list.addEventListener("toggle", () => {
    const isOpen = list.matches(":popover-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      window.addEventListener("scroll", closeOnMove, true);
      window.addEventListener("resize", closeOnMove);
    } else {
      window.removeEventListener("scroll", closeOnMove, true);
      window.removeEventListener("resize", closeOnMove);
    }
  });
  list.addEventListener("keydown", (event) => {
    const items = options();
    const index = items.indexOf(document.activeElement);
    const destinations = {
      ArrowDown: Math.min(index + 1, items.length - 1),
      ArrowUp: Math.max(index - 1, 0),
      Home: 0,
      End: items.length - 1,
    };
    if (event.key in destinations) {
      event.preventDefault();
      items[destinations[event.key]]?.focus();
    } else if (event.key === "Escape" || event.key === "Tab") {
      if (event.key === "Escape") event.preventDefault();
      list.hidePopover();
      trigger.focus();
    } else if (event.key.length === 1 && event.key !== " " && !event.altKey && !event.ctrlKey && !event.metaKey) {
      const key = event.key.toLocaleLowerCase();
      const sorted = [...items.slice(index + 1), ...items.slice(0, index + 1)];
      const match = sorted.find((item) => item.textContent.toLocaleLowerCase().startsWith(key));
      if (match) {
        event.preventDefault();
        match.focus();
      }
    }
  });
  select.addEventListener("change", sync);
  select.addEventListener("focus", () => trigger.focus());
  new MutationObserver(() => {
    if (list.matches(":popover-open")) list.hidePopover();
    sync();
  }).observe(select, { childList: true, subtree: true, attributes: true });
  sync();
}

document.querySelectorAll("select[data-dw-select]").forEach(enhanceDosSelect);
