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
import PageTitle from "../../../components/PageTitle";
import {
  getGames,
  getServersByGameId,
  getCSMaster,
  editRecord,
  getCurrentRecord,
  clearCurrentRecord
} from "../../../redux/actions";

const PersonalVisitForm = ({
  affectedId,
  games,
  servers,
  cs_master,
  error,
  currentRecord,
  history,
  match,
  getGames,
  getServersByGameId,
  getCSMaster,
  editRecord,
  getCurrentRecord,
  clearCurrentRecord
}) => {
  const record_id = match.params.record_id ? match.params.record_id : null;
  const act_title = record_id ? "編輯" : "新增";

  const [clientName, setClientName] = useState("");
  const [visitTime, setVisitTime] = useState(
    moment().format("YYYY-MM-DDTHH:mm")
  );
  const [gameId, setGameId] = useState("");
  const [serverId, setServerId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cause, setCause] = useState("");
  const [note, setNote] = useState("");
  const [caseStatus, setCaseStatus] = useState("");
  const [refQId, setRefQId] = useState("");
  const [caseMember, setCaseMember] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    //console.log("record_id", record_id);
    if (record_id) {
      getCurrentRecord(record_id, history);
    } else {
      clearCurrentRecord();
    }
    getGames();
    getCSMaster();

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
    if (currentRecord) {
      setGameId(currentRecord.game_id);
      getServersByGameId(currentRecord.game_id);
      setClientName(currentRecord.client_name);
      setVisitTime(moment(currentRecord.visit_time).format("YYYY-MM-DDTHH:mm"));

      setPhone(currentRecord.client_phone);
      setEmail(currentRecord.client_email);
      setServerId(currentRecord.server_id);
      setRoleId(currentRecord.role_id);
      setRoleName(currentRecord.role_name);
      setCause(currentRecord.cause);
      setNote(currentRecord.note);
      setRefQId(currentRecord.ref_q_id);
      setCaseMember(currentRecord.admin_uid);
    }
  }, [currentRecord]);

  useEffect(() => {
    //console.log("affectedId effect", affectedId);
    if (affectedId > 0) {
      setTimeout(() => {
        history.push(`/offline/personal_visit/home?affectedId=${affectedId}`);
      }, 2000);
    }
  }, [affectedId]);

  const onGameChange = val => {
    setGameId(val);
    getServersByGameId(val);
  };

  const formSubmit = e => {
    e.preventDefault();
    const record = {
      client_name: clientName,
      visit_time: visitTime,
      client_phone: phone,
      client_email: email,
      game_id: gameId,
      server_id: serverId,
      role_id: roleId,
      role_name: roleName,
      cause: cause,
      note: note,
      ref_q_id: refQId,
      admin_uid: caseMember
    };

    if (record_id) {
      record.id = record_id;
    }

    console.log("record", record);
    editRecord(record);
  };
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          {
            label: "線下客服",
            path: "/offline/personal_visit/home",
            active: false
          },
          {
            label: "親訪",
            path: "/offline/personal_visit/home",
            active: false
          },
          {
            label: act_title,
            path: "/offline/personal_visit/create",
            active: true
          }
        ]}
        title={`${act_title}活動`}
      />

      <Row className="mb-2">
        <Col lg={6}>
          {affectedId && (
            <Alert color={"success"}>
              <strong> {act_title} 成功 - </strong> 紀錄 - {affectedId} 已經
              {act_title}完成。
            </Alert>
          )}
          <Card>
            <CardBody>
              <h4 className="mb-3 header-title">請填寫親訪表單內容</h4>
              <Form onSubmit={formSubmit}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="txtClientName">親訪人姓名</Label>
                      <Input
                        type="text"
                        name="txtClientName"
                        id="txtClientName"
                        value={clientName}
                        onChange={e => setClientName(e.target.value)}
                        placeholder="請填寫來訪玩家姓名"
                        invalid={errors.clientName ? true : false}
                      />

                      <FormFeedback>{errors.clientName}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="visitTime">親訪時間</Label>
                      <Input
                        type="datetime-local"
                        name="visitTime"
                        id="visitTime"
                        placeholder="選擇親訪時間"
                        value={visitTime}
                        onChange={e => setVisitTime(e.target.value)}
                        invalid={errors.visitTime ? true : false}
                      />
                      <FormFeedback>{errors.visitTime}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="txtPhone">電話</Label>
                      <Input
                        type="text"
                        name="txtPhone"
                        id="txtPhone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="填寫玩家連絡電話,手機"
                        invalid={errors.phone ? true : false}
                      />

                      <FormFeedback>{errors.phone}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="txtEmail">Email</Label>
                      <Input
                        type="text"
                        name="txtEmail"
                        id="txtEmail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="玩家Email"
                        invalid={errors.email ? true : false}
                      />

                      <FormFeedback>{errors.email}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="gameId">遊戲</Label>
                      <Input
                        type="select"
                        name="gameId"
                        id="gameId"
                        value={gameId}
                        onChange={e => onGameChange(e.target.value)}
                        invalid={errors.gameId ? true : false}
                      >
                        <option>請選擇遊戲</option>
                        {games
                          .filter(game => game.is_active === 1)
                          .map(game => (
                            <option
                              key={"g-" + game.game_id}
                              value={game.game_id}
                            >
                              {" "}
                              {game.game_id} - {game.game_name}
                            </option>
                          ))}
                      </Input>
                      <FormFeedback>{errors.serverId}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="gameId">伺服器</Label>
                      <Input
                        type="select"
                        name="serverId"
                        id="serverId"
                        value={serverId}
                        onChange={e => setServerId(e.target.value)}
                        invalid={errors.serverId ? true : false}
                      >
                        <option>請選擇伺服器</option>
                        {servers
                          .filter(server => server.server_status === "public")
                          .map(server => (
                            <option
                              key={"g-" + server.server_id}
                              value={server.server_id}
                            >
                              {" "}
                              {server.server_id} - {server.server_name}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="txtRoleName">角色名稱</Label>
                      <Input
                        type="text"
                        name="txtRoleName"
                        id="txtRoleName"
                        value={roleName}
                        onChange={e => setRoleName(e.target.value)}
                        placeholder="請填寫角色名稱"
                        invalid={errors.roleName ? true : false}
                      />

                      <FormFeedback>{errors.roleName}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="txtRoleId">角色ID</Label>
                      <Input
                        type="text"
                        name="txtRoleId"
                        id="txtRoleId"
                        value={roleId}
                        onChange={e => setRoleId(e.target.value)}
                        placeholder="請填寫角色ID"
                        invalid={errors.roleId ? true : false}
                      />

                      <FormFeedback>{errors.roleId}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="refQId">回報單編號</Label>
                      <Input
                        type="text"
                        name="refQId"
                        id="refQId"
                        value={refQId}
                        onChange={e => setRefQId(e.target.value)}
                        placeholder="相關提問單編號"
                        invalid={errors.refQId ? true : false}
                      />

                      <FormFeedback>{errors.refQId}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="txtCause">親訪原因</Label>
                      <Input
                        type="text"
                        name="txtCause"
                        id="txtCause"
                        value={cause}
                        onChange={e => setCause(e.target.value)}
                        placeholder="簡述玩家親訪原因"
                        invalid={errors.cause ? true : false}
                      />

                      <FormFeedback>{errors.cause}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="txtNote">詳細事由</Label>

                  <Input
                    type="textarea"
                    name="txtNote"
                    id="txtNote"
                    rows="5"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="詳細事由"
                    invalid={errors.note ? true : false}
                  />

                  <FormFeedback>{errors.note}</FormFeedback>
                </FormGroup>
                <Row form>
                  {/* <Col md={6}>
                    <FormGroup>
                      <Label for="caseStatus">狀態</Label>
                      <Input
                        type="select"
                        name="caseStatus"
                        id="caseStatus"
                        value={caseStatus}
                        onChange={e => setCaseStatus(e.target.value)}
                        invalid={errors.caseStatus ? true : false}
                      >
                        <option value="0">1 - 處理中</option>
                        <option value="4">4 - 已結案</option>
                      </Input>
                      <FormFeedback>{errors.caseStatus}</FormFeedback>
                    </FormGroup>
                  </Col> */}
                  <Col md={6}>
                    <FormGroup>
                      <Label for="caseMember">負責專員</Label>
                      <Input
                        type="select"
                        name="caseMember"
                        id="caseMember"
                        value={caseMember}
                        onChange={e => setCaseMember(e.target.value)}
                        invalid={errors.caseMember ? true : false}
                      >
                        <option>請選擇</option>
                        {cs_master.map(cs => (
                          <option key={"cs-" + cs.uid} value={cs.uid}>
                            {" "}
                            {cs.uid} - {cs.name}
                          </option>
                        ))}
                      </Input>
                      <FormFeedback>{errors.caseMember}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Link
                  className="btn btn-secondary mr-2"
                  to="/offline/personal_visit/home"
                >
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

PersonalVisitForm.propTypes = {
  games: PropTypes.array
};

const mapStateToProps = state => ({
  games: state.Games.list,
  servers: state.Servers.list,
  cs_master: state.AdminUsers.cs_master,
  error: state.OfflineCS.error,
  ocsdata: state.OfflineCS.ocsdata,
  affectedId: state.OfflineCS.affectedId,
  currentRecord: state.OfflineCS.currentRecord
});
export default connect(
  mapStateToProps,
  {
    getGames,
    getServersByGameId,
    getCSMaster,
    editRecord,
    getCurrentRecord,
    clearCurrentRecord
  }
)(PersonalVisitForm);
