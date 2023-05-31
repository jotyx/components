import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "*";
import { Dropdown as BootstrapDropdown } from "*";
import cx from "*";
import { ButtonSize, ButtonVariant } from "*";
import styles from "*";
import DropdownMenu, {
  DropdownItem as DropdownItemComponent,
  DropdownItemGroup,
  OnOpenChangeArgs,
} from "@atlaskit/dropdown-menu";
import { Button } from "*";

export interface DropdownItem {
  label?: React.ReactNode;
  link?: string;
  onClick?: () => void;
  visible?: boolean;
  divider?: boolean;
  disabled?: boolean;
  [rest: string]: any;
}

interface DropdownProps {
  label: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  items?: Array<DropdownItem>;
  className?: string;
  style?: React.CSSProperties;
}

const Dropdown = ({ label, variant, items, size, className, style }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const itemsToDisplay = useMemo(() => {
    const itemsToDisplay = items?.filter(x => x.visible || x.visible === undefined);
    return itemsToDisplay?.filter((x, index) => !x.divider || (x.divider && !itemsToDisplay?.[index - 1]?.divider));
  }, [items]);

  return (
    <DropdownMenu
      isOpen={isOpen}
      onOpenChange={(attrs: OnOpenChangeArgs) => {
        setIsOpen(attrs.isOpen);
      }}
      trigger={({ triggerRef, isSelected, testId, ...providedProps }) => (
        <Button
          {...providedProps}
          ref={triggerRef}
          size={size}
          onClick={e => {
            setIsOpen(prevState => !prevState);
            providedProps?.onClick?.(e);
          }}
          className={cx(variant, styles.dropdown_toggle, className)}
          style={style}>
          {label} {isOpen ? <ChevronUp size="13" className="ml-2" /> : <ChevronDown size="13" className="ml-2" />}
        </Button>
      )}>
      <div className={styles.dropdown_wrapper}>
        <DropdownItemGroup>
          {itemsToDisplay?.map((x, index) =>
            x.divider ? (
              <BootstrapDropdown.Divider key={index} />
            ) : (
              <span className={styles.menu_item} key={index}>
                <DropdownItemComponent href={x.link} onClick={x.onClick} isDisabled={x.disabled}>
                  {x.label}
                </DropdownItemComponent>
              </span>
            )
          )}
        </DropdownItemGroup>
      </div>
    </DropdownMenu>
  );
};

export default Dropdown;
