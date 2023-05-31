import React, { useState } from "react";
import { AdapterDateFns } from "*";
import { LocalizationProvider } from "*";
import { MobileTimePicker } from "*";
import Input from "*";
import { withStyles } from "*";
import { useRootStore } from "*";
import { observer } from "*";

const CustomTimePicker = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#...",
    },
    "&.MuiTimePickerToolbar-root": {
      backgroundColor: "#...",
    },
  },
})(MobileTimePicker);

export interface TimePickerProps {
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  name?: string;
}

const TimePicker = ({ value, onChange, className, placeholder, disabled, style, name }: TimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getFormattedTime } = useRootStore();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CustomTimePicker
          label=""
          value={value}
          onOpen={() => setIsOpen(true)}
          onClose={() => {
            setIsOpen(false);
            setTimeout(() => (document.activeElement as HTMLElement).blur());
          }}
          onChange={newValue => {
            onChange && onChange(newValue as Date | null);
          }}
          open={isOpen}
          ampm={isOpen}
          renderInput={_params => <></>}
          toolbarTitle=""
          ampmInClock
        />
      </LocalizationProvider>
      <Input
        disabled={disabled}
        value={getFormattedTime(value)}
        onClick={() => setIsOpen(true)}
        className={className}
        placeholder={placeholder}
        style={style}
        name={name}
      />
    </>
  );
};

export default observer(TimePicker);
