import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ko } from "date-fns/locale";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { createStaticRanges, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import styled from "styled-components";

const Calendar = (props) => {
  const [state, setState] = useState([
    {
      startDate: props.dateRange.startDate,
      endDate: props.dateRange.endDate,
      key: "selection",
    },
  ]);

  useEffect(() => {
    props.setDateRange((prev) => {
      return {
        ...prev,
        startDate: state[0].startDate,
        endDate: state[0].endDate,
      };
    });
  }, [state]);

  const staticRanges = createStaticRanges([
    {
      label: "오늘",
      range: () => ({
        startDate: new Date(),
        endDate: new Date(),
      }),
    },
    {
      label: "이번주",
      range: () => ({
        startDate: startOfWeek(new Date()),
        endDate: new Date(),
      }),
    },
    {
      label: "지난주",
      range: () => ({
        startDate: startOfWeek(addDays(new Date(), -7)),
        endDate: endOfWeek(addDays(new Date(), -7)),
      }),
    },
    {
      label: "이번달",
      range: () => ({
        startDate: startOfMonth(new Date()),
        endDate: new Date(),
      }),
    },
    {
      label: "지난달",
      range: () => ({
        startDate: startOfMonth(addMonths(new Date(), -1)),
        endDate: endOfMonth(addMonths(new Date(), -1)),
      }),
    },
  ]);

  return (
    <>
      <CalendarContainer ref={props.calendarref}>
        <DateRangePicker
          onChange={(item) => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          inputRanges={[]}
          showDateDisplay={false}
          direction="horizontal"
          locale={ko}
          rangeColors={["#42b8c8"]}
          maxDate={new Date()}
          staticRanges={staticRanges}
        />
      </CalendarContainer>
    </>
  );
};

export default Calendar;

Calendar.propTypes = {
  calendarref: PropTypes.object,
  dateRange: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  setDateRange: PropTypes.func,
};

const CalendarContainer = styled.div`
  position: absolute;
  top: 25px;
  z-index: 10;
  border: 1px solid #ccc;

  .rdrDefinedRangesWrapper {
    width: 90px;
  }

  .rdrCalendarWrapper {
    width: 280px;
  }
`;
