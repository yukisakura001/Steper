// components/DateTimePicker.tsx
import React, { useState, useEffect, useRef, forwardRef, Ref } from "react";

interface DateTimePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  label?: string;
  onChange: (value: string) => void;
  value?: string;
}

const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  ({ label, onChange, value, ...rest }, ref: Ref<HTMLInputElement>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      value ? new Date(value) : null
    );
    const [displayedMonth, setDisplayedMonth] = useState<Date>(
      value ? new Date(value) : new Date()
    );
    const [selectedTime, setSelectedTime] = useState<string>(
      value ? value.slice(11, 16) : "00:00"
    );

    const pickerRef = useRef<HTMLDivElement>(null);

    // 外部クリックを検出してカレンダーを閉じる
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          pickerRef.current &&
          !pickerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // props.value の変更を監視して状態を更新
    useEffect(() => {
      if (value) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          setSelectedDate(date);
          setSelectedTime(value.slice(11, 16));
          setDisplayedMonth(new Date(date.getFullYear(), date.getMonth(), 1));
        }
      } else {
        setSelectedDate(null);
        setSelectedTime("00:00");
        setDisplayedMonth(new Date());
      }
    }, [value]);

    // 月を移動するハンドラ
    const handlePrevMonth = () => {
      setDisplayedMonth(
        new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1)
      );
    };

    const handleNextMonth = () => {
      setDisplayedMonth(
        new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1)
      );
    };

    // 日付を選択するハンドラ
    const handleDateClick = (day: Date) => {
      setSelectedDate(day);
      if (selectedTime) {
        updateValue(day, selectedTime);
      }
    };

    // 時間を選択するハンドラ
    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newTime = e.target.value;
      setSelectedTime(newTime);
      if (selectedDate) {
        updateValue(selectedDate, newTime);
      }
    };

    // 値を更新し、onChangeを呼び出す関数
    const updateValue = (date: Date, time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      const finalDate = new Date(date);
      finalDate.setHours(hours, minutes, 0, 0);

      // ローカル時間でフォーマットを作成
      const year = finalDate.getFullYear();
      const month = String(finalDate.getMonth() + 1).padStart(2, "0");
      const day = String(finalDate.getDate()).padStart(2, "0");
      const formattedTime = `${String(finalDate.getHours()).padStart(
        2,
        "0"
      )}:${String(finalDate.getMinutes()).padStart(2, "0")}`;

      const formattedDate = `${year}-${month}-${day}T${formattedTime}`;
      onChange(formattedDate);
    };

    // カレンダーの日付を生成
    const generateCalendar = () => {
      const startOfMonth = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth(),
        1
      );
      const endOfMonth = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth() + 1,
        0
      );
      const startDay = startOfMonth.getDay(); // 0 (日) から 6 (土)
      const totalDays = endOfMonth.getDate();

      const weeks: Array<Array<Date | null>> = [];
      let currentWeek: Array<Date | null> = [];

      // 前月の余白
      for (let i = 0; i < startDay; i++) {
        currentWeek.push(null);
      }

      for (let day = 1; day <= totalDays; day++) {
        currentWeek.push(
          new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), day)
        );
        if (currentWeek.length === 7) {
          weeks.push(currentWeek);
          currentWeek = [];
        }
      }

      // 後月の余白
      if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
          currentWeek.push(null);
        }
        weeks.push(currentWeek);
      }

      return weeks;
    };

    const weeks = generateCalendar();

    // フォーマットされた入力値
    const inputValue = selectedDate
      ? `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1
        ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
          2,
          "0"
        )}T${selectedTime}`
      : "";

    return (
      <div className="relative" ref={pickerRef}>
        {label && (
          <label htmlFor={rest.id} className="mb-2 block text-gray-700">
            {label}
          </label>
        )}
        <input
          type="text"
          readOnly
          value={
            selectedDate
              ? `${selectedDate.getFullYear()}-${String(
                  selectedDate.getMonth() + 1
                ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
                  2,
                  "0"
                )} ${selectedTime}`
              : ""
          }
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          placeholder="日付と時間を選択"
          ref={ref}
          {...rest}
        />
        {/* 隠しinputフィールドでフォームと連携 */}
        <input type="hidden" name={rest.name} value={inputValue} />
        {isOpen && (
          <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-4 w-80">
            {/* カレンダーヘッダーと閉じるボタン */}
            <div className="flex justify-between items-center mb-2 relative">
              {/* カレンダーヘッダー */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="前の月"
                >
                  &lt;
                </button>
                <span className="font-semibold">
                  {displayedMonth.getFullYear()}年{" "}
                  {displayedMonth.getMonth() + 1}月
                </span>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="次の月"
                >
                  &gt;
                </button>
              </div>
              {/* 閉じるボタン */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none text-2xl p-2 bg-transparent rounded-full"
                aria-label="閉じる"
              >
                &times;
              </button>
            </div>
            {/* 曜日ヘッダー */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600 mb-1">
              <div>日</div>
              <div>月</div>
              <div>火</div>
              <div>水</div>
              <div>木</div>
              <div>金</div>
              <div>土</div>
            </div>
            {/* 日付セル */}
            <div className="grid grid-cols-7 gap-1">
              {weeks.map((week, weekIdx) =>
                week.map((day, dayIdx) => {
                  const isToday =
                    day && day.toDateString() === new Date().toDateString();
                  const isSelected =
                    day &&
                    selectedDate &&
                    day.toDateString() === selectedDate.toDateString();
                  return (
                    <button
                      type="button"
                      key={`${weekIdx}-${dayIdx}`}
                      onClick={() => day && handleDateClick(day)}
                      className={`py-1 rounded-md focus:outline-none ${
                        day
                          ? "hover:bg-blue-100 cursor-pointer"
                          : "cursor-default"
                      } ${isSelected ? "bg-blue-500 text-white" : ""} ${
                        isToday && !isSelected ? "border border-blue-500" : ""
                      }`}
                      disabled={!day}
                      aria-pressed={isSelected ? "true" : undefined}
                    >
                      {day ? day.getDate() : ""}
                    </button>
                  );
                })
              )}
            </div>
            {/* 時間選択 */}
            <div className="mt-4">
              <label className="block text-gray-700 mb-1">時間</label>
              <select
                value={selectedTime}
                onChange={handleTimeChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 24 }).map((_, hour) => (
                  <option
                    key={hour}
                    value={`${String(hour).padStart(2, "0")}:00`}
                  >
                    {String(hour).padStart(2, "0")}:00
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DateTimePicker.displayName = "DateTimePicker";

export default DateTimePicker;
