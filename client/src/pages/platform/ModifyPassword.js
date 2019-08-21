import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
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
import { updatePassword } from "../../redux/actions";
import PropTypes from "prop-types";

const ModifyPassword = ({
  user: { account },
  updatePassword,
  updated,
  loading,
  error
}) => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (error) {
      setErrors(error);
    } else {
      setErrors({});
    }
  }, [error]);

  const formSubmit = e => {
    e.preventDefault();
    if (password === "") {
      setErrors({ ...errors, password: "請填寫新密碼" });
      return;
    }

    const formData = {
      account,
      password
    };

    updatePassword(formData);
  };
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "修改密碼", path: "/platform/modify_password", active: true }
        ]}
        title={"修改密碼"}
      />
      <Row className="mb-2">
        <Col lg={4}>
          {updated && (
            <Alert color={"success"}>
              <strong> 密碼修改成功 </strong>
            </Alert>
          )}
          <Card>
            <CardBody>
              <Form onSubmit={formSubmit}>
                <FormGroup>
                  <Label for="txt_account">帳號</Label>

                  <Input
                    type="text"
                    name="txt_account"
                    id="txt_account"
                    placeholder="Readonly value"
                    value={account}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="txt_password">密碼</Label>
                  <Input
                    type="password"
                    name="txt_password"
                    id="txt_password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    invalid={errors.password ? true : false}
                  />

                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>

                <Link className="btn btn-secondary mr-2" to="/">
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

ModifyPassword.propTypes = {
  user: PropTypes.object.isRequired,
  updatePassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.Auth.user,
  updated: state.Platform.updated,
  loading: state.Platform.loading,
  error: state.Platform.error
});
export default connect(
  mapStateToProps,
  { updatePassword }
)(ModifyPassword);
