import { ChangeEvent, FC } from 'react';

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  value?: string | number;
  label?: string;
  disabled?: boolean;
  className?: string;
  options: SelectOption[];
  defaultValue?: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: FC<SelectProps> = ({
  value,
  disabled,
  className,
  options,
  onChange,
  defaultValue,
}) => {
  return (
    <div className={className}>
      <select
        disabled={disabled}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        required>
        <option disabled value={''}>
          Выберите вариант...
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export type { SelectOption };
