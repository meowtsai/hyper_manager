import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSerialEvents } from "../../redux/actions";

const SerialEventList = ({
  event_id,
  serialEvents,
  getSerialEvents,
  loading
}) => {
  useEffect(() => {
    getSerialEvents(event_id);
  }, []);

  if (loading) return <div>載入中...</div>;

  return (
    <ul>
      {serialEvents.map(se => (
        <li key={`se-${se.id}`}>
          {se.id} - {se.title} ({" "}
          <span className="text-success"> 已兌換: {se.redeemed} </span> /{" "}
          <span className="text-dark">總數: {se.qty} </span>){" "}
        </li>
      ))}
    </ul>
  );
};

SerialEventList.propTypes = {
  serialEvents: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  serialEvents: state.Events.serial,
  loading: state.Events.loading
});
export default connect(
  mapStateToProps,
  { getSerialEvents }
)(SerialEventList);
