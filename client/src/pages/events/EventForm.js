import React, { useEffect, useState, Fragment } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import PageTitle from "../../components/PageTitle";
import { getGames, editEvent, getCurrentEvent } from "../../redux/actions";
const EventForm = ({
  getGames,
  games,
  editEvent,
  getCurrentEvent,
  history,
  affectedId,
  currentEvent,
  error,
  location,
  match
}) => {
  //console.log(location);

  //console.log("currentEvent", currentEvent);

  const event_id = match.params.event_id ? match.params.event_id : null;

  const act_title = event_id ? "編輯" : "新增";
  const [game_id, setGameId] = useState("");
  const [event_name, setEventName] = useState("");
  const [event_type, setEventType] = useState(0);
  const [event_status, setEventStatus] = useState(0);
  const [begin_time, setBeginTime] = useState(
    moment().format("YYYY-MM-DDTHH:mm")
  );
  const [end_time, setEndTime] = useState(
    moment()
      .add(7, "days")
      .format("YYYY-MM-DDTHH:mm")
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event_id) {
      getCurrentEvent(event_id, history);
    }
    getGames();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      setErrors(error);
    } else {
      setErrors({});
    }
  }, [error]);

  useEffect(() => {
    if (currentEvent) {
      setGameId(currentEvent.game_id);
      setEventName(currentEvent.event_name);
      setEventType(currentEvent.type);
      setEventStatus(currentEvent.status);
      setBeginTime(moment(currentEvent.begin_time).format("YYYY-MM-DDTHH:mm"));
      setEndTime(moment(currentEvent.end_time).format("YYYY-MM-DDTHH:mm"));
    }
  }, [currentEvent]);

  useEffect(() => {
    //console.log("affectedId effect", affectedId);
    if (affectedId > 0) {
      setTimeout(() => {
        history.push(`/events/home?affectedId=${affectedId}`);
      }, 3000);
    }
  }, [affectedId]);

  const formSubmit = e => {
    e.preventDefault();

    let newEvent = {};

    if (game_id === "") {
      setErrors({ ...errors, game_id: "請選擇遊戲" });
    } else {
      newEvent.game_id = game_id;
    }
    if (event_name === "") {
      setErrors({ ...errors, event_name: "請填寫活動名稱" });
    } else {
      newEvent.event_name = event_name;
    }
    newEvent.type = event_type;
    newEvent.status = event_status;
    newEvent.begin_time = begin_time;
    newEvent.end_time = end_time;

    if (event_id) {
      newEvent.id = event_id;
    }

    //console.log("submit clicked", newEvent);
    editEvent(newEvent);
  };
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "活動", path: "/events/home" },
          { label: act_title, path: "/events/create", active: true }
        ]}
        title={`${act_title}活動`}
      />

      <Row className="mb-2">
        <Col lg={4}>
          {affectedId && (
            <Alert color={"success"}>
              <strong> {act_title} 成功 - </strong> 活動 - {affectedId} 已經
              {act_title}完成。
            </Alert>
          )}
          <Card>
            <CardBody>
              <h4 className="mb-3 header-title">請填寫內容</h4>
              <Form onSubmit={formSubmit}>
                <FormGroup>
                  <Label for="txt_event_name">活動名稱</Label>
                  <Input
                    type="text"
                    name="txt_event_name"
                    id="txt_event_name"
                    value={event_name}
                    onChange={e => setEventName(e.target.value)}
                    placeholder="請填寫玩家可理解的活動名稱"
                    invalid={errors.event_name ? true : false}
                  />

                  <FormFeedback>{errors.event_name}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="game_id">遊戲</Label>
                  <Input
                    type="select"
                    name="game_id"
                    id="game_id"
                    value={game_id}
                    onChange={e => setGameId(e.target.value)}
                    invalid={errors.game_id ? true : false}
                  >
                    <option>請選擇遊戲</option>
                    {games
                      .filter(game => game.is_active === 1)
                      .map(game => (
                        <option key={"g-" + game.game_id} value={game.game_id}>
                          {" "}
                          {game.game_id} - {game.game_name}
                        </option>
                      ))}
                  </Input>
                  <FormFeedback>{errors.game_id}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="event_type">類型</Label>
                  <Input
                    type="select"
                    name="event_type"
                    id="event_type"
                    value={event_type}
                    onChange={e => setEventType(e.target.value)}
                    invalid={errors.type ? true : false}
                  >
                    <option value="0">0 - 一般</option>
                    <option value="1">1 - 預註冊</option>
                    <option value="2">2 - 虛寶</option>
                  </Input>
                  <FormFeedback>{errors.type}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="event_status">狀態</Label>
                  <Input
                    type="select"
                    name="event_status"
                    id="event_status"
                    value={event_status}
                    onChange={e => setEventStatus(e.target.value)}
                    invalid={errors.status ? true : false}
                  >
                    <option value="0">0 - 關閉</option>
                    <option value="1">1 - 開啟</option>
                  </Input>
                  <FormFeedback>{errors.status}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="begin_time">開始時間</Label>
                  <Input
                    type="datetime-local"
                    name="begin_time"
                    id="begin_time"
                    placeholder="選擇活動開始時間"
                    value={begin_time}
                    onChange={e => setBeginTime(e.target.value)}
                    invalid={errors.begin_time ? true : false}
                  />
                  <FormFeedback>{errors.begin_time}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="end_time">結束時間</Label>
                  <Input
                    type="datetime-local"
                    name="end_time"
                    id="end_time"
                    placeholder="選擇活動結束時間"
                    value={end_time}
                    onChange={e => setEndTime(e.target.value)}
                    invalid={errors.end_time ? true : false}
                  />
                  <FormFeedback>{errors.end_time}</FormFeedback>
                </FormGroup>

                <Link className="btn btn-secondary mr-2" to="/events/home">
                  取消
                </Link>

                <Button color="primary" type="submit">
                  確認送出
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

EventForm.propTypes = {
  games: PropTypes.array,
  editEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  games: state.Games.list,
  error: state.Events.error,
  affectedId: state.Events.affectedId,
  currentEvent: state.Events.currentEvent
});
export default connect(
  mapStateToProps,
  { getGames, editEvent, getCurrentEvent }
)(EventForm);
