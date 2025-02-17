import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
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
  top: 30px;
  z-index: 10;
  border: 1px solid #ccc;
`;
